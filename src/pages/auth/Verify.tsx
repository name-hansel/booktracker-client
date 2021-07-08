import React, { useContext, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import axios from "../../utils";

import AlertContext from "../../context/alert";
import { setAlert } from "../../actions/alert";

interface RouterProps {
  hash: string;
}

const Verify: React.FC<RouteComponentProps<RouterProps>> = ({
  match,
  history,
}) => {
  const [verify, setVerify] = useState(false);
  const { alertDispatch } = useContext(AlertContext);
  const activateAccount = async (hash: string) => {
    try {
      const res = await axios.get(`/auth/verify/${hash}`);
      setAlert(alertDispatch, {
        text: res.data.message,
        type: "success",
      });
      setVerify(true);
      setTimeout(() => {
        history.push("/login");
      }, 2500);
    } catch (err) {
      setAlert(
        alertDispatch,
        {
          text: err.response.data.error,
          type: "danger",
        },
        10000
      );
    }
  };

  useEffect(() => {
    const hash = match.params.hash;
    activateAccount(hash);
  }, []);

  return <div>{verify ? "Redirecting..." : ""}</div>;
};

export default withRouter(Verify);
