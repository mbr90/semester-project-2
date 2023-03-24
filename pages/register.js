import Head from "next/head";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";

export default function Register() {
  return (
    <>
      <Head>
        <title>Register Profile</title>
        <meta name="description" content="Sign up to Salechampz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-col min-h-screen">
        <h1 className="text-white text-6xl">This is where you register</h1>
      </main>
      <Footer />
    </>
  );
}
