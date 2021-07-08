import React from "react";

import { Alert as AlertInterface } from "../interfaces";

interface Props {
  alerts: AlertInterface[];
}

const Alert = ({ alerts }: Props) => {
  return (
    <>
      {alerts && alerts.length > 0 ? (
        alerts.map((alert) => (
          <div
            key={alert.id}
            style={{
              backgroundColor:
                alert.type === "success"
                  ? "green"
                  : alert.type === "danger"
                  ? "red"
                  : "gray",
            }}
            id={alert.id}
          >
            {alert.text}
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default Alert;
