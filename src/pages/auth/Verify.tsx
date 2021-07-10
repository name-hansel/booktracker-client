import React, { useContext, useState } from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
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

  React.useEffect(() => {
    const hash = match.params.hash;
    activateAccount(hash);
  }, []);

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
      /* setAlert(
        alertDispatch,
        {
          text: err.response.data.error,
          type: "danger",
        },
        10000
      ); */
    }
  };

  return (
    <main className="verify-main">
      {verify ? (
        <h1>Redirecting to login...</h1>
      ) : (
        <>
          <h1>Sorry, could not activate your account.</h1>
          <button>Resend Activation Link</button>
        </>
      )}
    </main>
  );
};

export default withRouter(Verify);
