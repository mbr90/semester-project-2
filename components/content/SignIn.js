import Image from "next/image";
import logo from "../../public/logo/logo_white.png";
import LoginEmail from "./form/LoginEmail";
import LoginPassword from "./form/LoginPassword";
import Link from "next/link";
import Button from "../Button";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoginURL } from "../Variables";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyField, setEmptyField] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const router = useRouter();

  const emailValue = (value) => {
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  const passwordValue = (value) => {
    setPassword(value);
    setPasswordValid(validatePassword(value));
  };

  const signIn = async () => {
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
        setErrorMessage("Error: " + data.errors[0].message);
      } else {
        console.log("Error: Invalid response from API");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "An error occurred while trying to sign in. Please try again later."
      );
    }
  };

  const handler = (e) => {
    e.preventDefault();
    if (!emailValid || !passwordValid) {
      setEmptyField(emailValid ? "password" : "email");
      return;
    }
    signIn();
  };

  const validateEmail = (value) => {
    const emailRegex = /@noroff\.no$|@stud\.noroff\.no$/;
    const valid = value.trim() !== "" && emailRegex.test(value);
    setEmailValid(valid);
    return valid;
  };

  const validatePassword = (value) => {
    const valid = value.trim() !== "";
    setPasswordValid(valid);
    return valid;
  };

  return (
    <>
      <div className="w-full bg-midnightBlue flex-col h-full py-mobMargin">
        <Image
          className="w-[370px] h-auto my-auto mx-auto py-mobMargin"
          src={logo}
          alt="SaleChampz logo"
        />
        <h1 className="font-serif text-myWhite text-[27px] text-center py-mobMargin ">
          Sign In
        </h1>
        <form className="flex-col gap-4 ">
          <div className="py-4">
            <LoginEmail
              onInputChange={emailValue}
              empty={
                (emptyField === "email" || emptyField === "emailAndPassword") &&
                !emailValid
                  ? "email"
                  : ""
              }
            />
          </div>
          <div className="py-4">
            {" "}
            <LoginPassword
              label="Password*"
              onInputChange={passwordValue}
              empty={
                (emptyField === "password" ||
                  emptyField === "emailAndPassword") &&
                !passwordValid
                  ? "password"
                  : ""
              }
            />
            <div className="w-fit mx-auto py-mobMargin h-[53px] my-mobMargin">
              <Button content="SIGN IN" handler={handler} />
            </div>
          </div>
        </form>
        {errorMessage !== "" && (
          <div className="text-sunnyOrange mt-mobMargin  w-fit mx-auto ">
            {errorMessage}
          </div>
        )}
      </div>
      <div className="w-full bg-midnightBlue p-mobMargin mb-20">
        <div className="flex w-fit mx-auto gap-2">
          <p className="text-whyte text-[14px] my-auto">New to SaleChampz?</p>
          <Link
            className="text-myWhite font-button font-bold text-[18px] my-auto hover:underline"
            href="/register"
          >
            Register Now
          </Link>
        </div>
      </div>
    </>
  );
}
