import React from "react";

import "./style.css";
const SingleStatistace = ({ data }) => {
  return (
    <div className="box-container">
      <div className="image-container">
        <img src={data.img} alt="statstics" />
      </div>
      <strong>{data.number}</strong>
      <strong>{data.text}</strong>
    </div>
  );
};

export default SingleStatistace;
