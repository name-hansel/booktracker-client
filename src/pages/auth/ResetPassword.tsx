import React from "react";

const ResetPassword = () => {
  return (
    <form>
      <label htmlFor="password">Enter new password</label>
      <input type="password" name="password" id="password" />
      <label htmlFor="confirm-password">Enter password again</label>
      <input type="password" name="confirm-password" id="confirm-password" />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
