import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../context/user";
import { logout } from "../actions/user";

const Dashboard = () => {
  const { userState, userDispatch } = useContext(UserContext);

  return !userState.loading ? (
    <>
      <nav>
        <h1>Booktracker</h1>
        <div>
          <form>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for a book or a profile..."
            />
            <i className="fa fa-search" aria-hidden="true"></i>
          </form>
        </div>
      </nav>
      <div>
        User dashboard
        <Link to="/change-password">Change password</Link>
        <button onClick={(e) => logout(userDispatch)}>Logout</button>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Dashboard;
