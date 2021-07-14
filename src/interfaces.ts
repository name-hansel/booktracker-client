// Action interfaces
// User
interface LOAD_USER {
  type: "LOAD_USER";
  payload: {
    _id: string;
    username: string;
  };
}

interface LOGIN_SUCCESS {
  type: "LOGIN_SUCCESS";
  payload: {
    token: string;
  };
}

interface LOGIN_FAIL {
  type: "LOGIN_FAIL";
}

interface LOGOUT {
  type: "LOGOUT";
}

interface AUTH_ERROR {
  type: "AUTH_ERROR";
}

export type UserAction =
  | LOAD_USER
  | LOGIN_SUCCESS
  | LOGIN_FAIL
  | LOGOUT
  | AUTH_ERROR;

export interface UserState {
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: {
    _id: string;
    username: string;
  };
}

export interface UserContextProps {
  userState: UserState;
  userDispatch: React.Dispatch<UserAction>;
}

// Alert
export interface Alert {
  id: string;
  text: string;
  type: "success" | "danger" | "";
}

interface SET_ALERT {
  type: "SET_ALERT";
  payload: Alert;
}

interface REMOVE_ALERT {
  type: "REMOVE_ALERT";
  payload: string; // It is the alert id
}

export type AlertAction = SET_ALERT | REMOVE_ALERT;

export interface AlertContextProps {
  alertState: Alert[];
  alertDispatch: React.Dispatch<AlertAction>;
}

// Book
export interface DropDownBook {
  id: string;
  title: string;
  authors: string[];
  date: string;
  imageURL: string;
}

// Library
interface GET_LIBRARY {
  type: "GET_LIBRARY";
  payload: {
    library: LibraryBook[];
  };
}

export interface LibraryBook {
  googleBooksId: string;
  title: string;
  authors: string[];
  dateAdded: string;
  imageURL: string;
}

export interface LibraryState {
  library: LibraryBook[];
  loading: boolean;
}

export type LibraryAction = GET_LIBRARY;

// State interface
export interface State {
  library: LibraryState;
}
