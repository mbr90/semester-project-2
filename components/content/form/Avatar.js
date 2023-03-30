import { useState } from "react";

export default function Avatar(props) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    props.onInputChange(value);
  };

  return (
    <div className="flex-col mx-auto w-full px-mobMargin">
      <div className="w-full max-w-[500px] mx-auto">
        <div className="flex  relative ">
          {!isInputFocused && inputValue === "" && (
            <label
              className="text-whyte text-[18px] font-sans absolute top-3 z-40 pl-[16px] cursor-pointer"
              htmlFor="avatar"
            >
              Avatar URL
            </label>
          )}

          {isInputFocused && (
            <label
              className="text-whyte bg-midnightBlue text-[14px] font-sans absolute -top-3 l-2 z-40 ml-[16px] px-[4px] cursor-pointer"
              htmlFor="avatar"
            >
              Avatar URL
            </label>
          )}

          <input
            id="avatar"
            className="relative bg-midnightBlue border-sunnyOrange border-2 rounded-lg text-myWhite focus:outline-none cursor-pointer h-[51px] pl-[16px] w-full  "
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          ></input>
        </div>
        {props.empty === "avatar" && (
          <p className="text-sunnyOrange font-sans font-medium text-[14px] px-[16px] py-1">
            {`Avatar is optional, but needs to be a valid url for instance: "https://img.service.com/avatar.jpg"`}
          </p>
        )}
      </div>
    </div>
  );
}
