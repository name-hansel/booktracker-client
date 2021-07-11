import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import UserContext from "../context/user";

interface PrivateRouteProps extends RouteProps {
  component: any;
}
const ProtectedRoute = ({
  component: Component,
  ...rest
}: PrivateRouteProps) => {
  const {
    userState: { isAuthenticated, loading },
  } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default ProtectedRoute;
