import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import AlertContext from "../../context/alert";
import { setAlert } from "../../actions/alert";
import { changePasswordValidation } from "../../utils";
import { resetPassword } from "../../actions/user";

interface Props {
  hash: string;
}

const ResetPassword: React.FC<RouteComponentProps<Props>> = ({
  match,
  history,
}) => {
  const { alertDispatch } = React.useContext(AlertContext);
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
      if (res) {
        setFormData({
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          history.push("/login");
        }, 5000);
      }
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="password">Enter new password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => onChange(e)}
      />
      <label htmlFor="confirmPassword">Enter password again</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => onChange(e)}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default withRouter(ResetPassword);
