import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPassword(props) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (props.onInputChange) {
      props.onInputChange(event.target.value);
    }
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
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

          <input
            id={props.label}
            type={isPasswordVisible ? "text" : "password"}
            className="relative bg-midnightBlue border-sunnyOrange border-2 rounded-lg text-myWhite focus:outline-none cursor-pointer h-[51px] pl-[16px] w-full  "
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          ></input>
          <span
            className="absolute right-3 top-4 text-myWhite height-[30px] width-[30px] cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <p className="font-sans text-myWhite font-medium text-[14px] px-[16px] py-1">
          {props.help}
        </p>
        {props.empty === "password" && (
          <p className="text-sunnyOrange font-sans font-medium text-[14px] px-[16px] py-1">
            Password is required.
          </p>
        )}
      </div>
    </div>
  );
}
