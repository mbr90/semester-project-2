import Head from "next/head";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import Return from "@/components/Return";
import RoundedButton from "@/components/RoundedButton";
import {
  MdArrowBack,
  MdArrowForward,
  MdArrowBackIosNew,
  MdClose,
} from "react-icons/md";
import { FaCrown } from "react-icons/fa";
import { useState } from "react";
import Button from "@/components/Button";
import FormatDate from "@/components/tools/FormatDate";
import GenericInput from "@/components/content/form/GenericInput";
import Accordion from "@/components/Accordion";
import GetProfileData from "@/components/api/fetch/GetProfileData";
import { DateNTime } from "@/components/tools/FormatDate";
import Username from "@/components/tools/Username";
import BidOnAuction from "@/components/api/post/BidOnAuction";
import Link from "next/link";
import { useRouter } from "next/router";
import IsLoggedIn from "@/components/tools/IsLoggedIn";

export default function AuctionItem({ data, id, errorMessage }) {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);
  const [bid, setBid] = useState("");
  const [bidValid, setBidValid] = useState(false);
  const [emptyField, setEmptyField] = useState("");
  const [bidError, setBidError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const defaultImage = "/images/defaultProduct.avif";
  const defaultAvatar = "/images/defaultProfile.jpg";
  const liKey = "font-semibold mr-2";
  let amount = parseInt(bid);

  const bidValue = (value) => {
    setBid(value);
    setBidValid(validateBid(value));
  };

  const validateBid = (value) => {
    const valid = value !== "" && !isNaN(value);
    setBidValid(valid);
    return valid;
  };

  const handler = async (e) => {
    e.preventDefault();
    if (!bidValid) {
      setEmptyField("bid");
      return;
    }

    try {
      await BidOnAuction(bidEndpoint, amount);
      setModal2Open(true);
    } catch (error) {
      setBidError(error.message);
    }
  };

  const closeBid = () => {
    setModal2Open(false);
    router.reload();
  };

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % data.media.length);
  };

  const handlePrev = () => {
    setCurrentSlide((currentSlide - 1 + data.media.length) % data.media.length);
  };

  const bids = data.bids;
  const highestBidAmount = bids.reduce((accumulator, current) => {
    if (current.amount > accumulator) {
      accumulator = current.amount;
    }
    return accumulator;
  }, 0);

  const profileEndpoint = `https://api.noroff.dev/api/v1/auction/profiles/${data.seller.name}/`;
  const profile = GetProfileData({ endpoint: profileEndpoint });

  const userEndpoint = `https://api.noroff.dev/api/v1/auction/profiles/${Username()}/`;
  const user = GetProfileData({ endpoint: userEndpoint });

  const bidEndpoint = `https://api.noroff.dev/api/v1/auction/listings/${id}/bids`;

  const sortedBids = data.bids.slice().sort((a, b) => b.amount - a.amount);
  const highestBid = sortedBids.length > 0 ? sortedBids[0].amount : 0;

  if (errorMessage) {
    return <div className="p-4 text-red-500">{errorMessage}</div>;
  }

  return (
    <>
      <Head>
        <title>ItemName</title>
        <meta name="description" content="Detailed view of Item" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/icon.png" />
      </Head>
      <Header />
      <Return />
      <main className="flex-col min-h-screen w-full">
        <section className="w-full bg-plumWine py-mobMargin">
          <div className="max-w-[577px] bg-midnightBlue  mx-auto">
            <div className="slideshow-container relative w-full h-[300px] overflow-hidden ">
              {!data?.media || data?.media?.length === 0 ? (
                <img
                  src={defaultImage}
                  alt="Default Image"
                  className="slide object-cover h-96 w-full cursor-pointer"
                  onClick={() => setModalOpen(true)}
                />
              ) : (
                <img
                  src={data.media[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="slide object-cover h-96 w-full cursor-pointer"
                  onClick={() => setModalOpen(true)}
                />
              )}
              {isModalOpen && (
                <div className="fixed inset-0 h-full z-50  bg-midnightBlue bg-opacity-90">
                  <div
                    className="w-full h-full pb-mobMargin"
                    style={{ overflowY: "auto" }}
                  >
                    <div className="w-fit h-fit mx-auto mt-40">
                      {!data?.media || data?.media?.length === 0 ? (
                        <img
                          src={defaultImage}
                          alt="Default Image"
                          className="slide object-cover h-96 w-full"
                        />
                      ) : (
                        <img
                          src={data.media[currentSlide]}
                          alt={`Slide ${currentSlide + 1}`}
                          className="slide object-cover h-96 w-full cursor-pointer"
                        />
                      )}
                    </div>
                    <div className="flex justify-center mt-mobMargin">
                      <Button
                        content="CLOSE"
                        handler={() => setModalOpen(false)}
                      />
                    </div>
                  </div>
                </div>
              )}
              {data?.media && data.media.length > 1 && (
                <>
                  <div className="slideshow-nav absolute bottom-1/3 left-4 right-auto flex justify-center">
                    <RoundedButton
                      handler={handlePrev}
                      content={<MdArrowBack />}
                    />
                  </div>
                  <div className="slideshow-nav absolute bottom-1/3 left-auto right-2 flex justify-center">
                    <RoundedButton
                      handler={handleNext}
                      content={<MdArrowForward />}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="p-mobMargin">
              <h1 className="text-myWhite font-serif text-[27px]">
                {data.title}
              </h1>
              <ul className="flex-col font-sans text-[18px] text-myWhite">
                <li>
                  {" "}
                  <span className={liKey}>Listed date:</span>
                  {new Intl.DateTimeFormat("nb-NO", options).format(
                    new Date(data.created)
                  )}
                </li>
                <li>
                  {" "}
                  <span className={liKey}>Updated:</span>
                  {new Intl.DateTimeFormat("nb-NO", options).format(
                    new Date(data.updated)
                  )}
                </li>
                <li>
                  {" "}
                  <span className={liKey}>Ends:</span>
                  <FormatDate date={data.endsAt} />
                </li>
                <li>
                  {" "}
                  <span className={liKey}>Current Bid:</span>
                  {highestBidAmount} Credits
                </li>
              </ul>
              <form>
                <div className="m-mobMargin">
                  <GenericInput
                    onInputChange={bidValue}
                    label="Your Bid*"
                    validation="bid"
                    error="You have to enter a bid higher than the current one"
                    empty={emptyField === "bid" && !bidValid ? "bid" : ""}
                    type="number"
                  />
                </div>
                <ul className="flex-col font-sans text-[18px] text-myWhite">
                  <li>
                    {" "}
                    <span className={liKey}>Your Credits:</span>
                    {user.credits} Credits
                  </li>
                </ul>
                <div className="w-fit mx-auto my-mobMargin h-[53px]">
                  <IsLoggedIn
                    fallback={
                      <Link href="/login">
                        <Button content="SIGN IN TO BID" />
                      </Link>
                    }
                  >
                    <Button content="BID NOW" handler={handler} />
                  </IsLoggedIn>
                </div>
              </form>
              <div className="text-sunnyOrange font-button text-[20px] w-fit mx-auto">
                {bidError}
              </div>

              {isModal2Open && (
                <div className="fixed inset-0 h-full z-50  bg-midnightBlue bg-opacity-90">
                  <div
                    onClick={closeBid}
                    className=" absolute top-1 right-5 lex justify-center mt-mobMargin cursor-pointer h-[40px] text-myWhite"
                  >
                    <MdClose className="h-[34px] w-[34px] hover:w-[40px] hover:h-[40px] my-auto" />
                  </div>
                  <div className="w-full h-full relative">
                    <div className="flex-col justify-center align-middle w-full p-mobMargin mx-auto mt-40 text-myWhite">
                      <h1 className="font-serif text-center text-[27px]">
                        Thank you for your bid!
                      </h1>
                      {/* <p className="font-sans text-center pt-mobMargin">
                        <span className={liKey}>Your new credit balance:</span>
                        {user.credits} Credits
                      </p> */}
                      <p className="max-w-[300px] font-sans text-center mx-auto pt-2">
                        You can monitor the progress of this listing on your
                        profile under My Bids & Listings{" "}
                      </p>
                      <div className="w-fit mx-auto p-mobMargin flex">
                        <MdArrowBackIosNew className="h-[24px] w-[24px] my-auto" />

                        <Link href="/auction">
                          <p className="font-button hover:underline text-[20px] pl-[5px]">
                            Return to Auction
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <Accordion title="Seller">
          <div className="bg-midnightBlue w-full text-myWhite p-mobMargin">
            <img
              src={data.seller.avatar ? data.seller.avatar : defaultAvatar}
              alt="Profile Picture"
              className="rounded-full h-[250px] w-[250px] mx-auto border-4 border-sunnyOrange"
            ></img>
            <h1 className="font-button text-[20px] mx-auto w-fit my-mobMargin">
              {data.seller.name}
            </h1>
            <p className="font-sans w-fit mx-auto pb-mobMargin">
              {data.seller.email}
            </p>
            <p className="font-sans w-fit mx-auto">
              Posted Listings: {profile?._count?.listings} Items
            </p>
          </div>
        </Accordion>
        <Accordion title="Description">
          <div className="bg-midnightBlue w-full text-myWhite p-mobMargin">
            <p>{data.description}</p>
          </div>
        </Accordion>
        <Accordion title="Bidding History">
          <div className="bg-midnightBlue w-full text-myWhite p-mobMargin">
            <table className="table-auto w-full bg-midnightBlue text-myWhite">
              <thead>
                <tr className="font-sans text-[20px]">
                  <th className=" px-4 py-2">Bidder</th>
                  <th className=" px-4 py-2">Time of Bid</th>
                  <th className=" px-4 py-2">Bid</th>
                </tr>
              </thead>
              <tbody>
                {sortedBids.map((bidder, index) => (
                  <tr className=" w-full" key={index}>
                    <td className=" px-4 py-2 flex relative">
                      {" "}
                      {bidder.amount === highestBid && (
                        <FaCrown className="-left-2 top-[28%] my-auto text-sunnyOrange absolute " />
                      )}{" "}
                      {bidder.bidderName}{" "}
                    </td>
                    <td className="px-4 py-2">
                      {" "}
                      <DateNTime date={bidder.created} />
                    </td>
                    <td className=" px-4 py-2">{bidder.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Accordion>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const res = await fetch(
      `https://api.noroff.dev/api/v1/auction/listings/${id}?_bids=true&_seller=true`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data for auction listing with id ${id}`);
    }

    const data = await res.json();

    return {
      props: {
        data,
        id,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true,
    };
  }
}
