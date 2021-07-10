import React from "react";
import { Link } from "react-router-dom";

import { logout } from "../actions/user";
import { UserAction } from "../interfaces";

const Sidebar = ({
  userDispatch,
}: {
  userDispatch: React.Dispatch<UserAction>;
}) => {
  return (
    <section className="sidebar">
      <div className="links">
        <a href="" className="active">
          {" "}
          Library{" "}
        </a>
        <a href="">Track Book</a>
        <a href="">Lists</a>
        <a href="">Reviews</a>
      </div>
      <div className="bottom-links">
        <button className="active">
          <a href="">
            <i className="fa fa-user" aria-hidden="true"></i>
            Username
          </a>
        </button>
        <button>
          <a href="">
            <i className="fa fa-cog" aria-hidden="true"></i>
            Settings
          </a>
        </button>
        <button onClick={(e) => logout(userDispatch)}>
          <span>
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </span>
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
