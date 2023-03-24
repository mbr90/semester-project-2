import Head from "next/head";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import AuctionMessage from "@/components/content/AuctionMessage";
import AuctionCard from "@/components/AuctionCard";

export default function Auction() {
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
        <AuctionCard />
      </main>
      <Footer />
    </>
  );
}
