// export default function Username() {
//   if (typeof window !== "undefined" && window.localStorage) {
//     return localStorage.getItem("name");
//   } else {
//     return null;
//   }
// }

export default function Username() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("name");
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}
