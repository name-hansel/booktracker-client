import React from "react";
import { Link } from "react-router-dom";

const Landing = (): JSX.Element => {
  return (
    <>
      <main className="landing-main">
        <div className="landing-text">
          <p>
            Track your library. Review some books.
            <br />
            <span>Show the world.</span>
          </p>
          <div className="btn-div">
            <Link to="/register">
              <button>Register</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
        <img src="./illustration.svg" alt="" />
      </main>
    </>
  );
};

export default Landing;
