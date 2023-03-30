export default function Username() {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem("name");
  } else {
    return null;
  }
}
