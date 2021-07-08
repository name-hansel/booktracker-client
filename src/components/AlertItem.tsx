import React from "react";

import { Alert } from "../interfaces";

interface Props {
  alert: Alert;
}

const AlertItem = ({ alert }: Props) => {
  return (
    <div
      style={{
        backgroundColor:
          alert.type === "success"
            ? "green"
            : alert.type === "danger"
            ? "red"
            : "grey",
      }}
      id={alert.id}
    >
      {alert.text}
    </div>
  );
};

export default AlertItem;
