import React from "react";
import { NavLink } from "react-router-dom";

import { logout } from "../actions/user";
import { UserAction, UserState } from "../interfaces";

const Sidebar = ({
  userDispatch,
  userState,
}: {
  userDispatch: React.Dispatch<UserAction>;
  userState: UserState;
}) => {
  const [term, setTerm] = React.useState("");
  return (
    <section className="sidebar">
      <div className="library-search">
        <form>
          <input
            type="text"
            placeholder="Search your library..."
            className="library-search-input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          {!term ? (
            <i className="fa fa-search" aria-hidden="true"></i>
          ) : (
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={(e) => setTerm("")}
            ></i>
          )}
        </form>
      </div>
      <div className="links">
        <NavLink to="/user/library" activeClassName="active">
          Library
        </NavLink>
        <NavLink to="/user/track-book" activeClassName="active">
          Track Book
        </NavLink>
        <NavLink to="/user/lists" activeClassName="active">
          Lists
        </NavLink>
        <NavLink to="/user/review-book" activeClassName="active">
          Review
        </NavLink>
      </div>
      <div className="bottom-links">
        <button>
          <NavLink to="/user/profile" activeClassName="user-active">
            <i className="fa fa-user" aria-hidden="true"></i>
            {userState.user.username}
          </NavLink>
        </button>
        <button>
          <NavLink to="/user/settings" activeClassName="user-active">
            <i className="fa fa-cog" aria-hidden="true"></i>
            Settings
          </NavLink>
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
