import {
  MdGavel,
  MdHome,
  MdLogin,
  MdPersonAdd,
  MdClose,
  MdLogout,
  MdEditSquare,
  MdCurrencyExchange,
} from "react-icons/md";
import { CgMenuRight, CgMenu } from "react-icons/cg";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/logo/logo_white.png";
import IsLoggedIn from "../tools/IsLoggedIn";
import Logout from "../tools/Logout";
import { getName } from "../tools/Utils";
import GetProfileData from "../api/fetch/GetProfileData";
import { ProfileURL } from "../Variables";
import Username from "../tools/Username";

const activeLink = "flex text-myWhite font-bold underline";
const sleepLink = "flex text-whyte";

const burgerItem =
  "hover:text-myWhite hover:bg-burgundyVelvet cursor-pointer p-mobMargin border-t-2 font-button  text-[20px] flex w-full";

const burgerIcon = "w-[30px] h-[30px] mr-2";

export default function Header() {
  const router = useRouter();
  const currentRoute = router.pathname;

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

  const [showMenu, setShowMenu] = useState(false);
  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    Logout();
    router.reload();
  };

  return (
    <>
      <header className="flex h-28 align-middle justify-between pl-[20px] pr-mobMargin bg-gradient-to-b from-[#51333E] to-[#100A0C]">
        <Link className="my-auto" href="/">
          <Image
            className="w-60 h-14 my-auto"
            src={logo}
            alt="SaleChampz logo"
          />
        </Link>
        <ul className="xl:flex hidden text-whyte  gap-5 my-auto">
          <li className=" flex align-middle gap-1 text-2xl my-auto hover:underline hover:text-myWhite ">
            <Link
              href="/"
              className={currentRoute === "/" ? activeLink : sleepLink}
            >
              <MdHome className="text-3xl" />
              Home
            </Link>
          </li>
          <li className="flex align-middle gap-1 text-2xl my-auto hover:underline hover:text-myWhite">
            <Link
              href="/auction"
              className={currentRoute === "/auction" ? activeLink : sleepLink}
            >
              <MdGavel className="text-3xl" />
              Auction
            </Link>
          </li>
          <li>
            <MdLogin className="text-7xl text-myWhite mr-20 ml-20 my-auto border-2 rounded-full p-1" />
          </li>
        </ul>
        <div
          onClick={handleClick}
          className=" my-auto xl:hidden text-myWhite  w-fit h-fit cursor-pointer group "
        >
          {!showMenu && (
            <div className="my-auto relative">
              <CgMenuRight className="text-myWhite xl:hidden w-[30px] h-[30px] my-auto relative z-20 group-hover-invisible cursor-pointer  " />
              <CgMenu className="text-myWhite xl:hidden w-[30px] h-[30px] my-auto absolute top-0 l-0 invisible z-10 group-hover:visible cursor-pointer" />
            </div>
          )}
          {showMenu && <CgMenu className="w-[30px] h-[30px]" />}
        </div>
      </header>

      {showMenu && (
        <section className="bg-myWhite w-full drop-shadow-button">
          <ul className="flex-col">
            <IsLoggedIn
              fallback={
                <>
                  <li
                    onClick={handleClick}
                    className="hover:text-myWhite hover:bg-burgundyVelvet cursor-pointer p-mobMargin font-button  text-[20px]"
                  >
                    <MdClose className={burgerIcon} />
                  </li>
                  <Link href="/" className="flex">
                    {" "}
                    <li className={burgerItem}>
                      {" "}
                      <MdHome className={burgerIcon} />
                      Home
                    </li>{" "}
                  </Link>
                  <Link href="/auction" className="flex">
                    {" "}
                    <li className={burgerItem}>
                      {" "}
                      <MdGavel className={burgerIcon} />
                      Auction
                    </li>{" "}
                  </Link>

                  <Link href="/login" className="flex">
                    {" "}
                    <li className={burgerItem}>
                      <MdLogin className={burgerIcon} />
                      Sign In
                    </li>{" "}
                  </Link>

                  <Link href="/register" className="flex">
                    {" "}
                    <li className={burgerItem}>
                      <MdPersonAdd className={burgerIcon} />
                      New User?
                    </li>{" "}
                  </Link>
                </>
              }
            >
              <li
                onClick={handleClick}
                className="hover:text-myWhite hover:bg-burgundyVelvet cursor-pointer p-mobMargin font-button  text-[20px]"
              >
                <div className="flex justify-between w-full font-button font-bold">
                  <MdClose className={burgerIcon} /> {getName()}
                </div>
              </li>
              <li className={burgerItem}>
                {" "}
                <div className="flex justify-between w-full font-button font-bold">
                  {" "}
                  <div>{data?.credits} Credits</div>{" "}
                  <div>{userBids?.length} Bids</div>
                  <div>{data?._count?.listings} Listings</div>
                </div>
              </li>{" "}
              <Link href="/" className="flex">
                {" "}
                <li className={burgerItem}>
                  {" "}
                  <MdHome className={burgerIcon} />
                  Home
                </li>{" "}
              </Link>
              <Link href="/auction" className="flex">
                {" "}
                <li className={burgerItem}>
                  {" "}
                  <MdGavel className={burgerIcon} />
                  Auction
                </li>{" "}
              </Link>
              <Link href="/" className="flex">
                <li className={burgerItem}>
                  {" "}
                  <MdEditSquare className={burgerIcon} />
                  New Listing
                </li>{" "}
              </Link>
              <Link href="/" className="flex">
                <li className={burgerItem}>
                  {" "}
                  <img
                    src={avatarUrl}
                    alt="Profile Picture"
                    className="rounded-full h-[30px] w-[30px] my-auto mr-2 "
                  ></img>{" "}
                  Show Profile
                </li>{" "}
              </Link>
              <Link href="/" className="flex">
                <li className={burgerItem}>
                  {" "}
                  <MdCurrencyExchange className={burgerIcon} /> My Bids &
                  Listings
                </li>{" "}
              </Link>
              <li className={burgerItem} onClick={handleLogout}>
                <MdLogout className={burgerIcon} />
                Sign Out
              </li>{" "}
            </IsLoggedIn>
          </ul>
        </section>
      )}
    </>
  );
}
