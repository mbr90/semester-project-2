import GenericInput from "./form/GenericInput";
import PickDate from "./form/PickDate";
import TextArea from "./form/TextArea";
import logo from "../../public/logo/logo_white.png";
import Image from "next/image";
import Button from "../Button";
import { MdAdd, MdRemove, MdArrowBackIosNew, MdClose } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import PlaceListing from "../api/post/PlaceListing";
import LoadingSpinner from "../tools/LoadingSpinner";

export default function NewListing() {
  const [fields, setFields] = useState([{ label: "Item image URL*" }]);
  const [fieldCounter, setFieldCounter] = useState(1);
  const [inputFieldValues, setInputFieldValues] = useState([""]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const formattedDate = convertDateToISO(time);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [inputFieldErrors, setInputFieldErrors] = useState([false]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const titleValue = (value) => {
    setTitle(value);
  };

  const descriptionValue = (value) => {
    setDescription(value);
  };

  const timeValue = (value) => {
    setTime(value);
  };

  const updateInputFieldValue = (index, value) => {
    const updatedValues = [...inputFieldValues];
    updatedValues[index] = value;
    setInputFieldValues(updatedValues);
  };

  const handleAddField = () => {
    if (fields.length < 3) {
      const newId = fieldCounter + 1;
      setFields([...fields, { id: newId, label: `Item image URL ${newId}*` }]);
      setInputFieldValues([...inputFieldValues, ""]);
      setFieldCounter(newId);
    }
  };

  const handleRemoveField = (id) => {
    const indexToRemove = fields.findIndex((field) => field.id === id);
    const newFields = fields.filter((field) => field.id !== id);
    const newInputFieldValues = inputFieldValues.filter(
      (_, index) => index !== indexToRemove
    );
    setFields(newFields);
    setInputFieldValues(newInputFieldValues);
  };

  const url = "https://api.noroff.dev/api/v1/auction/listings";

  const validateInputFields = () => {
    return inputFieldValues.map((value) => {
      if (value.trim() === "") {
        return "This field cannot be empty.";
      } else if (!isValidUrl(value)) {
        return "Invalid URL format.";
      }
      return "";
    });
  };

  const handler = async (e) => {
    e.preventDefault();
    setDescriptionError(description.trim() === "");
    setTimeError(formattedDate === null);

    const updatedInputFieldErrors = validateInputFields();
    setInputFieldErrors(updatedInputFieldErrors);

    setTitleError(() => {
      if (title.trim() === "") {
        return "This field cannot be empty.";
      }
      return "";
    });

    setInputFieldErrors(
      inputFieldValues.map((value) => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else if (!isValidUrl(value)) {
          return "Invalid URL format.";
        }
        return "";
      })
    );

    const hasValidInputFieldValues = updatedInputFieldErrors.every(
      (error) => error === ""
    );

    if (
      title.trim() !== "" &&
      description.trim() !== "" &&
      formattedDate !== null &&
      hasValidInputFieldValues
    ) {
      setIsLoading(true);
      try {
        await PlaceListing(
          title,
          description,
          inputFieldValues,
          formattedDate,
          url
        );
        setModalOpen(true);
      } catch (error) {
        setApiError(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Some required fields are empty or contain invalid URLs.");
    }
  };

  return (
    <div className="bg-midnightBlue w-full text-myWhite mb-40">
      <Image
        className="w-[370px] h-auto my-auto mx-auto py-mobMargin"
        src={logo}
        alt="SaleChampz logo"
      />
      <h1 className="font-serif text-[27px] w-fit mx-auto">New Listing</h1>
      <form className="p-mobMargin">
        <div className="my-mobMargin">
          <GenericInput
            onInputChange={titleValue}
            label="Title*"
            helpText="*Required - What are you selling?"
            hasError={titleError}
            error={titleError}
          />
        </div>
        <div className="my-mobMargin">
          <TextArea
            label="Description"
            onInputChange={descriptionValue}
            hasError={descriptionError}
          />
        </div>
        <div className="my-mobMargin">
          <PickDate
            label="Bids ends at*"
            onInputChange={timeValue}
            hasError={timeError}
          />
        </div>
        <div className="my-mobMargin flex flex-col mx-auto max-w-[600px]">
          {fields.map((field, index) => (
            <div className="my-1 " key={index}>
              <div className="flex relative w-full">
                <GenericInput
                  label={field.label}
                  onInputChange={(value) => updateInputFieldValue(index, value)}
                  hasError={inputFieldErrors[index]}
                  error={inputFieldErrors[index]}
                  helpText={index === 0 ? "*Required - Upload URL" : ""}
                />
                {index > 0 && (
                  <MdRemove
                    className="w-[38px] h-[38px] cursor-pointer hover:w-[40px] hover:h-[40px] absolute -right-2 top-[12%]"
                    onClick={() => handleRemoveField(field.id)}
                  />
                )}
              </div>
            </div>
          ))}
          <div
            onClick={handleAddField}
            className=" flex h-[40px] cursor-pointer group  mx-auto"
          >
            {fields.length < 3 && (
              <>
                <MdAdd className="w-[38px] h-[38px]  group-hover:w-[40px] hover:h-[40px]" />
                <p className="ml-2 my-auto group-hover:font-bold group-hover:ml-1">
                  Add more item images
                </p>
              </>
            )}
          </div>
        </div>
        {isLoading && (
          <div className="w-fit mx-auto">
            <LoadingSpinner />
          </div>
        )}
        <div className="w-fit mx-auto my-mobMargin h-[53px]">
          <Button content="LIST ITEM" handler={handler} />
        </div>
        <div className="text-sunnyOrange font-button text-[20px] w-fit mx-auto">
          {apiError}
        </div>
      </form>
      {isModalOpen && (
        <div className="fixed inset-0 h-full z-50  bg-midnightBlue bg-opacity-90">
          <div
            onClick={closeModal}
            className=" absolute top-1 right-5 lex justify-center mt-mobMargin cursor-pointer h-[40px] text-myWhite"
          >
            <MdClose className="h-[34px] w-[34px] hover:w-[40px] hover:h-[40px] my-auto" />
          </div>
          <div className="w-full h-full relative">
            <div className="flex-col justify-center align-middle w-full p-mobMargin mx-auto mt-40 text-myWhite">
              <h1 className="font-serif text-center text-[27px]">
                Your item has been listed!
              </h1>
              <p className="max-w-[300px] font-sans text-center mx-auto pt-2">
                You can monitor the progress of this listing on your profile
                under My Bids & Listings.
              </p>
              <div className="w-fit mx-auto p-mobMargin flex">
                <MdArrowBackIosNew className="h-[24px] w-[24px] my-auto" />

                <Link href="/auction">
                  <p className="font-button hover:underline text-[20px] pl-[5px]">
                    Return to Auction
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function convertDateToISO(inputDate) {
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

//Regex from ChatGPT
function isValidUrl(value) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(value);
}
