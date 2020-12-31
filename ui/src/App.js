import React from "react";
import axios from 'axios';

import Header from "./components/Header";
import Slider from "./components/Slider";
import Button from "./components/Button";
import News from "./components/News";
import Statistaces from "./components/Statistaces";
import StatisMony from "./components/StatisMony";
import Popup from './components/Popup';

import "./App.css";
class App extends React.Component {
  state = {
    width: 400,
    data : null,
    isOpen: false,
  };
  async componentDidMount () {
    const width = window.innerWidth;
    this.setState({ width });
    try{
      const response = await axios.get('https://admin-pinpoint.herokuapp.com/api/getStats')
      this.setState({ data : response.data})
    }
    catch (error) {
      console.log(error)
    }
    
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Slider sliderWidth={this.state.width} sliderHeight="250" />
        <div className="btn-container">
          <Button onClick={() => this.setState({ isOpen: true})} >التبرع المباشر</Button>
          {/* <Button>بوابة التبرعات</Button> */}
        </div>
        <News />
        <Statistaces data={this.state.data}/>
        <StatisMony data={this.state.data}/>
        {this.state.isOpen && <Popup closePopup={() => this.setState({ isOpen: false})} withAmount={true}/>}
      </div>
    );
  }
}

export default App;
