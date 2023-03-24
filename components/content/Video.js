import Link from "next/link";
import Button from "../Button";

export default function Video() {
  return (
    <div className="relative flex justify-center w-full min-h-[362px]">
      <div className=" absolute z-20 self-center">
        <h1 className="text-center text-myWhite font-serif text-[37px]">
          Buy and sell everyhing
        </h1>
        <h2 className="font-serif text-center text-myWhite text-[20px] mt-10 mb-16 ">
          Making auctions great again
        </h2>
        <div className="text-center relative w-fit h-[51px] mx-auto ">
          <Link href="/register">
            <Button
              textColor="text-myWhite"
              content="REGISTER NOW"
              bgColor="bg-cherryRed"
              secColor="bg-myBlack"
            />
          </Link>
        </div>
      </div>
      <video
        autoPlay
        muted
        className="relative w-full min-h-[362px] object-none xl:object-fill z-10 m-0 p-0"
        loop
        src={require("../../public/video/index.mp4")}
      />
    </div>
  );
}
