import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import Button from "../Button";
import { useState, useEffect } from "react";
import IsLoggedIn from "../tools/IsLoggedIn";
import { getName } from "../tools/Utils";
import Greeting from "../tools/Greeting";
import Username from "../tools/Username";

const optionStyling = "bg-myWhite font-semibold font-button";

export default function AuctionMessage({ onInputChange }) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    if (onInputChange) {
      onInputChange(searchValue, sortValue);
    }
  }, [searchValue, sortValue, onInputChange]);

  return (
    <section className="p-mobMargin">
      <div className="max-w-[577px] mx-auto">
        <IsLoggedIn
          fallback={
            <>
              {" "}
              <h1 className=" text-myWhite font-serif text-[27px] ">
                Lets go Treasure-hunting!
              </h1>
              <h2 className="font-sans text-myWhite  text-[18px] mt-6 mb-10  w-fit ">
                Register now and get 1000 credits to use right away.
              </h2>
              <div className="mx-auto w-fit h-[51px] ">
                <Link href="/register">
                  <Button
                    textColor="text-myWhite"
                    content="REGISTER NOW"
                    bgColor="bg-cherryRed"
                    secColor="bg-myBlack"
                  />
                </Link>
              </div>
            </>
          }
        >
          <h1 className=" text-myWhite font-serif text-[27px] flex">
            <Greeting />,{" "}
            {Username()?.charAt(0).toUpperCase() + Username()?.slice(1)}
          </h1>
          <h2 className="font-sans text-myWhite  text-[18px] mt-6 mb-10  w-fit ">
            {
              "Let's go Treasure-hunting! We're excited to have you here and can't wait for you to explore all the amazing items up for bid. Wishing you the best of luck and happy bidding."
            }
          </h2>
        </IsLoggedIn>

        <div className=" flex mt-16 w-full mx-auto h-fit justify-center  ">
          <div className="flex group w-full">
            {!isInputFocused && (
              <div className="bg-myWhite rounded-l-lg  flex  justify-center  ">
                <BsSearch className="w-[30px] h-[30px] m-[10px] my-auto" />
              </div>
            )}
            <input
              className="ml-1 h-[51px] w-full rounded-r-lg px-2 focus:outline-sunnyOrange "
              type="search"
              id="auction-search"
              placeholder="Find Listings..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            ></input>
          </div>

          <select
            className="ml-6 px-[16px] bg-sunnyOrange rounded-lg  text-xl font-semibold font-button h-[51px] drop-shadow-button "
            name="sortBy"
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
          >
            <option className={optionStyling}>Sort By </option>
            <option className={optionStyling}>Newest</option>
            <option className={optionStyling}>Oldest</option>
            <option className={optionStyling}>High Bid</option>
            <option className={optionStyling}>Low Bid</option>
            <option className={optionStyling}>Title A-Z</option>
            <option className={`${optionStyling}`}>Title Z-A</option>
          </select>
        </div>
      </div>
    </section>
  );
}
