import React from "react";

import { changePasswordValidation } from "../../utils";
import AlertContext from "../../context/alert";
import { setAlert } from "../../actions/alert";
import { changePassword } from "../../actions/user";

const ChangePassword = () => {
  const { alertDispatch } = React.useContext(AlertContext);

  const [formData, setFormData] = React.useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const { oldPassword, password, confirmPassword } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = changePasswordValidation(password);
    if (password !== confirmPassword)
      setAlert(alertDispatch, {
        text: "Passwords do not match",
        type: "danger",
      });
    else if (valid) {
      setAlert(alertDispatch, {
        text: valid,
        type: "danger",
      });
    } else {
      changePassword(alertDispatch, { oldPassword, password });
      setFormData({ oldPassword: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="oldPassword">Enter the current password</label>
      <input
        type="password"
        name="oldPassword"
        id="oldPassword"
        value={oldPassword}
        onChange={(e) => onChange(e)}
      />
      <br />
      <label htmlFor="password">Enter the new password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => onChange(e)}
      />
      <br />
      <label htmlFor="confirmPassword">Enter new password again</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => onChange(e)}
      />
      <button type="submit">Change password</button>
    </form>
  );
};

export default ChangePassword;
