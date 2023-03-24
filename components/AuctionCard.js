import Image from "next/image";
import test from "../public/images/spent.jpg";
import { useState } from "react";
import Button from "./Button";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

export default function AuctionCard() {
  const [isClicked, setIsClicked] = useState(false);

  const clicked = () => {
    setIsClicked(!isClicked);
  };

  const textMinimized = "line-clamp-3 font-sans text-[18px]    ";
  const textMaximized = "line-clamp font-sans text-[18px]     ";

  return (
    <section className="w-full min-h-[717px]  bg-midnightBlue max-w-[577px] mx-auto my-10 flex-col">
      <Image
        className="w-full h-[348px] my-auto object-cover"
        src={test}
        alt="testimage"
      />
      <div className="w-full bg-burgundyVelvet h-[67px] flex text-myWhite text-[20px] justify-between px-10">
        <h2 className="my-auto">150 Credits</h2>
        <h2 className="my-auto">7 bidders</h2>
      </div>
      <div
        onClick={clicked}
        className="p-mobMargin cursor-pointer text-myWhite flex w-full"
      >
        <div className="w-11/12">
          <h1 className="font-serif text-[27px]">Duis vesitbulum</h1>
          <p className={isClicked ? textMaximized : textMinimized}>
            An exclusive leather bag made from premium-grade leather. The
            leather is soft, supple and rich in texture Interdum et malesuada
            fames ac ante ipsum primis in faucibus. Pellentesque et pretium
            diam. Fusce non efficitur nisl, at rhoncus enim. Phasellus eleifend
            metus in ipsum venenatis volutpat. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia curae; Etiam
            suscipit eget quam ut consectetur. Maecenas bibendum accumsan metus,
            at maximus velit accumsan in. Donec tempor euismod lorem sed
            fringilla.
          </p>
        </div>

        {!isClicked && (
          <MdOutlineKeyboardArrowDown className="w-[30px] h-[30px] ml-auto mr-0 mt-[5px]" />
        )}
        {isClicked && (
          <MdOutlineKeyboardArrowUp className="w-[30px] h-[30px] ml-auto mr-0 mt-[5px]" />
        )}
      </div>
      <div className="border-t-2 border-myWhite flex justify-between pl-mobMargin py-mobMargin pr-[20px]">
        <div className="flex-col text-myWhite">
          <p className="mb-3">
            <span className="font-bold">Seller:</span> Nulla facilisi
          </p>
          <p>
            <span className="font-bold">Ends:</span> 07/05/29 At 23:59:00
          </p>
        </div>

        <Button content="BID NOW" />
      </div>
    </section>
  );
}
