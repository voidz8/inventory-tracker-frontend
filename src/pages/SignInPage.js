import React, { useContext } from "react";
import TopMenu from "../components/TopMenu";
import "./AuthPage.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";

function SignInPage() {
  const url = "http://localhost:8080/";
  const { login } = useContext(authContext);
  const history = useHistory();

  const { handleSubmit, register } = useForm();

  async function onSubmit(data) {
    try {
      const response = await axios.post(url + "signin", {
        username: data.username,
        password: data.password,
      });
      login(response.data.token);
      history.push("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
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
          <button className={"auth"} type={"submit"}>
            Login
          </button>
          <p>
            If you don't have an account <br />
            <a href={"http://localhost:3000/sign-up"}>Sign up here</a>.
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
