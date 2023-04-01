import Head from "next/head";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import Return from "@/components/Return";
import Link from "next/link";

import Username from "@/components/tools/Username";

export default function BidsNListings() {
  return (
    <>
      <Head>
        <title>
          {Username()}
          {"'s Bids & Listings"}
        </title>
        <meta name="description" content="View your bid's and listings" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-col min-h-screen bg-plumWine">
        <Return />
        <div className="flex w-full p-mobMargin">
          <div className="flex my-mobMargin w-full ">
            <Link href={`/profiles/${Username()}`} className="flex">
              <h1 className="text-whyte  font-button text-[20px] px-[16px] py-2   ">
                My Account
              </h1>
            </Link>
            <h1 className="text-myWhite border-b-2 font-button text-[20px] px-[16px] py-2   ">
              My Bids & Listings
            </h1>
          </div>
        </div>
        Here be bids
      </main>
      <Footer />
    </>
  );
}
