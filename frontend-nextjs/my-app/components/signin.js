import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { Button } from "web3uikit";
const Signin = () => {
  const [value, setvalue] = useState("");
  let userdata;
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setvalue(data.user.displayName);
      localStorage.setItem("email", data.user.email);
    });
  };
  // useEffect(() => {
  //   setvalue(localStorage.getItem("email"));
  // });

  return (
    <div>
      {value ? (
        `${value} you are in..`
      ) : (
        <Button onClick={handleClick} text="SignIn" theme="primary" />
      )}
    </div>
  );
};

export default Signin;
