import React from "react";
// import { Link } from "react-router-dom";

import UserContext from "../context/user";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const { userState, userDispatch } = React.useContext(UserContext);

  return !userState.loading ? (
    <>
      <main className="dashboard-main">
        <Sidebar userDispatch={userDispatch} />
      </main>
    </>
  ) : (
    <></>
  );
};

export default Dashboard;
