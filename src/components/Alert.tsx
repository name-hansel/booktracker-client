import React from "react";

import { Alert as AlertInterface } from "../interfaces";
import AlertContext from "../context/alert";

interface Props {
  alerts: AlertInterface[];
}

const Alert = ({ alerts }: Props) => {
  const { alertDispatch } = React.useContext(AlertContext);

  return (
    <div className="alerts">
      {alerts && alerts.length > 0 ? (
        alerts.map((alert) => (
          <div key={alert.id} className={`alert ${alert.type}`}>
            {alert.text}
            <button
              onClick={(e) =>
                alertDispatch({
                  type: "REMOVE_ALERT",
                  payload: alert.id,
                })
              }
            ></button>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Alert;
