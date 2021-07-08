import React from "react";

const ChangePassword = () => {
  return (
    <form action="">
      <label htmlFor="old-password">Enter the current password</label>
      <input type="password" name="old-password" id="old-password" />
      <br />
      <label htmlFor="password">Enter the new password</label>
      <input type="password" name="password" id="password" />
      <br />
      <label htmlFor="confirm-password">Enter new password again</label>
      <input type="password" name="confirm-password" id="confirm-password" />
      <button type="submit">Change password</button>
    </form>
  );
};

export default ChangePassword;
