import axios from "../utils";

import { AlertAction, UserAction } from "../interfaces";
import { setAuthToken, setNewAccessToken } from "../utils";
import { setAlert } from "./alert";

export const loadUser = async (dispatch: React.Dispatch<UserAction>) => {
  // If token is present in localStorage, set axios header
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token")!);
  }
  try {
    const res = await axios.get("/user");

    // New access token has been generated
    // Check for each private route
    if (res.data.accessToken) {
      setNewAccessToken(res.data.accessToken);
    }

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

export const logout = async (userDispatch: React.Dispatch<UserAction>) => {
  try {
    await axios.post("/auth/logout");
    userDispatch({
      type: "LOGOUT",
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const changePassword = async (
  alertDispatch: React.Dispatch<AlertAction>,
  formData: {
    oldPassword: string;
    password: string;
  }
) => {
  const { oldPassword, password } = formData;
  // Set headers and body
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ oldPassword, newPassword: password });
  try {
    const res = await axios.post("/user/change-password", body, config);
    setAlert(alertDispatch, {
      text: res.data.message,
      type: "success",
    });
  } catch (err) {
    console.error(err.message);
    setAlert(alertDispatch, {
      text: err.response.data.error,
      type: "danger",
    });
  }
};

export const forgotPassword = async (
  alertDispatch: React.Dispatch<AlertAction>,
  email: string
) => {
  // Set headers and body
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  try {
    const res = await axios.post("/auth/forgot-password", body, config);

    setAlert(
      alertDispatch,
      {
        text: res.data.message,
        type: "success",
      },
      10000
    );
  } catch (err) {
    console.error(err.message);
    setAlert(alertDispatch, {
      text: err.response.data.error,
      type: "danger",
    });
  }
};
