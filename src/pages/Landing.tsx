import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <main className="landing-main">
        <p>
          Track your library. Review some books.
          <br />
          <span>Show the world.</span>
        </p>
        <div className="btn-div">
          <button>
            <Link to="/register">Register</Link>
          </button>
          <button>
            <Link to="/login">Login</Link>
          </button>
        </div>
      </main>
    </>
  );
};

export default Landing;
