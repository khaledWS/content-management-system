import React from "react";

import HeaderLogo from "./ScrollLogo";
import ArrowBox from "../ArrowBox";
import HeaderNav from "./Nav";
import Popup from '../Popup';
import "./style.css";

class Header extends React.Component  {
  // const [isOpen, setIsOpen] = useState(false);
  state = {
    isOpen : false
  }
  render(){
    return (
      <header >
        <div className="topPart">
          <div className="headerBtns">
            <div className="header-Btn header-Btn-border header-Btn-margin-left">
              <button type="button" onClick={() => this.setState({ isOpen: true})}>تسجيل في النشرة البريدية</button>
            </div>
          </div>
          <HeaderLogo />
        </div>
        {this.state.isOpen && <Popup closePopup={() => this.setState({ isOpen: false})}/>}
      </header>
    );
  }

};

export default Header;
