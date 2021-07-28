import React from "react";
import { Redirect } from "react-router";

import AlertContext from "../../context/alert";
import UserContext from "../../context/user";
import { setAlert } from "../../actions/alert";
import { resendVerificationLink } from "../../actions/user";
import ButtonSpinner from "../../components/ButtonSpinner";

const ResendLink = () => {
  const [email, setEmail] = React.useState("");
  const [spinner, setSpinner] = React.useState(false);

  const { alertDispatch } = React.useContext(AlertContext);
  const { userState } = React.useContext(UserContext);

  const resendLink = async (e: React.FormEvent<HTMLFormElement>) => {
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
      if (resendVerificationLink(alertDispatch, email)) await setEmail("");
    }
    setSpinner(false);
  };

  if (userState.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <main className="resend-main">
      <h1>Resend Verification Link</h1>
      <form onSubmit={(e) => resendLink(e)}>
        <label htmlFor="email">Enter your email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">
          <div>Send Verification Link</div>
          {spinner && <ButtonSpinner width={"1rem"} />}
        </button>
      </form>
    </main>
  );
};

export default ResendLink;
