import React from "react";
import { Link, Redirect } from "react-router-dom";

import AlertContext from "../../context/alert";
import { setAlert } from "../../actions/alert";
import { forgotPassword } from "../../actions/user";
import UserContext from "../../context/user";
import ButtonSpinner from "../../components/ButtonSpinner";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const [spinner, setSpinner] = React.useState(false);

  const { alertDispatch } = React.useContext(AlertContext);
  const { userState } = React.useContext(UserContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpinner(true);
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
      await forgotPassword(alertDispatch, email);
      setEmail("");
    }
    setSpinner(false);
  };

  if (userState.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

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
        <button type="submit">
          <div>Send Link</div>
          {spinner && <ButtonSpinner width={"1rem"} />}
        </button>
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
