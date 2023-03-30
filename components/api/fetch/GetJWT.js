import { useState } from "react";
import { useRouter } from "next/router";

const GetJWT = (apiEndpoint) => {
  const [jwt, setJwt] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const signIn = async (email, password) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      const { token } = data;
      localStorage.setItem("token", token);
      setJwt(token);
      setIsLoggedIn(true);
      setError(null);
    } catch (error) {
      console.log(error);
      setJwt(null);
      setIsLoggedIn(false);
      setError(error.message);
    }
  };

  const redirectTo = (url) => {
    router.push(url);
  };

  return { jwt, error, isLoggedIn, signIn, redirectTo };
};

export default GetJWT;
