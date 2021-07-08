import React from "react";

const Login = () => {
  return (
    <div>
      <form>
        <label htmlFor="finder">username or email</label>
        <input type="text" name="finder" id="finder" />
        <br />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button type="submit">Login</button>
      </form>
      <button>
        <a href="/forgot-password">Forgot password</a>
      </button>
    </div>
  );
};

export default Login;
