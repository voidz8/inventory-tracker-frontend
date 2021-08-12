import React, { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import TopMenu from "../components/TopMenu";
import IconInputfield from "../components/IconInputfield";
import userIcon from "../assets/user.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import "./SettingsPage.css";
import { authContext } from "../contexts/AuthContext";
import ErrorMessage from "../components/ErrorMessage";
import axios from "axios";

function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const { authState } = useContext(authContext);
  const [userName, setUserName] = useState(authState.user);
  const [email, setEmail] = useState(authState.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwConfirmed, setPwConfirmed] = useState(false);

  useEffect(() => {
    if (password !== confirmPassword && pwConfirmed) {
      setError("Password fields don't match!");
    } else {
      setError("");
    }
  }, [password, confirmPassword, pwConfirmed]);

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

  async function onFormSubmitEdit(data) {
    setLoading(true);
    setError("");
    try {
      const response = await axios.patch("http://localhost:8080/", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
    } catch (e) {
      setError(e.response.message);
    }
    setPwConfirmed(false);
    setLoading(false);
  }

  async function onFormSubmitConf(data) {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/check",
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setPwConfirmed(true);
      }
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  return (
    <div className={loading ? "loading-cursor" : ""}>
      <div className={"edit-page"}>
        <TopMenu />
        <header className={"title"}>Edit account</header>
        {error && <ErrorMessage message={error} />}
        {!pwConfirmed && (
          <form
            className={"edit-account-form-container"}
            onSubmit={handleSubmit(onFormSubmitConf)}
          >
            <h3 className={"white-h3"}>Login to edit your account.</h3>
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

            <button className={"login"} type={"submit"}>
              Login
            </button>
          </form>
        )}
        {pwConfirmed && (
          <form
            className={"edit-account-form-container"}
            onSubmit={handleSubmit(onFormSubmitEdit)}
          >
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
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
