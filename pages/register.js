import Head from "next/head";
import Header from "@/components/content/Header";
import Footer from "@/components/content/Footer";
import RegisterUser from "@/components/content/RegisterUser";
import Return from "@/components/Return";

export default function Register() {
  return (
    <>
      <Head>
        <title>Register Profile</title>
        <meta name="description" content="Sign up to Salechampz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/icon.png" />
      </Head>
      <Header />
      <main className="flex-col min-h-screen">
        <Return />
        <RegisterUser />
      </main>
      <Footer />
    </>
  );
}
