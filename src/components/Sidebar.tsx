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
        <Link to="/library" className="active">
          Library
        </Link>
        <Link to="/track-book">Track Book</Link>
        <Link to="/lists">Lists</Link>
        <Link to="/review-book">Review</Link>
      </div>
      <div className="bottom-links">
        <button className="active">
          <Link to="/profile">
            <i className="fa fa-user" aria-hidden="true"></i>
            Username
          </Link>
        </button>
        <button>
          <Link to="/settings">
            <i className="fa fa-cog" aria-hidden="true"></i>
            Settings
          </Link>
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
