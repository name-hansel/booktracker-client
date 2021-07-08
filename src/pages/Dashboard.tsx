import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../context/user";
import { logout } from "../actions/user";

const Dashboard = () => {
  const { userState, userDispatch } = useContext(UserContext);

  return !userState.loading ? (
    <div>
      User dashboard
      <Link to="/change-password">Change password</Link>
      <button onClick={(e) => logout(userDispatch)}>Logout</button>
    </div>
  ) : (
    <></>
  );
};

export default Dashboard;
