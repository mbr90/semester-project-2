import Head from "next/head";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import RenderProfile from "@/components/content/RenderProfile";

export default function Profile() {
  return (
    <>
      <Head>
        <title>ProfileName</title>
        <meta name="description" content="Hello Profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-col min-h-screen">
        <h1 className="text-white text-6xl">Profiles appears here</h1>
        <RenderProfile />
      </main>
      <Footer />
    </>
  );
}
