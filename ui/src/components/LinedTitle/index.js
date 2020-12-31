import React from "react";

import "./style.css";

const LinedTitle = ({ text }) => {
  return (
    <div className="lined-title">
      <div>
        <span>&nbsp;</span>
      </div>
      <h3 className="lined-title-content">{text}</h3>
      <div>
        <span>&nbsp;</span>
      </div>
    </div>
  );
};

export default LinedTitle;
