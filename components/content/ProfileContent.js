import GetProfileData from "../api/fetch/GetProfileData";
import Username from "../tools/Username";
import { greetings } from "../tools/RandomGreeting";
import Button from "../Button";
import { useState, useEffect } from "react";
import Accordion from "../Accordion";
import { MdClose } from "react-icons/md";
import GenericInput from "./form/GenericInput";
import { useRouter } from "next/router";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const ProfileURL = "https://api.noroff.dev/api/v1/auction/profiles/";
export default function ProfileContent() {
  const router = useRouter();
  const [itemDetails, setItemDetails] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [avtar, setAvatarValue] = useState("");
  const [avtarError, setAvatarError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showRows, setShowRows] = useState(false);
  const toggleRows = () => {
    setShowRows(!showRows);
  };

  const avatarValue = (value) => {
    setAvatarValue(value);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  let data;
  let userBids;
  if (Username()) {
    const profileEndpoint = ProfileURL + Username();
    const profileBids = ProfileURL + Username() + "/bids";
    data = GetProfileData({ endpoint: profileEndpoint });
    userBids = GetProfileData({ endpoint: profileBids });
  }

  const fetchItemDetails = async (itemId) => {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/auction/listings/${itemId}?_bids=true&_seller=true`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchAllItems = async () => {
      if (data && data.wins) {
        const fetchedItems = await Promise.all(data.wins.map(fetchItemDetails));
        setItemDetails(fetchedItems);
      }
    };

    fetchAllItems();
  }, [data]);

  const putAvatar = async (avtar) => {
    try {
      const token = localStorage.getItem("token");

      const body = { avatar: avtar };
      const response = await fetch(
        `https://api.noroff.dev/api/v1/auction/profiles/${Username()}/media`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.errors[0].message);
        error.response = response;
        throw error;
      }

      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const avatar = data?.avatar;
  const avatarUrl = avatar ? avatar : "/images/defaultProfile.jpg";

  const randomIndex = Math.floor(Math.random() * greetings.length);
  const randomGreeting = greetings[randomIndex];

  const name = data?.name?.charAt(0).toUpperCase() + data?.name?.slice(1);

  const liKey = "font-semibold mr-2";

  const validateInput = () => {
    if (avtar.trim() === "") {
      setAvatarError("This field cannot be empty.");
      return false;
    } else if (!isValidUrl(avtar)) {
      setAvatarError("It looks like this is not a valid image URL");
      return false;
    }

    setAvatarError("");
    return true;
  };

  const handler = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    try {
      const response = await putAvatar(avtar);

      if (response.error) {
        setApiError(response.error);
      } else {
        setModalOpen(false);
        router.reload();
      }
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <div className="relative max-w-[1720px] mx-auto">
      <h1 className="text-[27px] text-myWhite font-serif text-center my-mobMargin  px-mobMargin invisible xl:visible absolute -top-[235px] right-0 ">
        {randomGreeting} {name}
      </h1>
      <div className="w-full pb-40 max-w-[1920px] xl:flex xl:mt-28">
        <h1 className="text-[27px] text-myWhite font-serif text-center my-mobMargin px-mobMargin xl:hidden">
          {randomGreeting} {name}
        </h1>
        <div className="xl:flex xl:justify-center xl:w-full relative">
          <div>
            <img
              src={avatarUrl}
              alt="Profile Picture"
              className="object-cover rounded-full h-[300px] w-[300px] xl:h-[400px] xl:w-[400px] mx-auto border-4 border-sunnyOrange"
            ></img>{" "}
            <div className="mx-auto w-fit my-mobMargin h-[53px]">
              <Button content="CHANGE AVATAR" handler={openModal} />
            </div>
          </div>
          <section className="text-myWhite  mx-mobMargin border-b-2 mb-mobMargin py-mobMargin xl:border-none xl:my-auto xl:ml-60">
            <div className="w-fit mx-auto xl:mx-0">
              <h2 className="font-serif text-[27px] xl:mx-0 mx-auto w-fit">
                {name}
              </h2>
              <ul className=" mx-auto flex-col font-sans text-[18px]">
                <div>
                  <li className="xl:mb-4 mt-6">
                    <span className={liKey}>Email:</span>
                    {data?.email}
                  </li>
                  <li>
                    <span className={liKey}>Credits:</span> {data?.credits}
                  </li>
                </div>

                <div className="xl:flex xl:gap-x-4 xl:absolute xl:bottom-6 xl:mr-4">
                  <li className=" flex flex-row xl:flex-col">
                    <div className={liKey}>Auction Wins:</div>
                    <p className="xl:mx-auto"> {data?.wins?.length}</p>
                  </li>
                  <li className=" flex flex-row xl:flex-col">
                    <div className={liKey}>Auction Bids:</div>
                    <p className="xl:mx-auto">{userBids?.length}</p>
                  </li>
                  <li className=" flex flex-row xl:flex-col">
                    <div className={liKey}>My Listings:</div>
                    <p className="xl:mx-auto">{data?._count?.listings}</p>
                  </li>
                </div>
              </ul>
            </div>
          </section>
        </div>

        <div className="xl:hidden">
          <Accordion title="Winning History">
            {" "}
            <div className="w-full bg-midnightBlue">
              <table className="w-[70%] text-myWhite mx-auto">
                <tbody>
                  <tr className="font-sans text-[20px] font-bold">
                    <td className="pb-4">Item</td>
                    <td className="pb-4">Bids</td>
                    <td className="pb-4">Bid</td>
                  </tr>
                  {itemDetails.map((item, index) => {
                    const sortedBids = item.bids.sort(
                      (a, b) => b.amount - a.amount
                    );
                    const highestBid = sortedBids[0]?.amount;

                    return (
                      <tr key={index}>
                        <td className="py-2 flex relative">{item.title}</td>
                        <td className="py-2"> {item.bids.length}</td>
                        <td className="py-2">{highestBid}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Accordion>
        </div>

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
                  Edit your avatar
                </h1>
                <form>
                  <div className="my-mobMargin">
                    <GenericInput
                      label="Avatar URL"
                      onInputChange={avatarValue}
                      hasError={avtarError}
                      error={avtarError}
                    />
                  </div>
                  <div className="text-sunnyOrange w-fit pb-8 max-w-[500px] mx-auto">
                    {apiError}
                  </div>
                  <div className="w-fit h-[53px] mx-auto">
                    <Button content="CHANGE AVATAR" handler={handler} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="hidden xl:flex max-w-[1720px] gap-[86px] mx-auto pb-[100px]">
        <div className="bg-midnightBlue w-full text-myWhite p-mobMargin drop-shadow-button">
          <h1 className="ml-mobMargin mt-2 text-[27px] font-serif pb-mobMargin">
            Winning History:
          </h1>

          <table className="text-myWhite mx-auto w-[80%] text-center ">
            <tbody>
              <tr className="font-sans text-[20px] font-bold">
                <td className="pb-4">Item</td>
                <td className="pb-4">Bids</td>
                <td className="pb-4">Bid</td>
              </tr>

              {itemDetails.slice(0, 5).map((item, index) => {
                const sortedBids = item.bids.sort(
                  (a, b) => b.amount - a.amount
                );

                const highestBid = sortedBids[0]?.amount;

                return (
                  <tr key={index}>
                    <td className=" py-2 ">{item.title}</td>
                    <td className=" py-2">{item.bids.length}</td>
                    <td className=" py-2">{highestBid} Credits</td>
                  </tr>
                );
              })}

              {itemDetails.slice(5).map((item, index) => {
                const sortedBids = item.bids.sort(
                  (a, b) => b.amount - a.amount
                );

                const highestBid = sortedBids[0]?.amount;

                return (
                  <tr key={index}>
                    <td className=" py-2 ">{item.title}</td>
                    <td className=" py-2">{item.bids.length}</td>
                    <td className=" py-2">{highestBid} Credits</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {!showRows && itemDetails.length > 5 && (
            <div className="w-full h-[60px] ">
              <div
                tabIndex={0}
                className="cursor-pointer mx-auto w-fit"
                onClick={toggleRows}
                onKeyPress={toggleRows}
              >
                <MdOutlineKeyboardArrowDown className="h-[44px] w-[44px] hover:h-[50px] hover:w-[50px]" />
              </div>
            </div>
          )}

          {showRows && itemDetails.length > 5 && (
            <div className="w-full h-[60px] ">
              <div
                tabIndex={0}
                className="cursor-pointer mx-auto w-fit"
                onClick={toggleRows}
                onKeyPress={toggleRows}
              >
                <MdOutlineKeyboardArrowUp className="h-[44px] w-[44px] hover:h-[50px] hover:w-[50px]" />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function isValidUrl(value) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?" +
      ".*\\.(jpg|jpeg|png|gif|bmp|webp)((\\?.*)?)$",
    "i"
  );
  return !!pattern.test(value);
}
