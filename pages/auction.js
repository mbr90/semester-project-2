import Head from "next/head";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import AuctionMessage from "@/components/content/AuctionMessage";
import AuctionVardV2 from "@/components/AuctionCardV2";
// import DataFetch from "@/components/api/fetch/DataFetch";
// import LoadingSpinner from "@/components/tools/LoadingSpinner";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";

const AuctionURL = "https://api.noroff.dev/api/v1/auction/listings?";

const BidFlag = "&_bids=true";

const SellerFlag = "&_seller=true";

const ActiveFlag = "&_active=true";

const LimitFlag = "&limit=30";

const OffsetFlag = "&offset=";

const SortFlag = "&sort=";

const SortOrderFlag = "&sortOrder=";

export default function Auction() {
  const [offset, setOffset] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [data, setAuctionData] = useState([]);
  const [error, setError] = useState(null);
  const scrollToTopRef = useRef(null);

  function handleInputChange(searchValue, sortValue) {
    setSearchValue(searchValue);
    setSortValue(sortValue);
  }

  let sortQuery;
  switch (sortValue) {
    case "Sort By":
      sortQuery =
        BidFlag +
        SellerFlag +
        ActiveFlag +
        SortFlag +
        "endsAt" +
        SortOrderFlag +
        "asc" +
        LimitFlag;

      break;
    case "Newest":
      sortQuery =
        BidFlag +
        SellerFlag +
        ActiveFlag +
        SortFlag +
        "created" +
        SortOrderFlag +
        "desc" +
        LimitFlag;

      break;
    case "Oldest":
      sortQuery =
        BidFlag +
        SellerFlag +
        ActiveFlag +
        SortFlag +
        "created" +
        SortOrderFlag +
        "asc" +
        LimitFlag;

      break;
    case "High Bid":
      sortQuery = BidFlag + SellerFlag + ActiveFlag + LimitFlag;
      break;
    case "Low Bid":
      sortQuery = BidFlag + SellerFlag + ActiveFlag + LimitFlag;
      break;
    case "Title A-Z":
      sortQuery =
        BidFlag +
        SellerFlag +
        ActiveFlag +
        SortFlag +
        "title" +
        SortOrderFlag +
        "asc" +
        LimitFlag;

      break;
    case "Title Z-A":
      sortQuery =
        BidFlag +
        SellerFlag +
        ActiveFlag +
        SortFlag +
        "title" +
        SortOrderFlag +
        "desc" +
        LimitFlag;

      break;
    default:
      sortQuery =
        BidFlag +
        SellerFlag +
        ActiveFlag +
        SortFlag +
        "endsAt" +
        SortOrderFlag +
        "asc" +
        LimitFlag;
  }

  function handlePrevPage() {
    if (offset > 0) {
      setOffset(offset - 30);
    }
  }

  function handleNextPage() {
    setOffset(offset + 30);
    scrollToTopRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const fullAuctionURL = AuctionURL + sortQuery + OffsetFlag + offset;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(fullAuctionURL);
        const data = await res.json();

        setAuctionData(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [fullAuctionURL]);

  if (error) return <div>Error: {error.message}</div>;

  const sortedData = data
    .map((item) => {
      const bids = item?.bids || [];
      const highestBidAmount = bids?.reduce((accumulator, current) => {
        if (current.amount > accumulator) {
          accumulator = current.amount;
        }
        return accumulator;
      }, 0);

      return {
        ...item,
        highestBidAmount,
      };
    })
    .sort((a, b) => {
      if (sortValue === "High Bid") {
        return b.highestBidAmount - a.highestBidAmount;
      } else if (sortValue === "Low Bid") {
        return a.highestBidAmount - b.highestBidAmount;
      }
      return 0;
    });

  return (
    <>
      <Head>
        <title>Salechampz:Auction</title>
        <meta name="description" content="Browse our auction" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/icon.png" />
      </Head>
      <Header />
      <div ref={scrollToTopRef}>
        <AuctionMessage onInputChange={handleInputChange} />
      </div>

      <main className="min-h-screen w-full bg-[url('../public/texture/60-lines.png')] bg-plumWine flex-col py-10 text-white xl:px-[100px]">
        <div className="w-full max-w-[1920px] mx-auto">
          <div className="flex-col w-full xl:flex xl:flex-row flex-wrap justify-center gap-x-[86px]">
            {sortedData
              .filter((item) => {
                return (
                  searchValue === "" ||
                  item?.title
                    ?.toLowerCase()
                    ?.includes(searchValue.toLowerCase()) ||
                  item?.description
                    ?.toLowerCase()
                    ?.includes(searchValue.toLowerCase())
                );
              })
              .map((item) => {
                const bids = item?.bids || [];
                const highestBidAmount = bids?.reduce(
                  (accumulator, current) => {
                    if (current.amount > accumulator) {
                      accumulator = current.amount;
                    }
                    return accumulator;
                  },
                  0
                );

                return (
                  <AuctionVardV2
                    key={item.id}
                    item={item}
                    title={item.title}
                    description={item.description}
                    image={item.media}
                    bidders={item._count.bids}
                    bid={highestBidAmount}
                    ends={item.endsAt}
                    seller={item.seller.name}
                    id={item.id}
                  />
                );
              })}
          </div>
          <div className="max-w-[577px] xl:max-w-[1720px] w-full flex justify-between mx-auto h-[53px] px-mobMargin">
            {offset > 0 && (
              <Button content="Prev" handler={handlePrevPage}></Button>
            )}
            <div className="w-fit ml-auto mr-0">
              <Button content="Next" handler={handleNextPage}></Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
