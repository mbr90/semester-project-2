import Link from "next/link";
import { MdArrowBackIosNew } from "react-icons/md";

export default function Return() {
  return (
    <div className="w-full bg-burgundyVelvet  text-myWhite flex">
      <div className="w-full max-w-[1920px] mx-auto flex p-mobMargin xl:px-[100px]">
        <MdArrowBackIosNew className="h-[24px] w-[24px] my-auto" />
        <Link href="/auction">
          <p className="font-button hover:underline text-[20px] pl-[5px]">
            Return to Auction
          </p>
        </Link>
      </div>
    </div>
  );
}
