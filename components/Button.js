export default function Button(props) {
  const {
    content = "Click Me",
    textColor = "text-myBlack",
    bgColor = "bg-sunnyOrange",
    secColor = "bg-midnightBlue",
  } = props;
  return (
    <div className={`relative h-fit w-fit pr-[10px] group my-auto`}>
      <button
        className={`relative z-40 ${bgColor} rounded-lg h-[51px] px-[16px] text-xl ${textColor} font-button  font-semibold drop-shadow-button whitespace-nowrap group-hover:font-bold group-hover:h-[53px] group-hover:pr-[18px]`}
      >
        {content}
      </button>
      <div
        className={`${secColor} z-20 absolute top-0 left-0 rounded-lg text-xl font-button font-semibold  h-[51px] px-[16px] group-hover:ml-[12px] group-hover:mt-[10px] drop-shadow-button`}
      >
        <p className="invisible"> {content}</p>
      </div>
    </div>
  );
}
