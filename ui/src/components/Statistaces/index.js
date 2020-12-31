import React from "react";

import "./style.css";
import SingleStatistace from "./SingleStatistace";

import first from "../../images/shopping-bag.png";
import sec from "../../images/hiring.png";
import third from "../../images/chil-hand-on-the-hand-of-an-adult.png";
import four from "../../images/heart.png";

const defaultData = [
  { img: sec, number: "...", text: "مستفيد من التأهيل والتوظيف" },
  { img: third, number: "...", text: "ورشة مقدمة" },
];

const Statistaces = ({ data }) => {
  let responsedData = null;
  if(data && data.length >= 1){
    responsedData = [
      { img: sec, number: data[0].employees, text: "مستفيد من التأهيل والتوظيف" },
      { img: third, number: data[0].orphans, text: "ورشة مقدمة" },
    ];
  }
  return (
    <div className="statistaces-container">
      {!responsedData ? defaultData.map(item => (
        <SingleStatistace data={item} key={item.text}/>
      )) : responsedData.map(item => (
        <SingleStatistace data={item} key={item.text} />
      ))}
    </div>
  );
};

export default Statistaces;
