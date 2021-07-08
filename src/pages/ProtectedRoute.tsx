import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import UserContext from "../context/user";

const ProtectedRoute = ({ ...routeProps }) => {
  const {
    userState: { isAuthenticated },
  } = useContext(UserContext);

  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: "/login" }} />;
  }
};

export default ProtectedRoute;
