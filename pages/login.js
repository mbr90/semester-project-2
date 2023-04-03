import Head from "next/head";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import Return from "@/components/Return";
import SignIn from "@/components/content/SignIn";

export default function Login() {
  return (
    <>
      <Head>
        <title>Log in</title>
        <meta name="description" content="Log in to Salechampz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/icon.png" />
      </Head>
      <Header />
      <main className="flex-col min-h-screen">
        <Return />
        <SignIn />
      </main>
      <Footer />
    </>
  );
}
