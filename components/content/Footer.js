import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";
import { BiCopyright } from "react-icons/bi";
import { GoMail } from "react-icons/go";

const socialMediaIcons = [
  {
    name: "Facebook",
    iconClass: <BsFacebook className="h-[30px] w-[30px]" />,
  },
  {
    name: "Instagram",
    iconClass: <BsInstagram className="h-[30px] w-[30px]" />,
  },
  {
    name: "Twitter",
    iconClass: <BsTwitter className="h-[30px] w-[30px]" />,
  },
  {
    name: "Github",
    iconClass: <BsGithub className="h-[30px] w-[30px]" />,
  },
];

export default function Footer() {
  return (
    <footer className="flex-col xl:flex xl:flex-row xl:justify-between bg-midnightBlue min-h-[20px] px-10 py-10 mt-mobMargin">
      <div className="text-myWhite flex gap-2  justify-center w-[220px] mx-auto">
        {socialMediaIcons.map((socialMediaIcon) => (
          <div key={socialMediaIcon.name} className=" mx-2">
            <a
              href={`https://www.${socialMediaIcon.name}.com`}
              aria-label={`Follow us on ${socialMediaIcon.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {socialMediaIcon.iconClass}
            </a>
          </div>
        ))}
      </div>
      <div className="text-myWhite flex my-5 justify-center gap-1 xl:order-last xl:my-0 max-w-[350px] mx-auto">
        <GoMail className="my-auto h-[30px] w-[30px]" />
        <p className="my-auto font-sans text-[18px]">contact@salechampz.com</p>
      </div>
      <div className="text-myWhite  flex gap-1 justify-center max-w-[220px] mx-auto ">
        <BiCopyright className=" my-auto h-[30px] w-[30px]" />
        <p className="my-auto font-sans text-[18px]"> Mats Brattland 2023</p>
      </div>
    </footer>
  );
}
