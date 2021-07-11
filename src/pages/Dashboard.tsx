import React from "react";
// import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UserContext from "../context/user";
import Sidebar from "../components/Sidebar";
import Library from "./dashboard/Library";
import TrackBook from "./dashboard/TrackBook";
import Lists from "./dashboard/Lists";
import Review from "./dashboard/Review";

const Dashboard = () => {
  const { userState, userDispatch } = React.useContext(UserContext);

  return !userState.loading ? (
    <main className="dashboard-main">
      <Sidebar userDispatch={userDispatch} />
      <section className="main">
        <Switch>
          <Route exact path={["/user", "/user/library"]} children={Library} />
          <Route exact path="/user/track-book" children={TrackBook} />
          <Route exact path="/user/lists" children={Lists} />
          <Route exact path="/user/review-book" children={Review} />
        </Switch>
      </section>
    </main>
  ) : (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default Dashboard;
