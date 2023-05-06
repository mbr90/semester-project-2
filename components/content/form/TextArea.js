import { useState } from "react";

export default function TextArea(props) {
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
              htmlFor={props.label}
            >
              {props.label}
            </label>
          )}

          {isInputFocused && (
            <label
              className="text-whyte bg-midnightBlue text-[14px] font-sans absolute -top-3 l-2 z-40 ml-[16px] px-[4px] cursor-pointer"
              htmlFor={props.label}
            >
              {props.label}
            </label>
          )}

          <textarea
            id={props.label}
            className="relative bg-midnightBlue border-sunnyOrange border-2 rounded-lg text-myWhite focus:outline-none cursor-pointer  p-[16px] w-full  "
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            rows={6}
            minLength="3"
            maxLength="240"
            type={props.type}
            {...props.extra}
          ></textarea>
        </div>
        <div className="flex w-full justify-between pr-[16px]">
          <p className="text-myWhite font-sans font-medium text-[14px] px-[16px] py-1 w-fit">
            *Required - Describe your item
          </p>
          <div className="w-fit">{inputValue.length}/240</div>
        </div>

        {props.empty === "email" && (
          <p className="text-sunnyOrange font-sans font-medium text-[14px] px-[16px] py-1">
            {
              'Please enter a valid email address in the format "example@stud.noroff.no."'
            }
          </p>
        )}
        {props.hasError && (
          <p className="text-sunnyOrange font-sans font-medium text-[14px] px-[16px] py-1">
            This field cannot be empty.
          </p>
        )}
      </div>
    </div>
  );
}
