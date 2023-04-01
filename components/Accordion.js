import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full py-mobMargin">
      <button
        className="w-full flex p-mobMargin  bg-midnightBlue relative drop-shadow-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-serif text-myWhite text-[27px] flex">
          {title}
          <div className="absolute w-fit my-auto right-4 top-1/3 ">
            {isOpen ? (
              <MdOutlineKeyboardArrowUp className="h-[44px] w-[44px] " />
            ) : (
              <MdOutlineKeyboardArrowDown className="h-[44px] w-[44px] " />
            )}
          </div>
        </h2>
      </button>
      <div
        className={`overflow-hidden transition-height duration-300 ${
          isOpen ? "h-auto" : "h-0"
        }`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
