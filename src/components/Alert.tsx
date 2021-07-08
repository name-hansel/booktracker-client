import React from "react";

import { Alert as AlertInterface } from "../interfaces";
import AlertItem from "./AlertItem";

interface Props {
  alerts: AlertInterface[];
}

const Alert = ({ alerts }: Props) => {
  return (
    <>
      {alerts && alerts.length > 0 ? (
        alerts.map((alert) => <AlertItem alert={alert} />)
      ) : (
        <></>
      )}
    </>
  );
};

export default Alert;
