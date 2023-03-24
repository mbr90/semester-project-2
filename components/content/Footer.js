import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";
import { BiCopyright } from "react-icons/bi";
import { GoMail } from "react-icons/go";

export default function Footer() {
  return (
    <footer className="flex-col xl:flex xl:flex-row xl:justify-between bg-midnightBlue min-h-[20px] px-10 py-10">
      <div className="text-myWhite flex gap-2  justify-center w-[220px] mx-auto">
        <BsFacebook />
        <BsInstagram />
        <BsTwitter />
        <BsGithub />
      </div>
      <div className="text-myWhite flex my-5 justify-center gap-1 xl:order-last xl:my-0 w-[220px] mx-auto">
        <GoMail className="my-auto" /> contact@salechampz.com
      </div>
      <div className="text-myWhite  flex gap-1 justify-center w-[220px] mx-auto ">
        <BiCopyright className="my-auto" />
        Mats Brattland 2023
      </div>
    </footer>
  );
}
