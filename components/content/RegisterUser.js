import Image from "next/image";
import logo from "../../public/logo/logo_white.png";
import LoginEmail from "./form/LoginEmail";
import LoginPassword from "./form/LoginPassword";
import Username from "./form/Username";
import Avatar from "./form/Avatar";
import Link from "next/link";
import Button from "../Button";
import LoginUser from "../api/LoginUser";
import { useRouter } from "next/router";
import { useState } from "react";
// import { RegisterURL } from "../Variables";,

const RegisterURL = "https://api.noroff.dev/api/v1/auction/auth/register";

export default function RegisterUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [emptyField, setEmptyField] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [avatarValid, setAvatarValid] = useState(true);
  const router = useRouter();

  const nameValue = (value) => {
    setName(value);
    setNameValid(validateName(value));
  };

  const emailValue = (value) => {
    setEmail(value);
    setEmailValid(validateEmail(value));
  };

  const passwordValue = (value) => {
    setPassword(value);
    setPasswordValid(validatePassword(value));
  };

  const avatarValue = (value) => {
    setAvatar(value);
    setAvatarValid(validateAvatar(value));
  };

  const validateName = (value) => {
    const valid = value.trim() !== "";
    setNameValid(valid);
    return valid;
  };

  const validateEmail = (value) => {
    const emailRegex = /@noroff\.no$|@stud\.noroff\.no$/;
    const valid = value.trim() !== "" && emailRegex.test(value);
    setEmailValid(valid);
    return valid;
  };

  const validatePassword = (value) => {
    const valid = value.trim() !== "" && value.trim().length >= 8;
    setPasswordValid(valid);
    return valid;
  };

  //RegEx from ChatGPT

  const validateAvatar = (value) => {
    const valid =
      value.trim() === "" ||
      /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)(\?|$)/gi.test(value) ||
      /(http(s?):)([/|.|\w|\s|-])*(\?|$)/gi.test(value);
    setAvatarValid(valid);
    return valid;
  };

  const registerUser = async () => {
    try {
      const body = { name, email, password, avatar };

      const response = await fetch(RegisterURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      console.log(data);
      if (response.ok) {
        LoginUser(email, password, router);
      } else {
        setErrorMessage("Error: " + data.errors[0].message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while trying to sign in:" + error);
    }
  };

  const handler = (e) => {
    e.preventDefault();
    if (!nameValid || !emailValid || !passwordValid || !avatarValid) {
      setEmptyField(
        nameValid
          ? emailValid
            ? passwordValid
              ? "avatar"
              : "password"
            : "email"
          : "name"
      );
      return;
    }
    registerUser();
  };

  return (
    <div className="w-full xl:px-[100px]">
      <div className="w-full bg-midnightBlue flex-col h-full py-mobMargin max-w-[1720px] mx-auto">
        <Image
          className="w-[370px] h-auto my-auto mx-auto py-mobMargin"
          src={logo}
          alt="SaleChampz logo"
        />
        <h1 className="font-serif text-myWhite text-[27px] text-center py-mobMargin ">
          Register
        </h1>
        <form className="flex-col gap-4 ">
          <div className="py-4">
            <Username
              onInputChange={nameValue}
              empty={
                (emptyField === "name" || emptyField === "emailAndPasswordA") &&
                !nameValid
                  ? "name"
                  : ""
              }
            />
          </div>
          <div className="py-4">
            <LoginEmail
              onInputChange={emailValue}
              help='Email address needs to be in the format "example@stud.noroff.no."'
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
              help="Password needs to be at least 8 characters."
              empty={
                (emptyField === "password" ||
                  emptyField === "emailAndPassword") &&
                !passwordValid
                  ? "password"
                  : ""
              }
            />
          </div>
          <div className="py-4">
            {" "}
            <Avatar
              onInputChange={avatarValue}
              empty={
                (emptyField === "avatar" ||
                  emptyField === "emailAndPassword") &&
                !avatarValid
                  ? "avatar"
                  : ""
              }
            />
          </div>
          <div className="w-fit mx-auto py-mobMargin h-[53px] my-mobMargin">
            <Button content="REGISTER" handler={handler} />
          </div>
        </form>
        {errorMessage !== "" && (
          <div className="text-sunnyOrange mt-mobMargin pt-mobMargin px-mobMargin  w-fit mx-auto ">
            {errorMessage}
          </div>
        )}
      </div>
      <div className="w-full bg-midnightBlue p-mobMargin mb-20 max-w-[1720px] mx-auto">
        <div className="flex w-fit mx-auto gap-2">
          <p className="text-whyte text-[14px] my-auto">
            Already have an account?
          </p>
          <Link
            className="text-myWhite font-button font-bold text-[18px] my-auto hover:underline"
            href="/login"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
