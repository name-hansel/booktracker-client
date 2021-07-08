import React from "react";

import { Alert, AlertAction, AlertContextProps } from "../interfaces";

export const alertReducer = (state: Alert[], action: AlertAction): Alert[] => {
  switch (action.type) {
    case "SET_ALERT":
      console.log("SET_ALERT");
      return [...state, action.payload];
    case "REMOVE_ALERT":
      console.log("REMOVE_ALERT");
      return state.filter((alert) => alert.id !== action.payload);
  }
};

export const initialAlertState: Alert[] = [];

const AlertContext = React.createContext<AlertContextProps>({
  alertState: initialAlertState,
  alertDispatch: () => {},
});

export const AlertContextProvider = AlertContext.Provider;
export default AlertContext;
