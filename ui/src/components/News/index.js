import React from "react";
import CardsContainer from "../CardContainer";
import LinedTitle from "../LinedTitle";
import "./style.css";

const News = () => {
  return (
    <div className="news-section">
      {/* <div className="news-opinion">
        <LinedTitle text="استطلاع رأي" />
        <div className="opinion-section">
          <p>ما رأيك بموقع جمعية تمكين ؟</p>
          <div className="opinion-options">
            <div>
              <label htmlFor="exilant">
                مقبول
                <input type="radio" id="exilant" name="opinion" />
              </label>
            </div>
            <div>
              <label htmlFor="good">
                جيد
                <input type="radio" id="good" name="opinion" />
              </label>
            </div>
            <div>
              <label htmlFor="okay">
                ممتاز
                <input type="radio" id="okay" name="opinion" />
              </label>
            </div>
          </div>
          <div className="send-btn">
            <button>إرسال</button>
          </div>
        </div>
      </div> */}
      <div className="news-slider">
        <LinedTitle text="الأخبار" />
        <CardsContainer />
      </div>
    </div>
  );
};

export default News;
