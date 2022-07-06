import { useState } from "react";
import { Link } from "react-router-dom";

import { DATABASE, userRegisterLoginRequest } from "../api";

const Auth = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dbMessage, setDbMessage] = useState("");
  const [isDbMessage, setIsDbMessage] = useState(false);
  const changeStatusHandler = (e) => {
    e.preventDefault();
    setIsLogin((prev) => !prev);
  };
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredUsername = username;
    const enteredPassword = password;
    let url;
    isLogin
      ? (url = `${DATABASE}/users/login`)
      : (url = `${DATABASE}/users/register`);
    const { token, message, user } = await userRegisterLoginRequest(
      url,
      enteredUsername,
      enteredPassword
    );
    console.log("Authentication request data: ", token, message, user);
    if (message) {
      setIsDbMessage(true);
      setDbMessage(message);
    }
    if (token) {
      setToken(token);
      window.localStorage.setItem("token", token);
    }
  };
  return (
    <main>
      {isDbMessage && <h1>{dbMessage}</h1>}
      <h2>{isLogin ? "Log In" : "Create Account"}</h2>
      <form onSubmit={formSubmitHandler}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          onChange={usernameChangeHandler}
          placeholder="Enter your username"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          onChange={passwordChangeHandler}
          placeholder="Enter your password"
          required
        />
        {isLogin ? (
          <>
            <button>Log In</button>
            <Link to="#">
              <p onClick={changeStatusHandler}>
                Dont' have an account? Click here to create one.
              </p>
            </Link>
          </>
        ) : (
          <>
            <button>Register</button>
            <Link to="#">
              <p onClick={changeStatusHandler}>
                Have an account? Click here to log in.
              </p>
            </Link>
          </>
        )}
      </form>
    </main>
  );
};

export default Auth;