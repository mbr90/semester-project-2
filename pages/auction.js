import Head from "next/head";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import AuctionMessage from "@/components/content/AuctionMessage";
import AuctionVardV2 from "@/components/AuctionCardV2";
import DataFetch from "@/components/api/fetch/DataFetch";
// import {
//   AuctionURL,
//   SellerFlag,
//   BidFlag,
//   ActiveFlag,
// } from "@/components/Variables";

const AuctionURL = "https://api.noroff.dev/api/v1/auction/listings";

const BidFlag = "_bids=true";

const SellerFlag = "_seller=true";

const ActiveFlag = "_active=true";

const LimitFlag = "limit=";

const SortFlag = "sort=";

const SortOrderFlag = "sortOrder=";

const fullAuctionURL =
  AuctionURL +
  "?" +
  BidFlag +
  "&" +
  SellerFlag +
  "&" +
  ActiveFlag +
  "&limit=10&sort=endsAt&sortOrder=asc";

export default function Auction() {
  const { data, loading, error } = DataFetch(fullAuctionURL);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // console.log(data);
  return (
    <>
      <Head>
        <title>Salechampz:Auction</title>
        <meta name="description" content="Browser our auction" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <AuctionMessage />
      <main className="min-h-screen w-full bg-[url('../public/texture/60-lines.png')] bg-plumWine flex-col py-10 text-white">
        {/* <AuctionCard /> */}
        <div className="flex-col w-full">
          {data.map((item) => {
            const bids = item.bids;
            const highestBidAmount = bids.reduce((accumulator, current) => {
              if (current.amount > accumulator) {
                accumulator = current.amount;
              }
              return accumulator;
            }, 0);

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
              />
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
