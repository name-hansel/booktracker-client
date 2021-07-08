import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const logout = () => {
    console.log("logout");
  };

  return (
    <div>
      User dashboard
      <Link to="/change-password">Change password</Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
