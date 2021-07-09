import React from "react";

import AlertContext from "../../context/alert";
import { setAlert } from "../../actions/alert";
import { forgotPassword } from "../../actions/user";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");

  const { alertDispatch } = React.useContext(AlertContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      email === "" ||
      !email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    )
      setAlert(alertDispatch, {
        text: "Invalid email",
        type: "danger",
      });
    else {
      forgotPassword(alertDispatch, email);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="email">Enter email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Send Link</button>
    </form>
  );
};

export default ForgotPassword;
