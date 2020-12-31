import React from "react";

import "./style.css";

const ArrowBox = props => {
  return props.left ? (
    <div className="box box-left box-left-arrow-top-center">
      {props.children}
    </div>
  ) : (
    <div className="box box-right box-right-arrow-top-center">
      {props.children}
    </div>
  );
};

export default ArrowBox;
