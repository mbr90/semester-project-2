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

// In Next.js, you can add a pause button to a background video by utilizing the ref attribute and the HTMLMediaElement API.

// First, you need to create a reference to the video element in your component using the useRef hook. Then, you can add an event listener to the pause button that calls the pause() method on the video element.

// Here's an example of how to add a pause button to a background video in Next.js:

// jsx
// Copy code
// import { useRef } from "react";

// export default function Home() {
//   const videoRef = useRef();

//   const handlePause = () => {
//     videoRef.current.pause();
//   };

//   return (
//     <div>
//       <button onClick={handlePause}>Pause Video</button>
//       <video ref={videoRef} autoPlay muted loop>
//         <source src="/video.mp4" type="video/mp4" />
//       </video>
//     </div>
//   );
// }
// In this example, the videoRef variable is used to create a reference to the video element using the useRef hook. The handlePause function is called when the user clicks on the pause button, which calls the pause() method on the video element.

// The video element itself is defined inside the return statement, with the ref attribute set to the videoRef variable. The autoPlay, muted, and loop attributes are used to automatically play the video, mute it, and loop it respectively.

// By using this approach, you can easily add a pause button to a background video in Next.js.
