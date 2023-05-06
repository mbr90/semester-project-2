import Link from "next/link";
import Button from "../Button";
import IsLoggedIn from "../tools/IsLoggedIn";
import { useState, useRef } from "react";
import { MdPauseCircleOutline, MdPlayCircleOutline } from "react-icons/md";

export default function Video() {
  const [isPlaying, setPlaying] = useState(true);
  const videoRef = useRef();

  const handlePause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!isPlaying);
  };

  return (
    <div className="relative flex justify-center w-full min-h-[362px]">
      <div className=" absolute z-20 self-center">
        <h1 className="text-center text-myWhite font-serif text-[37px]">
          Buy and sell everyhing
        </h1>
        <h2 className="font-serif text-center text-myWhite text-[20px] mt-10 mb-16 ">
          Making auctions great again
        </h2>
        <IsLoggedIn
          fallback={
            <div className="text-center relative w-fit h-[51px] mx-auto ">
              <Link tabIndex={-1} href="/register">
                <Button
                  textColor="text-myWhite"
                  content="REGISTER NOW"
                  bgColor="bg-cherryRed"
                  secColor="bg-myBlack"
                />
              </Link>
            </div>
          }
        />
      </div>
      <div className="w-full relative">
        <video
          autoPlay
          muted
          className="relative w-full min-h-[362px] object-none xl:object-fill z-10 m-0 p-0"
          loop
          src={require("../../public/video/index.mp4")}
          ref={videoRef}
        />
        <div
          onClick={handlePause}
          onKeyPress={handlePause}
          tabIndex={0}
          className="text-myWhite absolute bottom-5 right-5 xl:right-10  z-20 cursor-pointer"
        >
          {isPlaying ? (
            <MdPauseCircleOutline className="w-10 h-10"></MdPauseCircleOutline>
          ) : (
            <MdPlayCircleOutline className="w-10 h-10"></MdPlayCircleOutline>
          )}
        </div>
      </div>
    </div>
  );
}
