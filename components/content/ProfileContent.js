import GetProfileData from "../api/fetch/GetProfileData";
import Username from "../tools/Username";
import { greetings } from "../tools/RandomGreeting";
import Button from "../Button";
import { useState, useEffect } from "react";
import Accordion from "../Accordion";
import { MdClose } from "react-icons/md";
import GenericInput from "./form/GenericInput";
import { useRouter } from "next/router";

const ProfileURL = "https://api.noroff.dev/api/v1/auction/profiles/";
export default function ProfileContent() {
  const router = useRouter();
  const [itemDetails, setItemDetails] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [avtar, setAvatarValue] = useState("");
  const [avtarError, setAvatarError] = useState(false);
  const [apiError, setApiError] = useState("");

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
      setAvatarError("Invalid URL format.");
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
    <>
      <div className="w-full pb-40">
        <h1 className="text-[27px] text-myWhite font-serif text-center my-mobMargin px-mobMargin">
          {randomGreeting} {name}
        </h1>
        <img
          src={avatarUrl}
          alt="Profile Picture"
          className="rounded-full h-[300px] w-[300px] mx-auto border-4 border-sunnyOrange"
        ></img>{" "}
        <div className="mx-auto w-fit my-mobMargin h-[53px]">
          <Button content="CHANGE AVATAR" handler={openModal} />
        </div>
        <section className="text-myWhite  mx-mobMargin border-b-2 mb-mobMargin py-mobMargin">
          <h2 className="font-serif text-[27px]">{name}</h2>
          <ul className=" flex-col font-sans text-[18px]">
            <li>
              <span className={liKey}>Email:</span>
              {data?.email}
            </li>
            <li>
              <span className={liKey}>Credits:</span> {data?.credits}
            </li>
            <li>
              <span className={liKey}>Auction Wins:</span>
              {data?.wins?.length}
            </li>
            <li>
              <span className={liKey}>Auction Bids:</span>
              {userBids?.length}
            </li>
            <li>
              <span className={liKey}>My Listings:</span>
              {data?._count?.listings}
            </li>
          </ul>
        </section>
        <Accordion title="Winning History">
          {" "}
          <div className="w-full bg-midnightBlue">
            <table className="table-auto min-w-[300px] max-w-[500px] flex-col  text-myWhite mx-auto">
              <thead>
                <tr className="font-sans text-[20px]">
                  <th className=" px-4 py-2">Item</th>
                  <th className=" px-4 py-2">Bids</th>
                  <th className=" px-4 py-2">Bid</th>
                </tr>
              </thead>
              <tbody>
                {itemDetails.map((item, index) => {
                  const sortedBids = item.bids.sort(
                    (a, b) => b.amount - a.amount
                  );
                  const highestBid = sortedBids[0]?.amount;

                  return (
                    <tr className="w-full" key={index}>
                      <td className="px-4 py-2 flex relative">{item.title}</td>
                      <td className="px-4 py-2">{item.bids.length}</td>
                      <td className="px-4 py-2">{highestBid}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Accordion>
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
                  <div className="text-sunnyOrange w-fit max-w-[300px] mx-auto">
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
    </>
  );
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
