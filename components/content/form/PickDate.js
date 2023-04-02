import { useState } from "react";
export default function PickDate(props) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (props.onInputChange) {
      props.onInputChange(event.target.value);
    }
  };

  return (
    <div className="flex-col mx-auto w-full px-mobMargin">
      <div className="w-full max-w-[500px] mx-auto">
        <div className="flex  relative ">
          <label
            className="text-whyte bg-midnightBlue text-[14px] font-sans absolute -top-3 l-2 z-40 ml-[16px] px-[4px] cursor-pointer"
            htmlFor={props.label}
          >
            {props.label}
          </label>

          <input
            id={props.label}
            className="relative bg-midnightBlue border-sunnyOrange border-2 rounded-lg text-myWhite focus:outline-none cursor-pointer h-[51px] px-[16px] w-full  "
            value={inputValue}
            onChange={handleInputChange}
            type="datetime-local"
            {...props.extra}
          ></input>
        </div>
        <p className="text-myWhite font-sans font-medium text-[14px] px-[16px] py-1">
          *Required - When should the bidding end?
        </p>
        {props.empty === props.validation && (
          <p className="text-sunnyOrange font-sans font-medium text-[14px] px-[16px] py-1">
            {props.error}
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
