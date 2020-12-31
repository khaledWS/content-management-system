import React from "react";
import Title from "../LinedTitle";

import cash from "../../images/cash.png";
import curriculum from "../../images/curriculum.png";

import "./style.css";
import SingleStat from "./SingleStat";

const StatisMony = ({data}) => {
  let revenues = '00,000,00';
  let expenses =  '00,000,00';
  return (
    <div className="statis-mony">
      <Title text="الإيرادات والمصروفات لعام 2020م" />
      <div className="StatisMony-cntainer">
        {data && data.length > 0 ? (
          <>
            <SingleStat image={cash} text="المصروفات" number={data[0].expenses} />
            <SingleStat image={curriculum} text="الإيرادات" number={data[0].revenues} />
          </>
        ) : (
          <>
            <SingleStat image={cash} text="المصروفات" number={expenses} />
            <SingleStat image={curriculum} text="الإيرادات" number={revenues} />
          </>
        )}
      </div>
    </div>
  );
};

export default StatisMony;
