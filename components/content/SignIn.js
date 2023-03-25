import Image from "next/image";
import logo from "../../public/logo/logo_white.png";
import LoginEmail from "../form/LoginEmail";
import LoginPassword from "../form/LoginPassword";
import Link from "next/link";
import Button from "../Button";

export default function SignIn() {
  return (
    <>
      <div className="w-full bg-midnightBlue flex-col h-full py-mobMargin">
        <Image
          className="w-[370px] h-auto my-auto mx-auto py-mobMargin"
          src={logo}
          alt="SaleChampz logo"
        />
        <h1 className="font-serif text-myWhite text-[27px] text-center py-mobMargin ">
          Sign In
        </h1>
        <form className="flex-col gap-4 ">
          <div className="py-4">
            <LoginEmail />
          </div>
          <div className="py-4">
            {" "}
            <LoginPassword />
          </div>
        </form>
        <div className="w-fit mx-auto py-mobMargin">
          <Button content="SIGN IN" />
        </div>
      </div>
      <div className="w-full bg-midnightBlue p-mobMargin ">
        <div className="flex w-fit mx-auto gap-2">
          <p className="text-whyte text-[14px] my-auto">New to SaleChampz?</p>
          <Link
            className="text-myWhite font-button font-bold text-[18px] my-auto hover:underline"
            href="/register"
          >
            Register Now
          </Link>
        </div>
      </div>
    </>
  );
}
