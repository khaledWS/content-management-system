import React from "react";

import "./style.css";

const SingleStat = ({ image, text, number }) => {
  return (
    <div className="single-stat">
      <div className="image-container">
        <img src={image} alt="cash" />
      </div>
      <p className="single-stat-text">{text}</p>
      <p className="single-stat-number">{number}</p>
    </div>
  );
};

export default SingleStat;
