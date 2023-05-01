import Image from "next/image";
import browse from "../../public/images/browse-jaelynn-castillo-3dGIvxKiQiQ-unsplash.jpg";
import bid from "../../public/images/spent.jpg";
import buy from "../../public/images/kelly-sikkema-zcAgxLryKe4-unsplash.jpg";
import Link from "next/link";
import IsLoggedIn from "../tools/IsLoggedIn";

const imageStyling =
  "w-40 h-40 border-solid border-4 border-myBlack rounded-full mx-auto";

const textStyling = "text-myWhite font-serif mt-3 text-2xl text-center  ";

const container = "flex-col w-[210px] mx-auto xl:mx-0";

export default function HomeContent() {
  return (
    <section className="h-full flex-col gap-8 mt-10 mb-10 xl:flex-row xl:mb-0 xl:flex xl:justify-center xl:gap-56">
      <div className={container}>
        <IsLoggedIn
          fallback={
            <Image
              className={imageStyling}
              src={browse}
              alt="Phone being used"
            />
          }
        >
          {" "}
          <Link href="/auction">
            <Image
              className={imageStyling}
              src={browse}
              alt="Phone being used"
            />
          </Link>
        </IsLoggedIn>
        <h2 className={textStyling}>Browse Auctions</h2>
      </div>
      <div className={`my-10 xl:my-0 ${container}`}>
        <IsLoggedIn
          fallback={
            <Image
              className={imageStyling}
              src={bid}
              alt="Woman with glasses biting pencil"
            />
          }
        >
          {" "}
          <Link href="/listing">
            {" "}
            <Image
              className={imageStyling}
              src={bid}
              alt="Woman with glasses biting pencil"
            />
          </Link>
        </IsLoggedIn>

        <h2 className={textStyling}>List Items</h2>
      </div>
      <div className={container}>
        <IsLoggedIn
          fallback={
            <Image
              className={imageStyling}
              src={buy}
              alt="Buy and Sell plaque"
            />
          }
        >
          {" "}
          <Link href="/profiles/bids&listings/">
            {" "}
            <Image
              className={imageStyling}
              src={buy}
              alt="Buy and Sell plaque"
            />
          </Link>
        </IsLoggedIn>

        <h2 className={textStyling}>Bids and Listings</h2>
      </div>
    </section>
  );
}

// (profiles / bids) & (listings / nbut);
