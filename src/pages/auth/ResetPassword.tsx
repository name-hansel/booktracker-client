import React from "react";
import { RouteComponentProps, withRouter, Redirect } from "react-router-dom";

import AlertContext from "../../context/alert";
import UserContext from "../../context/user";
import { setAlert } from "../../actions/alert";
import { changePasswordValidation } from "../../utils";
import { resetPassword } from "../../actions/user";
import ButtonSpinner from "../../components/ButtonSpinner";

interface Props {
  hash: string;
}

const ResetPassword: React.FC<RouteComponentProps<Props>> = ({
  match,
  history,
}) => {
  const { alertDispatch } = React.useContext(AlertContext);
  const { userState } = React.useContext(UserContext);

  const [spinner, setSpinner] = React.useState(false);
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpinner(true);
    const valid = changePasswordValidation(password);
    if (password !== confirmPassword)
      setAlert(alertDispatch, {
        text: "Passwords do not match",
        type: "danger",
      });
    else if (valid)
      setAlert(alertDispatch, {
        text: valid,
        type: "danger",
      });
    else {
      // Wait for sometime and then redirect
      const res = await resetPassword(
        alertDispatch,
        match.params.hash,
        password
      );
      setSpinner(false);

      if (res) {
        setFormData({
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      }
    }
  };
  if (userState.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <main className="reset-password-main">
      <h1>Reset Password</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="password">Enter new password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <label htmlFor="confirmPassword">Enter password again</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => onChange(e)}
        />
        <button type="submit">
          <div>Reset Password</div>
          {spinner && <ButtonSpinner width={"1rem"} />}
        </button>
      </form>
    </main>
  );
};

export default withRouter(ResetPassword);
