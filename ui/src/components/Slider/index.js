import React from "react";
import Carousel from "react-material-ui-carousel";

import img1 from '../../images/1.jpg';
import img2 from '../../images/2.jpg';
import img3 from '../../images/3.jpg';
import img4 from '../../images/4.jpg';

import "./style.css";

const Slider = () => {
  const items = [img1, img2, img3, img4];
  return (
    <Carousel autoPlay={true} indicators={false} animation="slide" className="slide-container">
      {items.map(item => {
        return <img src={item} className="slide-image" alt="slider" key={item}/>;
      })}
    </Carousel>
  );
};

export default Slider;
