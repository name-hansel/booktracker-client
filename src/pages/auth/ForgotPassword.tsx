import React from "react";

const ForgotPassword = () => {
  return (
    <form action="">
      <label htmlFor="email">Enter email</label>
      <input type="email" name="email" id="email" />
      <button type="submit">Send Link</button>
    </form>
  );
};

export default ForgotPassword;
