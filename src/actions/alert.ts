import { uuid } from "uuidv4";

import { Alert, AlertAction } from "../interfaces";

export const setAlert = (
  dispatch: React.Dispatch<AlertAction>,
  alert: {
    text: string;
    type: string;
  },
  timeout: number = 5000
) => {
  const id = uuid();

  dispatch({
    type: "SET_ALERT",
    payload: {
      id,
      text: alert.text,
      type: alert.text as Alert["type"],
    },
  });

  setTimeout(() => {
    dispatch({
      type: "REMOVE_ALERT",
      payload: id,
    });
  }, timeout);
};
