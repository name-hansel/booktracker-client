import React from "react";

const ButtonSpinner = ({ width }: { width: string }) => {
  return <div className="button-loader" style={{ width, height: width }}></div>;
};

export default ButtonSpinner;
