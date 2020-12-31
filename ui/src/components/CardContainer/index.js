import React from "react";
import Card from "../Card";
import Carousel from "react-material-ui-carousel";
import axios from 'axios';
import './style.css';

class CardsContainer extends React.Component {
  state = {
    newsData : [],
  }

  async componentDidMount(){
    try{
      const response = await axios.get('https://admin-pinpoint.herokuapp.com/api/getNews')
      this.setState({ newsData : response.data})
      console.log(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }
  render (){
    let carditem = [];
    const { newsData } = this.state; 
    let items = [];
    if(newsData.length > 0){
      for (let i = 0; i < newsData.length; i = i + 3) {
        let first = newsData[i];
        let sec = newsData[i + 1];
        let third = newsData[i + 2];
        if (third) {
          carditem.push({ first, sec, third });
        } else if (sec) {
          carditem.push({ first, sec });
        } else {
          carditem.push({ first });
        }
      }
      carditem.forEach(item => {
        let cards = (
          <div style={{ display: "flex", justifyContent: "space-between"}} key={item}>
            {item.first && <Card item={item.first}/>}
            {item.sec && <Card item={item.sec}/>}
            {item.third && <Card item={item.third}/>}
          </div>
        );
        items.push(cards);
      });
    }
    return (
      <Carousel
       autoPlay={false}
       indicators={false}
       animation="slide"
       className="news-slider-cursal"
      >
        {items.map(Item => Item)}
      </Carousel>
    );
  };
}

export default CardsContainer;
