import { MdGavel, MdHome, MdLogin, MdPersonAdd, MdClose } from "react-icons/md";
import { CgMenuRight, CgMenu } from "react-icons/cg";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/logo/logo_white.png";

const activeLink = "flex text-myWhite font-bold underline";
const sleepLink = "flex text-whyte";

const burgerItem =
  "hover:text-myWhite hover:bg-burgundyVelvet cursor-pointer p-mobMargin border-t-2 font-button  text-[20px]";

const burgerIcon = "w-[30px] h-[30px] mr-2";

export default function Header() {
  const router = useRouter();
  const currentRoute = router.pathname;

  const [showMenu, setShowMenu] = useState(false);
  const handleClick = () => {
    setShowMenu(!showMenu);
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
            <li
              onClick={handleClick}
              className="hover:text-myWhite hover:bg-burgundyVelvet cursor-pointer p-mobMargin font-button  text-[20px]"
            >
              <MdClose className={burgerIcon} />
            </li>
            <li className={burgerItem}>
              {" "}
              <Link href="/" className="flex">
                <MdHome className={burgerIcon} />
                Home
              </Link>
            </li>
            <li className={burgerItem}>
              {" "}
              <Link href="/auction" className="flex">
                <MdGavel className={burgerIcon} />
                Auction
              </Link>
            </li>
            <li className={burgerItem}>
              <Link href="/login" className="flex">
                <MdLogin className={burgerIcon} />
                Sign In
              </Link>
            </li>
            <li className={burgerItem}>
              <Link href="/register" className="flex">
                <MdPersonAdd className={burgerIcon} />
                New User?
              </Link>
            </li>
          </ul>
        </section>
      )}
    </>
  );
}
