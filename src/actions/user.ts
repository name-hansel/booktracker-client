import axios from "../utils";

import { AlertAction, UserAction } from "../interfaces";
import { setAuthToken } from "../utils";
import { setAlert } from "./alert";

export const loadUser = async (dispatch: React.Dispatch<UserAction>) => {
  // If token is present in localStorage, set axios header
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token")!);
  }
  try {
    const res = await axios.get("/user");

    dispatch({
      type: "LOAD_USER",
      payload: res.data,
    });
  } catch (err) {
    // Dispatch auth_error
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

export const register = async (
  alertDispatch: React.Dispatch<AlertAction>,
  formData: {
    username: string;
    email: string;
    password: string;
  }
) => {
  const { username, email, password } = formData;
  // Set headers and body
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post("/auth/register", body, config);
    setAlert(alertDispatch, {
      text: res.data.message,
      type: "success",
    });
  } catch (err) {
    setAlert(alertDispatch, {
      text: err.response.data.error,
      type: "danger",
    });
  }
};

export const login = async (
  alertDispatch: React.Dispatch<AlertAction>,
  userDispatch: React.Dispatch<UserAction>,
  formData: {
    finder: string;
    password: string;
  }
) => {
  const { finder, password } = formData;
  // Set headers and body
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data: {
    username?: string;
    email?: string;
    password: string;
  } = {
    password,
  };

  // Set email or username
  if (finder.includes("@")) data.email = finder;
  else data.username = finder;

  const body = JSON.stringify(data);

  try {
    const res = await axios.post("/auth/login", body, config);
    // Set token
    userDispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        token: res.data.token,
      },
    });

    loadUser(userDispatch);
  } catch (err) {
    setAlert(alertDispatch, {
      text: err.response.data.error,
      type: "danger",
    });

    userDispatch({
      type: "LOGIN_FAIL",
    });
  }
};
