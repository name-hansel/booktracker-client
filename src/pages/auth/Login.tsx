import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";

import { loginValidation } from "../../utils";
import AlertContext from "../../context/alert";
import UserContext from "../../context/user";
import { setAlert } from "../../actions/alert";
import { login } from "../../actions/user";

const Login = () => {
  const { alertDispatch } = useContext(AlertContext);
  const { userState, userDispatch } = useContext(UserContext);

  const [formData, setFormData] = useState({
    finder: "",
    password: "",
  });

  const { finder, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = loginValidation(finder, password);
    if (valid)
      setAlert(alertDispatch, {
        text: valid,
        type: "danger",
      });
    else {
      login(alertDispatch, userDispatch, { finder, password });
    }
  };

  if (userState.isAuthenticated) {
    return <Redirect to="/user" />;
  }

  return !userState.loading ? (
    <>
      <main className="login-main">
        <h1>Login</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="finder">Enter username/email</label>
          <input
            type="text"
            name="finder"
            id="finder"
            placeholder="Username or Email"
            value={finder}
            onChange={(e) => onChange(e)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <br />
          <button type="submit">Login</button>
        </form>
        <p>
          New user?{" "}
          <Link to="/register">
            <span>Create an Account</span>
          </Link>
        </p>
        <p>
          <Link to="/forgot-password">
            <span>Forgot Password</span>
          </Link>
        </p>
      </main>
    </>
  ) : (
    <>Loading...</>
  );
};

export default Login;
