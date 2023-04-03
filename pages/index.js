import Head from "next/head";
import Header from "@/components/content/Header";
import Video from "@/components/content/Video";
import Footer from "@/components/content/Footer";
import HomeContent from "@/components/content/HomeContent";

export default function Home() {
  return (
    <>
      <Head>
        <title>Salechampz</title>
        <meta name="description" content="Making auctions great again" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/icon.png" />
      </Head>
      <Header />
      <main className="flex-col min-h-screen">
        <Video />

        <HomeContent />
      </main>
      <Footer />
    </>
  );
}
