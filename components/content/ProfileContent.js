import GetProfileData from "../api/fetch/GetProfileData";
import Username from "../tools/Username";
import { greetings } from "../tools/RandomGreeting";
import Button from "../Button";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useState } from "react";
// import Avatar from "./form/Avatar";

const ProfileURL = "https://api.noroff.dev/api/v1/auction/profiles/";
export default function ProfileContent() {
  const [isClicked, setIsClicked] = useState(false);

  const clicked = () => {
    setIsClicked(!isClicked);
  };

  let data;
  let userBids;
  if (Username()) {
    const profileEndpoint = ProfileURL + Username();
    const profileBids = ProfileURL + Username() + "/bids";
    data = GetProfileData({ endpoint: profileEndpoint });
    userBids = GetProfileData({ endpoint: profileBids });
  }

  const avatar = data?.avatar;
  const avatarUrl = avatar ? avatar : "/images/defaultProfile.jpg";

  const randomIndex = Math.floor(Math.random() * greetings.length);
  const randomGreeting = greetings[randomIndex];

  const name = data?.name?.charAt(0).toUpperCase() + data?.name?.slice(1);

  const liKey = "font-semibold mr-2";

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
          <Button content="CHANGE AVATAR" />
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
        <div className="h-[250px]">
          <div className="w-full flex bg-midnightBlue drop-shadow-button text-myWhite h-28">
            <div
              className="flex mx-auto my-auto w-full max-w-[400px]  text-[27px] cursor-pointer"
              onClick={clicked}
            >
              <h3 className="font-serif mx-auto">Winning History</h3>{" "}
              {!isClicked && (
                <MdOutlineKeyboardArrowDown className="w-[40px] h-[40px] ml-auto mr-4 mt-[5px]" />
              )}
              {isClicked && (
                <MdOutlineKeyboardArrowUp className="w-[40px] h-[40px] ml-auto mr-4 mt-[5px]" />
              )}
            </div>
          </div>
          {isClicked && (
            <table className="table-auto w-full bg-midnightBlue text-myWhite">
              <thead>
                <tr className="font-sans text-[20px]">
                  <th className=" px-4 py-2">Item</th>
                  <th className=" px-4 py-2">Bids</th>
                  <th className=" px-4 py-2">Bid</th>
                </tr>
              </thead>
              <tbody>
                <tr className="mx-auto">
                  <td className=" px-4 py-2">Row 1, Col 1</td>
                  <td className="px-4 py-2">Row 1, Col 2</td>
                  <td className=" px-4 py-2">Row 1, Col 3</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        {/* <Avatar /> */}
      </div>
    </>
  );
}
