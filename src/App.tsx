import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ChangePassword from "./pages/auth/ChangePassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Verify from "./pages/auth/Verify";
import ProtectedRoute from "./pages/ProtectedRoute";

import {
  UserContextProvider,
  userReducer,
  initialUserState,
} from "./context/user";
import {
  AlertContextProvider,
  alertReducer,
  initialAlertState,
} from "./context/alert";

import { setAuthToken } from "./utils";
import { loadUser } from "./actions/user";
import Alert from "./components/Alert";

function App() {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const userContextValues = {
    userState,
    userDispatch,
  };

  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    initialAlertState
  );
  const alertContextValues = {
    alertState,
    alertDispatch,
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    loadUser(userDispatch);
  }, []);

  return (
    <>
      <Router>
        <UserContextProvider value={userContextValues}>
          <AlertContextProvider value={alertContextValues}>
            <Alert alerts={alertState} />
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/reset-password/:hash" component={ResetPassword} />
              <Route path="/verify/:hash" component={Verify} />
              <Route exact path="/">
                <button>
                  <Link to="/register">Register</Link>
                </button>
                <button>
                  <Link to="/login">Login</Link>
                </button>
              </Route>
              <ProtectedRoute
                path="/change-password"
                component={ChangePassword}
              />
            </Switch>
          </AlertContextProvider>
        </UserContextProvider>
      </Router>
    </>
  );
}

export default App;
