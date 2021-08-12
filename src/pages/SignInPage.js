import React, { useContext, useState } from "react";
import TopMenu from "../components/TopMenu";
import "./AuthPage.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
import ErrorMessage from "../components/ErrorMessage";

function SignInPage() {
  const url = "http://localhost:8080/";
  const { login } = useContext(authContext);
  const history = useHistory();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register } = useForm();

  async function onSubmit(data) {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(url + "signin", {
        username: data.username,
        password: data.password,
      });
      login(response.data.token);
      history.push("/");
    } catch (e) {
      if (e.response.status === 401) {
        setError("Bad crendentials. Please try again");
      }
    }
    setLoading(false);
  }

  return (
    <div className={loading ? "loading-cursor" : ""}>
      <TopMenu />
      <div className={"page-container"}>
        <form className={"auth-form"} onSubmit={handleSubmit(onSubmit)}>
          <header>Login</header>
          <label htmlFor={"sign-up-username-field"}>Username</label>
          <input
            type={"text"}
            id={"sign-up-username-field"}
            name={"username"}
            {...register("username")}
          />
          <label htmlFor={"sign-up-password-field"}>Password</label>
          <input
            type={"password"}
            id={"sign-up-password-field"}
            name={"password"}
            {...register("password")}
          />
          <button className={"auth"} type={"submit"} disabled={loading}>
            Login
          </button>
          <p>
            If you don't have an account <br />
            <a href={"http://localhost:3000/sign-up"}>Sign up here</a>.
          </p>
        </form>
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default SignInPage;
