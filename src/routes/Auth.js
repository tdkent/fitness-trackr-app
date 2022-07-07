import { useState } from "react";
import { Link } from "react-router-dom";

import { DATABASE, userRegisterLoginRequest } from "../api";
import DatabaseMessage from "../components/DatabaseMessage";

const Auth = ({ setToken, setUserData, useModal, setUseModal }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dbMessage, setDbMessage] = useState("");
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
      setUseModal(true);
      setDbMessage(message);
    }
    if (token) {
      setToken(token);
      setUserData(user);
      window.localStorage.setItem("token", token);
    }
    setPassword("");
  };
  return (
    <main>
      {useModal && <DatabaseMessage dbMessage={dbMessage} setDbMessage={setDbMessage} setUseModal={setUseModal} />}
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
          value={password}
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
