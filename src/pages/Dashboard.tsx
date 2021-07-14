import React from "react";
// import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import UserContext from "../context/user";
import Sidebar from "../components/Sidebar";
import Library from "./dashboard/Library";
import TrackBook from "./dashboard/TrackBook";
import Lists from "./dashboard/Lists";
import Review from "./dashboard/Review";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const { userState, userDispatch } = React.useContext(UserContext);

  return !userState.loading ? (
    <main className="dashboard-main">
      <Sidebar userDispatch={userDispatch} />
      <section className="main">
        <Switch>
          <Route exact path={["/user", "/user/library"]}>
            <Library />
          </Route>
          <Route exact path="/user/track-book">
            <TrackBook />
          </Route>
          <Route exact path="/user/lists">
            <Lists />
          </Route>
          <Route exact path="/user/review-book">
            <Review />
          </Route>
        </Switch>
      </section>
    </main>
  ) : (
    <Spinner />
  );
};

export default Dashboard;
