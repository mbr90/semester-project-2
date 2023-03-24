import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import Button from "../Button";
import { useState } from "react";

const optionStyling = "bg-myWhite font-semibold font-button";

export default function AuctionMessage() {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <section className="p-mobMargin">
      <div className="max-w-[577px] mx-auto">
        <h1 className=" text-myWhite font-serif text-[27px] text-center">
          Lets go Treasure-hunting!
        </h1>
        <h2 className="font-sans text-myWhite  text-[18px] mt-6 mb-10  w-fit mx-auto">
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

        <div className=" flex mt-16 w-full mx-auto h-fit justify-center  ">
          <div className="flex group w-full">
            {!isInputFocused && (
              <div className="bg-myWhite rounded-l-lg  flex  justify-center  ">
                <BsSearch className="w-[30px] h-[30px] m-[10px] my-auto" />
              </div>
            )}
            <input
              className="ml-1 h-[51px] w-full rounded-r-lg pl-2 "
              type="search"
              id="auction-search"
              placeholder="Find Listings..."
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            ></input>
          </div>

          <select
            className="ml-6 px-[16px] bg-sunnyOrange rounded-lg  text-xl font-semibold font-button h-[51px] drop-shadow-button "
            name="sortBy"
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
