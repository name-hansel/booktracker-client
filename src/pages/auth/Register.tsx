import React, { useState, useContext } from "react";

import { registerValidation } from "../../utils";
import UserContext from "../../context/user";
import AlertContext from "../../context/alert";
import { register } from "../../actions/user";
import { setAlert } from "../../actions/alert";

const Register = () => {
  const { userDispatch } = useContext(UserContext);
  const { alertDispatch } = useContext(AlertContext);

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      register(alertDispatch, { username, email, password });
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="username">username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => onChange(e)}
      />
      <br />
      <label htmlFor="email">email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => onChange(e)}
      />
      <br />
      <label htmlFor="password">password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => onChange(e)}
      />
      <br />
      <label htmlFor="confirmPassword">confirm password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={(e) => onChange(e)}
      />
      <br />
      <button type="submit">register</button>
    </form>
  );
};

export default Register;
