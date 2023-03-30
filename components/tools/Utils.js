export const getName = () => {
  const name = localStorage.getItem("name");
  return name ? name : null;
};
