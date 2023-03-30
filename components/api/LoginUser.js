import { LoginURL } from "../Variables";

export default async function LoginUser(email, password, router) {
  try {
    const body = { email, password };
    const response = await fetch(LoginURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data.accessToken) {
      console.log("JWT token and Username stored in local storage");
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("name", data.name);
      router.push("/auction");
    } else if (data.errors) {
      console.log("Error: ", data.errors[0].message);
    } else {
      console.log("Error: Invalid response from API");
    }
  } catch (error) {
    console.log(error);
  }
}
