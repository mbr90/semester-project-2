export default function LoadingSpinner() {
  return (
    <div className="flex-col w-[200px] h-[200px] mx-auto justify-center align-middle my-mobMargin">
      <div className="w-24 h-24 border-t-4 border-sunnyOrange border-solid rounded-full animate-spin mx-auto"></div>
      <div className="w-fit mx-auto py-mobMargin">Please wait, loading</div>
    </div>
  );
}
