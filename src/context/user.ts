import React from "react";

import { UserState, UserAction, UserContextProps } from "../interfaces";

export const userReducer = (
  state: UserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "LOAD_USER":
      console.log("LOAD_USER");
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: {
          _id: action.payload._id,
          username: action.payload.username,
        },
      };

    case "LOGIN_SUCCESS":
      console.log("LOGIN_SUCCESS");
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case "LOGIN_FAIL":
    case "LOGOUT":
    case "AUTH_ERROR":
      console.log("login fail/logout/auth errror");
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
  }
};

export const initialUserState: UserState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: {
    _id: "",
    username: "",
  },
};

const UserContext = React.createContext<UserContextProps>({
  userState: initialUserState,
  userDispatch: () => {},
});

export const UserContextProvider = UserContext.Provider;
export default UserContext;
