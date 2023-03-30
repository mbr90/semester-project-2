const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
};

export default Logout;
