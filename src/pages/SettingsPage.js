import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TopMenu from "../components/TopMenu";
import IconInputfield from "../components/IconInputfield";
import userIcon from "../assets/user.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import "./SettingsPage.css";
import { authContext } from "../contexts/AuthContext";
import ErrorMessage from "../components/ErrorMessage";

function SettingsPage() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const { authState, setAuthState } = useContext(authContext);
  const [userName, setUserName] = useState(authState.user);
  const [email, setEmail] = useState(authState.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (password !== confirmPassword) {
      setError("Password fields don't match!");
      console.log(password, confirmPassword);
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleChangeConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  function handleChangeUsername(e) {
    setUserName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onFormSubmit(data) {}

  return (
    <div>
      <TopMenu />
      {error && <ErrorMessage message={error} />}
      <form
        className={"edit-account-form-container"}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <header className={"edit-header"}>Edit account</header>
        <div>
          <h3 className={"input-label"}>Username:</h3>
          <IconInputfield
            type={"text"}
            value={userName}
            name={"username"}
            placeholder={"USERNAME"}
            maxlength={35}
            icon={userIcon}
            {...register("username")}
            onChange={(e) => handleChangeUsername(e)}
          />
        </div>
        <div>
          <h3 className={"input-label"}>Email</h3>
          <IconInputfield
            type={"email"}
            value={email}
            name={"email"}
            placeholder={"E-MAIL"}
            icon={emailIcon}
            {...register("email")}
            onChange={(e) => handleChangeEmail(e)}
          />
        </div>
        <div>
          <h3 className={"input-label"}>Password</h3>
          <IconInputfield
            type={"password"}
            name={"password"}
            placeholder={"PASSWORD"}
            icon={passwordIcon}
            {...register("password")}
            onChange={(e) => handleChangePassword(e)}
          />
        </div>
        <div>
          <h3 className={"input-label"}>Confirm password</h3>
          <IconInputfield
            type={"password"}
            name={"confirm-password"}
            placeholder={"CONFIRM PASSWORD"}
            icon={passwordIcon}
            {...register("password")}
            onChange={(e) => handleChangeConfirmPassword(e)}
          />
        </div>
        <button type={"submit"}>Save</button>
      </form>
    </div>
  );
}

export default SettingsPage;
