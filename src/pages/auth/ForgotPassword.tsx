import React from "react";
import { Link } from "react-router-dom";

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
    <main className="forgot-password-main">
      <h1>Forgot Password</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Link</button>
      </form>
      <p>
        <Link to="/login">
          <span>Back to Login</span>
        </Link>
      </p>
    </main>
  );
};

export default ForgotPassword;
