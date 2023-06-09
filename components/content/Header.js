import {
  MdGavel,
  MdHome,
  MdLogin,
  MdPersonAdd,
  MdClose,
  MdLogout,
  MdEditSquare,
  MdCurrencyExchange,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { CgMenuRight, CgMenu } from "react-icons/cg";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/logo/logo_white.png";
import IsLoggedIn from "../tools/IsLoggedIn";
import Logout from "../tools/Logout";
import GetProfileData from "../api/fetch/GetProfileData";
import Username from "../tools/Username";

const ProfileURL = "https://api.noroff.dev/api/v1/auction/profiles/";

const activeLink = "flex text-myWhite font-bold underline";
const sleepLink = "flex text-whyte  hover:underline";

const burgerItem =
  "hover:text-myWhite hover:bg-burgundyVelvet cursor-pointer p-mobMargin border-t-2 font-button  text-[20px] flex w-full opacity-[.7] hover:opacity-[1] hover:underline";

const activeBurger =
  "hover:text-myWhite hover:bg-burgundyVelvet cursor-pointer p-mobMargin border-t-2 font-bold  text-[20px] underline flex w-full opacity-1";

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
    router.push("/");
    if (currentRoute === "/") {
      router.reload();
    }
  };

  return (
    <>
      <header className="flex h-28 xl:h-[165px]    pl-[20px] pr-mobMargin bg-gradient-to-b from-[#51333E] to-[#100A0C] w-full relative">
        <div className="xl:px-[100px] xl:max-w-[1920px] flex w-full mx-auto relative ">
          <Link className="my-auto" href="/">
            <div className="w-[200px] xl:w-[350px] h-[auto]">
              <Image
                className=" my-auto object-fit"
                src={logo}
                alt="SaleChampz logo"
              />
            </div>
          </Link>
          <div className="w-full h-full flex justify-end">
            <ul className="xl:flex hidden  text-whyte  gap-5 my-auto font-button text-[20px] ">
              <li className=" flex align-middle gap-1  my-auto hover:underline hover:text-myWhite ">
                <Link
                  href="/"
                  className={currentRoute === "/" ? activeLink : sleepLink}
                >
                  <MdHome className="text-2xl my-auto" />
                  Home
                </Link>
              </li>
              <IsLoggedIn>
                <li className="flex align-middle gap-1  my-auto hover:underline hover:text-myWhite">
                  <Link
                    href="/listing"
                    className={
                      currentRoute === "/listing" ? activeLink : sleepLink
                    }
                  >
                    {" "}
                    <MdEditSquare className="text-2xl my-auto" />
                    New Listing
                  </Link>
                </li>
              </IsLoggedIn>{" "}
              <li className="flex align-middle gap-1  my-auto mr-12 hover:underline hover:text-myWhite">
                <Link
                  href="/auction"
                  className={
                    currentRoute === "/auction" ? activeLink : sleepLink
                  }
                >
                  <MdGavel className="text-2xl my-auto" />
                  Auction
                </Link>
              </li>
              <li className="w-fit h-fit my-auto flex">
                <div
                  tabIndex={0}
                  onClick={handleClick}
                  onKeyPress={handleClick}
                  className="w-[80px] h-[80] my-auto flex-col group  text-myWhite mr-4 mt-6 "
                >
                  <IsLoggedIn
                    fallback={
                      <MdLogin className=" text-[60px] mx-auto  my-auto border-2 rounded-full  group-hover:cursor-pointer group-hover:text-[62px] mb-0 " />
                    }
                  >
                    <img
                      src={avatarUrl}
                      alt="Profile Picture"
                      className="object-cover rounded-full h-[60px] w-[60px] group-hover:w-[62px] group-hover:h-[62px] mx-auto my-auto mr-2  group-hover:cursor-pointer "
                    ></img>{" "}
                  </IsLoggedIn>
                  <MdOutlineKeyboardArrowDown className="text-[30px] mx-auto mt-0 pt-0 group-hover:cursor-pointer group-hover:text-[32px]" />
                </div>
              </li>
            </ul>
          </div>
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
          {showMenu && (
            // Full size menu
            <section
              className={`bg-myWhite w-full drop-shadow-button max-w-[500px] absolute z-30 invisible xl:visible top-[165px] right-[120px] animate-menuAnimation`}
            >
              <ul className="flex-col">
                <IsLoggedIn
                  fallback={
                    <>
                      <li
                        tabIndex={0}
                        onClick={handleClick}
                        onKeyPress={handleClick}
                        className="hover:text-myWhite hover:bg-burgundyVelvet cursor-pointer p-mobMargin font-button  text-[20px]"
                      >
                        <MdClose className={burgerIcon} />
                      </li>

                      <Link href="/login" className="flex">
                        {" "}
                        <li
                          className={
                            currentRoute === "/login"
                              ? activeBurger
                              : burgerItem
                          }
                        >
                          <MdLogin className={burgerIcon} />
                          Sign In
                        </li>{" "}
                      </Link>

                      <Link href="/register" className="flex">
                        {" "}
                        <li
                          className={
                            currentRoute === "/register"
                              ? activeBurger
                              : burgerItem
                          }
                        >
                          <MdPersonAdd className={burgerIcon} />
                          New User?
                        </li>{" "}
                      </Link>
                    </>
                  }
                >
                  <li
                    onClick={handleClick}
                    onKeyPress={handleClick}
                    tabIndex={0}
                    className="hover:text-myWhite hover:bg-burgundyVelvet cursor-pointer p-mobMargin font-button  text-[20px]"
                  >
                    <div className="flex justify-between w-full font-button font-bold">
                      <MdClose className={burgerIcon} /> {Username()}
                    </div>
                  </li>
                  <li className=" p-mobMargin border-t-2 font-button  text-[20px] flex w-full">
                    {" "}
                    <div className="flex justify-between w-full font-button font-bold">
                      {" "}
                      <div>{data?.credits} Credits</div>{" "}
                      <div>{userBids?.length} Bids</div>
                      <div>{data?._count?.listings} Listings</div>
                    </div>
                  </li>{" "}
                  <Link href={`/profiles/${Username()}`} className="flex">
                    <li
                      className={
                        currentRoute === `/profiles/[id]`
                          ? activeBurger
                          : burgerItem
                      }
                    >
                      {" "}
                      <img
                        src={avatarUrl}
                        alt="Profile Picture"
                        className=" object-cover rounded-full h-[30px] w-[30px] my-auto mr-2 "
                      ></img>{" "}
                      Show Profile
                    </li>{" "}
                  </Link>
                  <Link
                    href={`/profiles/bids&listings/${Username()}`}
                    className="flex"
                  >
                    <li
                      className={
                        currentRoute === `/profiles/bids&listings/[id]`
                          ? activeBurger
                          : burgerItem
                      }
                    >
                      {" "}
                      <MdCurrencyExchange className={burgerIcon} /> My Bids &
                      Listings
                    </li>{" "}
                  </Link>
                  <li
                    className={burgerItem}
                    tabIndex={0}
                    onClick={handleLogout}
                    onKeyPress={handleLogout}
                  >
                    <MdLogout className={burgerIcon} />
                    Sign Out
                  </li>{" "}
                </IsLoggedIn>
              </ul>
            </section>
          )}
        </div>
      </header>

      {/* Mobile Menu */}

      {showMenu && (
        <section className="bg-myWhite w-full drop-shadow-button xl:hidden ">
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
                    <li
                      className={
                        currentRoute === `/` ? activeBurger : burgerItem
                      }
                    >
                      {" "}
                      <MdHome className={burgerIcon} />
                      Home
                    </li>{" "}
                  </Link>
                  <Link href="/auction" className="flex">
                    {" "}
                    <li
                      className={
                        currentRoute === `/auction` ? activeBurger : burgerItem
                      }
                    >
                      {" "}
                      <MdGavel className={burgerIcon} />
                      Auction
                    </li>{" "}
                  </Link>

                  <Link href="/login" className="flex">
                    {" "}
                    <li
                      className={
                        currentRoute === `/login` ? activeBurger : burgerItem
                      }
                    >
                      <MdLogin className={burgerIcon} />
                      Sign In
                    </li>{" "}
                  </Link>

                  <Link href="/register" className="flex">
                    {" "}
                    <li
                      className={
                        currentRoute === `/register` ? activeBurger : burgerItem
                      }
                    >
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
                  <MdClose className={burgerIcon} /> {Username()}
                </div>
              </li>
              <li className=" p-mobMargin border-t-2 font-button  text-[20px] flex w-full">
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
                <li
                  className={currentRoute === `/` ? activeBurger : burgerItem}
                >
                  {" "}
                  <MdHome className={burgerIcon} />
                  Home
                </li>{" "}
              </Link>
              <Link href="/auction" className="flex">
                {" "}
                <li
                  className={
                    currentRoute === `/auction` ? activeBurger : burgerItem
                  }
                >
                  {" "}
                  <MdGavel className={burgerIcon} />
                  Auction
                </li>{" "}
              </Link>
              <Link href="/listing" className="flex">
                <li
                  className={
                    currentRoute === `/listing` ? activeBurger : burgerItem
                  }
                >
                  {" "}
                  <MdEditSquare className={burgerIcon} />
                  New Listing
                </li>{" "}
              </Link>
              <Link href={`/profiles/${Username()}`} className="flex">
                <li
                  className={
                    currentRoute === `/profiles/[id]`
                      ? activeBurger
                      : burgerItem
                  }
                >
                  {" "}
                  <img
                    src={avatarUrl}
                    alt="Profile Picture"
                    className=" object-cover rounded-full h-[30px] w-[30px] my-auto mr-2 "
                  ></img>{" "}
                  Show Profile
                </li>{" "}
              </Link>
              <Link
                href={`/profiles/bids&listings/${Username()}`}
                className="flex"
              >
                <li
                  className={
                    currentRoute === `/profiles/bids&listings/[id]`
                      ? activeBurger
                      : burgerItem
                  }
                >
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
