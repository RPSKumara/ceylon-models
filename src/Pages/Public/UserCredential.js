import React, { useState } from "react";
import SignIn from "../../Components/SignIn";
import SignUp from "../../Components/SignUp";
import ForgotPassword from "../../Components/ForgotPassword";

function UserCredential() {
  const [state, setState] = useState("SignIn");

  return (
    <div>
      {state === "SignIn" ? (
        <SignIn setState={setState} />
      ) : state === "SignUp" ? (
        <SignUp setState={setState} />
      ) : (
        <ForgotPassword setState={setState} />
      )}
    </div>
  );
}

export default UserCredential;
