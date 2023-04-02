import Head from "next/head";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import Return from "@/components/Return";
import NewListing from "@/components/content/NewListing";

export default function Listing() {
  return (
    <>
      <Head>
        <title>New Listing</title>
        <meta name="description" content="This is where you sell your stuff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Return />
      <main className="flex-col min-h-screen bg-plumWine">
        <NewListing />
      </main>
      <Footer />
    </>
  );
}
