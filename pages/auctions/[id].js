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
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
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
  const [showRows, setShowRows] = useState(false);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const defaultImage = "/images/defaultProduct.avif";
  const defaultAvatar = "/images/defaultProfile.jpg";
  let amount = parseInt(bid);

  const toggleRows = () => {
    setShowRows(!showRows);
  };

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

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

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

      {/* Mobile */}

      <main className="flex-col min-h-screen w-full">
        <div className="xl:hidden">
          <section className="w-full bg-plumWine py-mobMargin">
            <div className="max-w-[577px] bg-midnightBlue  mx-auto">
              <div className=" relative w-full h-[300px] overflow-hidden ">
                {!data?.media || data?.media?.length === 0 ? (
                  <img
                    src={defaultImage}
                    alt="Default Image"
                    className="slide object-cover h-96 w-full cursor-pointer"
                    onClick={() => setModalOpen(true)}
                    onError={handleImageError}
                  />
                ) : (
                  <img
                    src={data.media[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="slide object-cover h-96 w-full cursor-pointer"
                    onClick={() => setModalOpen(true)}
                    onError={handleImageError}
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
              <div className="p-mobMargin ">
                <h1 className="text-myWhite font-serif text-[27px] mb-8 ">
                  {data.title}
                </h1>

                <table className="text-myWhite font-sans text-[18px]  w-fit flex ">
                  <tbody>
                    <tr>
                      <td className="font-semibold pb-3">Listed date:</td>
                      <td className="pl-10 pb-3">
                        {new Intl.DateTimeFormat("nb-NO", options).format(
                          new Date(data.created)
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold pb-3">Updated:</td>
                      <td className="pl-10 pb-3">
                        {new Intl.DateTimeFormat("nb-NO", options).format(
                          new Date(data.updated)
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold pb-3">Ends:</td>
                      <td className="pl-10 pb-3">
                        <FormatDate date={data.endsAt} />
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold pb-3">Current Bid:</td>
                      <td className="pl-10 pb-3">{highestBidAmount} Credits</td>
                    </tr>
                    <IsLoggedIn>
                      <tr>
                        <td className="font-semibold text-sunnyOrange pb-3">
                          Your Credits:
                        </td>
                        <td className="pl-10 pb-3 font-semibold text-sunnyOrange">
                          {user.credits} Credits
                        </td>
                      </tr>
                    </IsLoggedIn>
                  </tbody>
                </table>

                <form>
                  <div className="my-mobMargin ">
                    <GenericInput
                      onInputChange={bidValue}
                      label="Your Bid* "
                      validation="bid"
                      error="You have to enter a bid higher than the current one"
                      empty={emptyField === "bid" && !bidValid ? "bid" : ""}
                      type="number"
                    />
                  </div>

                  <div className="w-fit mx-auto my-mobMargin h-[53px]">
                    <IsLoggedIn
                      fallback={
                        <Link tabIndex={-1} href="/login">
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

                        <p className="max-w-[300px] font-sans text-center mx-auto pt-2">
                          You can monitor the progress of this listing on your
                          profile under{" "}
                          <Link
                            className=" underline font-semibold cursor-pointer"
                            href="/profiles/bids&listings/[]"
                          >
                            {" "}
                            My Bids & Listings{" "}
                          </Link>{" "}
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
                className=" object-cover rounded-full h-[250px] w-[250px] mx-auto border-4 border-sunnyOrange"
                onError={handleImageError}
              ></img>
              <h1 className="font-button text-[20px] mx-auto w-fit mt-mobMargin mb-2">
                {data.seller.name}
              </h1>
              <p className="font-sans w-fit mx-auto pb-6">
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
              <table className="text-myWhite mx-auto w-full max-w-[400px] ">
                <tbody>
                  <tr className="font-sans text-[20px] font-bold">
                    <td className="pb-4">Bidder</td>
                    <td className="pb-4">Time of Bid</td>
                    <td className="pb-4">Bid</td>
                  </tr>
                  {sortedBids.map((bidder, index) => (
                    <tr key={index}>
                      <td className="py-2 relative">
                        {bidder.amount === highestBid && (
                          <FaCrown className="-left-5 top-[28%] my-auto text-sunnyOrange absolute " />
                        )}
                        {bidder.bidderName}
                      </td>
                      <td className="py-2 ">
                        <DateNTime date={bidder.created} />
                      </td>
                      <td className="py-2 "> {bidder.amount} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Accordion>
        </div>

        {/* Desktop  */}

        {isModalOpen && (
          <div className="fixed inset-0 h-full z-50  bg-midnightBlue bg-opacity-90">
            <div
              className="w-full h-full pb-mobMargin"
              style={{ overflowY: "auto" }}
            >
              <div className=" h-fit w-fit max-w-screen-lg   mx-auto mt-12">
                {!data?.media || data?.media?.length === 0 ? (
                  <img
                    src={defaultImage}
                    alt="Default Image"
                    className="slide object-cover "
                    onError={handleImageError}
                  />
                ) : (
                  <img
                    src={data.media[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="slide object-cover cursor-pointer"
                    onError={handleImageError}
                  />
                )}
              </div>
              <div className="flex justify-center mt-mobMargin">
                <Button content="CLOSE" handler={() => setModalOpen(false)} />
              </div>
            </div>
          </div>
        )}

        <div className="hidden xl:flex xl:flex-col">
          <section className="w-full bg-plumWine py-mobMargin flex">
            <div className="flex max-w-[1920px] gap-[86px] mx-auto my-12 ">
              <div className="ml-[100px] drop-shadow-button">
                <div className=" relative ">
                  {!data?.media || data?.media?.length === 0 ? (
                    <img
                      src={defaultImage}
                      alt="Default Image"
                      className="slide object-cover  w-[817px] h-[797px] cursor-pointer "
                      onClick={() => setModalOpen(true)}
                      onError={handleImageError}
                    />
                  ) : (
                    <img
                      src={data.media[currentSlide]}
                      alt={`Slide ${currentSlide + 1}`}
                      className="slide object-cover  w-[817px] h-[797px]  cursor-pointer"
                      onClick={() => setModalOpen(true)}
                      onError={handleImageError}
                    />
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
              </div>

              <div className="w-[817px] h-[797px] bg-midnightBlue mr-[100px] drop-shadow-button">
                <div className="max-w-[500px] mx-auto">
                  <h1 className="text-myWhite font-serif text-[38px] ml-[70px] mb-8 pt-[100px]">
                    {data.title}
                  </h1>
                  <table className="text-myWhite font-sans text-[18px] ml-[70px] w-fit flex ">
                    <tbody>
                      <tr>
                        <td className="font-semibold pb-3">Listed date:</td>
                        <td className="pl-10 pb-3">
                          {new Intl.DateTimeFormat("nb-NO", options).format(
                            new Date(data.created)
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold pb-3">Updated:</td>
                        <td className="pl-10 pb-3">
                          {new Intl.DateTimeFormat("nb-NO", options).format(
                            new Date(data.updated)
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold pb-3">Ends:</td>
                        <td className="pl-10 pb-3">
                          <FormatDate date={data.endsAt} />
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold pb-3">Current Bid:</td>
                        <td className="pl-10 pb-3">
                          {highestBidAmount} Credits
                        </td>
                      </tr>
                      <IsLoggedIn>
                        <tr>
                          <td className="font-semibold pb-3 text-sunnyOrange">
                            Your Credits:
                          </td>
                          <td className="pl-10 pb-3 font-semibold text-sunnyOrange">
                            {user.credits} Credits
                          </td>
                        </tr>
                      </IsLoggedIn>
                    </tbody>
                  </table>

                  <div className="flex px-[40px] mt-4 h-[150px] max-w-[600px]">
                    <div className=" py-4 w-[300px] ">
                      <GenericInput
                        onInputChange={bidValue}
                        label="Your Bid*"
                        validation="bid"
                        error="You have to enter a bid higher than the current one"
                        empty={emptyField === "bid" && !bidValid ? "bid" : ""}
                        type="number"
                      />
                      <div className="text-sunnyOrange font-button text-[20px] w-[300px] pl-[30px] mx-auto">
                        {bidError}
                      </div>
                    </div>

                    <div className=" py-4 mx-auto w-[70px]  h-[53px]">
                      <IsLoggedIn
                        fallback={
                          <Link tabIndex={-1} href="/login">
                            <Button content="SIGN IN" />
                          </Link>
                        }
                      >
                        <Button content="BID NOW" handler={handler} />
                      </IsLoggedIn>
                    </div>
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

                          <p className="max-w-[300px] font-sans text-center mx-auto pt-2">
                            You can monitor the progress of this listing on your
                            profile under{" "}
                            <Link
                              className=" underline font-semibold cursor-pointer"
                              href="/profiles/bids&listings/[]"
                            >
                              My Bids & Listings
                            </Link>
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
            </div>
          </section>

          <section className="w-full py-mobMargin">
            <div className="flex max-w-[1920px] gap-[86px] mx-auto my-12 px-[100px] ">
              <div className="bg-midnightBlue w-full text-myWhite p-mobMargin drop-shadow-button">
                <h1 className="ml-mobMargin mt-2 text-[27px] font-serif">
                  Seller:
                </h1>
                <img
                  src={data.seller.avatar ? data.seller.avatar : defaultAvatar}
                  alt="Profile Picture"
                  className=" object-cover rounded-full h-[250px] w-[250px] mx-auto border-4 border-sunnyOrange"
                  onError={handleImageError}
                ></img>
                <h1 className="font-button text-[20px] mx-auto w-fit mt-mobMargin mb-2">
                  {data.seller.name}
                </h1>
                <p className="font-sans w-fit mx-auto mb-6">
                  {data.seller.email}
                </p>
                <p className="font-sans w-fit mx-auto mb-2">
                  Posted Listings: {profile?._count?.listings} Items
                </p>
              </div>

              <div className="bg-midnightBlue w-full text-myWhite p-mobMargin drop-shadow-button">
                <h1 className=" ml-mobMargin mt-2 text-[27px] font-serif pb-mobMargin">
                  Description:
                </h1>
                <p className="ml-mobMargin">{data.description}</p>
              </div>
            </div>
          </section>

          <section className="w-full bg-plumWine py-mobMargin  ">
            <div className="flex max-w-[1920px] gap-[86px] mx-auto my-12 px-[100px] ">
              <div className="bg-midnightBlue w-full text-myWhite p-mobMargin drop-shadow-button">
                <h1 className="ml-mobMargin mt-2 text-[27px] font-serif pb-mobMargin">
                  Bidding History:
                </h1>
                <table className="text-myWhite mx-auto w-[800px] ">
                  <tbody>
                    <tr className="font-sans text-[20px] font-bold">
                      <td className="pb-4">Bidder</td>
                      <td className="pb-4">Time of Bid</td>
                      <td className="pb-4">Bid</td>
                    </tr>
                    {sortedBids.slice(0, 5).map((bidder, index) => (
                      <tr key={index}>
                        <td className="py-2 relative">
                          {bidder.amount === highestBid && (
                            <FaCrown className="-left-5 top-[28%] my-auto text-sunnyOrange absolute " />
                          )}
                          {bidder.bidderName}
                        </td>
                        <td className="py-2 ">
                          <DateNTime date={bidder.created} />
                        </td>
                        <td className="py-2 "> {bidder.amount} </td>
                      </tr>
                    ))}

                    {showRows &&
                      sortedBids.slice(5).map((bidder, index) => (
                        <tr key={index}>
                          <td className=" py-2 relative">
                            {bidder.amount === highestBid && (
                              <FaCrown className="-left-2 top-[28%] my-auto text-sunnyOrange absolute " />
                            )}
                            {bidder.bidderName}
                          </td>

                          <td className="py-2">
                            <DateNTime date={bidder.created} />
                          </td>
                          <td className="py-2"> {bidder.amount} </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {!showRows && sortedBids.length > 5 && (
                  <div className="w-full h-[60px] ">
                    <div
                      tabIndex={0}
                      className="cursor-pointer mx-auto w-fit"
                      onClick={toggleRows}
                      onKeyPress={toggleRows}
                    >
                      <MdOutlineKeyboardArrowDown className="h-[44px] w-[44px] hover:h-[50px] hover:w-[50px]" />
                    </div>
                  </div>
                )}

                {showRows && sortedBids.length > 5 && (
                  <div className="w-full h-[60px] ">
                    <div
                      tabIndex={0}
                      className="cursor-pointer mx-auto w-fit"
                      onClick={toggleRows}
                      onKeyPress={toggleRows}
                    >
                      <MdOutlineKeyboardArrowUp className="h-[44px] w-[44px] hover:h-[50px] hover:w-[50px]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
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
