export default function Greeting() {
  const getGreeting = () => {
    const currentTime = new Date().getHours();
    if (currentTime >= 4 && currentTime < 10) {
      return "Good Morning";
    } else if (currentTime >= 10 && currentTime < 16) {
      return "Good Day";
    } else if (currentTime >= 16 && currentTime < 22) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return <div>{getGreeting()}</div>;
}
