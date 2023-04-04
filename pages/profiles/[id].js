import Head from "next/head";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import ProfileContent from "@/components/content/ProfileContent";
import Return from "@/components/Return";
import Link from "next/link";

import Username from "@/components/tools/Username";

import ClientOnly from "@/components/tools/ClientOnly";

import FormatDate from "@/components/tools/FormatDate";

export default function Profile() {
  return (
    <>
      <Head>
        <title>{Username()}</title>
        <meta name="description" content="View your profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/icon.png" />
      </Head>
      <Header />
      <Return />
      <main className="flex-col min-h-screen bg-plumWine xl:px-[100px]">
        <div className="flex w-full p-mobMargin">
          <div className="flex my-mobMargin w-full max-w-[1920px] mx-auto xl:px-[100px] ">
            <h1 className="text-myWhite border-b-2 font-button text-[20px] px-[16px] py-2   ">
              My Account
            </h1>
            <Link
              href={`/profiles/bids&listings/${Username()}`}
              className="flex"
            >
              <h1 className="text-whyte font-button text-[20px]  px-[16px] py-2 ">
                My Bids & Listings
              </h1>{" "}
            </Link>
          </div>
        </div>
        <ClientOnly>
          {" "}
          <ProfileContent />
        </ClientOnly>
      </main>
      <Footer />
    </>
  );
}
