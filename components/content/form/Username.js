import { useState } from "react";

export default function Username(props) {
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
              htmlFor="name"
            >
              Username*
            </label>
          )}

          {isInputFocused && (
            <label
              className="text-whyte bg-midnightBlue text-[14px] font-sans absolute -top-3 l-2 z-40 ml-[16px] px-[4px] cursor-pointer"
              htmlFor="name"
            >
              Username*
            </label>
          )}

          <input
            id="name"
            className="relative bg-midnightBlue border-sunnyOrange border-2 rounded-lg text-myWhite focus:outline-none cursor-pointer h-[51px] pl-[16px] w-full  "
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          ></input>
        </div>
        {props.empty === "name" && (
          <p className="text-sunnyOrange font-sans font-medium text-[14px] px-[16px] py-1">
            Please enter a username
          </p>
        )}
      </div>
    </div>
  );
}
