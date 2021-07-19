import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import { registerValidation } from "../../utils";
import AlertContext from "../../context/alert";
import UserContext from "../../context/user";
import { register } from "../../actions/user";
import { setAlert } from "../../actions/alert";

const Register = () => {
  const { alertDispatch } = useContext(AlertContext);
  const { userState } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = registerValidation(username, email, password);
    if (password !== formData.confirmPassword)
      setAlert(alertDispatch, {
        text: "Passwords do not match",
        type: "danger",
      });
    else if (valid)
      // Pattern validation
      setAlert(alertDispatch, {
        text: valid,
        type: "danger",
      });
    else {
      const res = await register(alertDispatch, { username, email, password });

      if (res)
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
    }
  };

  if (userState.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <main className="register-main">
      <h1>Register</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => onChange(e)}
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          value={email}
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
        <label htmlFor="confirmPassword">Confirm Your Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => onChange(e)}
        />
        <br />
        <button type="submit">Create Account</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login">
          <span>Login</span>
        </Link>
      </p>
      <p>
        <Link to="/resend-verification-link">
          <span>Resend Verification Link</span>
        </Link>
      </p>
    </main>
  );
};

export default Register;
