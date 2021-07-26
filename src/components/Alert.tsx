import React from "react";

import { Alert as AlertInterface } from "../interfaces";

interface Props {
  alerts: AlertInterface[];
}

const Alert = ({ alerts }: Props) => {
  return (
    <div className="alerts">
      {alerts && alerts.length > 0 ? (
        alerts.map((alert) => (
          <div key={alert.id} className={`alert ${alert.type}`}>
            {alert.text}
            {/* Add button to remove alert */}
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Alert;
