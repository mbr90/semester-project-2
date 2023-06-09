import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import FormatDate from "./tools/FormatDate";
import Link from "next/link";

export default function AuctionCardReusable(props) {
  const {
    title = "Title",
    description = "Description",
    image = "https://unsplash.com/photos/DrI1aOKfAD8",
    bidders = "0",
    bid = "0",
    ends = "12/12/2012 at 23:59:00",
    seller = "The seller",
    id = "404",
  } = props;
  const defaultImage = "/images/defaultProduct.avif";

  const [isClicked, setIsClicked] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef(null);
  const clicked = () => {
    setIsClicked(!isClicked);
  };

  function getSingleImageUrl(image) {
    if (Array.isArray(image)) {
      return image[0];
    }
    return image;
  }

  const imageUrl = getSingleImageUrl(image);

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseInt(
        window
          .getComputedStyle(descriptionRef.current)
          .getPropertyValue("line-height")
      );
      const containerHeight = descriptionRef.current.clientHeight;
      const scrollHeight = descriptionRef.current.scrollHeight;

      const screenWidth = window.innerWidth;
      let linesThreshold;
      if (screenWidth <= 480) {
        linesThreshold = 2;
      } else {
        linesThreshold = 3;
      }

      const truncatedHeight = lineHeight * linesThreshold;

      setIsTruncated(
        scrollHeight > containerHeight && scrollHeight > truncatedHeight
      );
    }
  }, [description]);

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  const textMinimized = "line-clamp-3 font-sans text-[18px]    ";
  const textMaximized = "line-clamp font-sans text-[18px]     ";

  return (
    <section className=" w-full min-h-[717px]  bg-midnightBlue max-w-[577px] xl:w-[510px] min-[578px]:rounded-lg mx-auto xl:mx-0 my-10 flex-col overflow-hidden">
      <Link href={`/auctions/${id}`}>
        {!image || image.length === 0 ? (
          <img
            src={defaultImage}
            alt="Default Image"
            className="w-full h-[348px] my-auto object-cover shadow-lg hover:scale-105 transition-transform ease-out dura duration-1000 cursor-pointer"
            onError={handleImageError}
          />
        ) : (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-[348px] my-auto object-cover shadow-lg hover:scale-105 transition-transform ease-out duration-1000 cursor-pointer"
            onError={handleImageError}
          />
        )}
      </Link>
      <div className="w-full bg-burgundyVelvet h-[67px] flex text-myWhite text-[18px] justify-between px-10">
        <h2 className="my-auto">
          <span className="font-bold text-[24px]">{bid}</span> Credits
        </h2>
        <h2 className="my-auto">{bidders} bidders</h2>
      </div>
      <div
        onClick={clicked}
        className={`p-mobMargin cursor-pointer text-myWhite flex w-full min-h-[180px] ${
          isTruncated ? "" : "pointer-events-none"
        }`}
      >
        <div className="w-11/12">
          <h1 className="font-serif text-[27px]">{title}</h1>
          <p
            ref={descriptionRef}
            className={isClicked ? textMaximized : textMinimized}
          >
            {description}
          </p>
        </div>

        {isTruncated && (
          <>
            {!isClicked && (
              <MdOutlineKeyboardArrowDown className="w-[30px] h-[30px] ml-auto mr-0 mt-[5px]" />
            )}
            {isClicked && (
              <MdOutlineKeyboardArrowUp className="w-[30px] h-[30px] ml-auto mr-0 mt-[5px]" />
            )}
          </>
        )}
      </div>
      <div className="border-t-2 border-myWhite flex justify-between pl-mobMargin py-mobMargin pr-[20px]">
        <div className="flex-col text-myWhite font-sans mr-4">
          <p className="mb-3">
            <span className="font-bold">Seller: </span>
            {seller}
          </p>
          <p>
            <span className="font-bold">Ends:</span> <FormatDate date={ends} />
          </p>
        </div>

        <Link tabIndex={-1} href={`/auctions/${id}`}>
          {" "}
          <Button content="BID NOW" />
        </Link>
      </div>
    </section>
  );
}
