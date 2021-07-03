import React, { useState } from "react";
import TopMenu from "../components/TopMenu";
import "./AuthPage.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";

function SignUpPage() {
  const [error, setError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:8080/";

  const history = useHistory();
  const { handleSubmit, register } = useForm();

  async function onSubmit(data) {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(url + "signup", {
        email: data.email,
        username: data.username,
        password: data.password,
      });

      setRegisterSuccess(true);

      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (e) {
      console.error(e);
      setError(`Registration failed. Try again (${e.message})`);
    }
    setLoading(false);
  }

  return (
    <div>
      <TopMenu />
      <div className={"page-container"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <header>Sign Up</header>
          <label htmlFor={"sign-up-username-field"}>Username</label>
          <input
            type={"text"}
            id={"sign-up-username-field"}
            name={"username"}
            {...register("username")}
          />

          <label htmlFor={"sign-up-email-field"}>Email</label>
          <input
            type={"email"}
            id={"sign-up-email-field"}
            name={"email"}
            {...register("email")}
          />

          <label htmlFor={"sign-up-password-field"}>Password</label>
          <input
            type={"password"}
            id={"sign-up-password-field"}
            name={"password"}
            {...register("password")}
          />
          <button disabled={loading} className={"auth"} type={"submit"}>
            Sign up
          </button>
          <p>
            If you already have an account <br />
            <a href={"http://localhost:3000/login"}>Login here</a>.
          </p>
        </form>
      </div>
      {registerSuccess && (
        <SuccessMessage message={"Successfully registerd!"} />
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default SignUpPage;
