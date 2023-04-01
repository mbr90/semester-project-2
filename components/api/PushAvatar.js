import Avatar from "../content/form/Avatar";
import { useState } from "react";
import Username from "../tools/Username";

export default function PushAvatar() {
  const token = localStorage.getItem("token");
  const avatarUrl =
    "https://api.noroff.dev/api/v1/auction/profiles/" + Username() + "/media";

  const [avatar, setAvatar] = useState("");

  const [avatarValid, setAvatarValid] = useState(true);

  const avatarValue = (value) => {
    setAvatar(value);
    setAvatarValid(validateAvatar(value));
  };

  const validateAvatar = (value) => {
    const valid =
      value.trim() === "" ||
      /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)(\?|$)/gi.test(value) ||
      /(http(s?):)([/|.|\w|\s|-])*(\?|$)/gi.test(value);
    setAvatarValid(valid);
    return valid;
  };

  const putAvatar = async (avatarUrl) => {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update avatar: ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  return (
    <>
      <Avatar
        onInputChange={avatarValue}
        empty={emptyField === "avatar" && !avatarValid ? "avatar" : ""}
      />
    </>
  );
}
