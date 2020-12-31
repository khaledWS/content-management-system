import React from "react";

import "./style.css";

const Card = ({ item }) => {
  return (
    <div className="container">
      <div className="image-card">
        <img src={item.photo} className="image" alt="j1" />
      </div>
      <div className="contnet-container">
        <h3 style={{textAlign: "right"}}>
        {item.title}
        </h3>
        {/* <button className="details-btn"> تفاصيل </button> */}
      </div>
    </div>
  );
};

export default Card;
