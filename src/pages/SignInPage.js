import React from "react";
import TopMenu from "../components/TopMenu";
import "./AuthPage.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function SignInPage() {
  const url = "http://localhost:3000/";

  const history = useHistory();

  const { handleSubmit, register } = useForm();
  function onSubmit(data) {
    // try {
    //   const response = await axios.post(url + "signup")
    // }catch (e){
    //   console.error(e)
    // }
    console.log(data);
  }

  return (
    <div>
      <TopMenu />
      <div className={"page-container"}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
