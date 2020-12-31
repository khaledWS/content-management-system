import React from "react";

const Button = props => {
  return <button className="blue-btn" onClick={props.onClick}>{props.children}</button>;
};

export default Button;
