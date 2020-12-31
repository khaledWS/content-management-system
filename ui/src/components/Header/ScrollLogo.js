import * as React from "react";
import Logo from '../../images/logo.jpg';

export default class ScrollTest extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", this.resizeHeaderOnScroll);
  }
  resizeHeaderOnScroll() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 200,
      headerEl = document.getElementById("imageLogo");

    if (distanceY > shrinkOn) {
      headerEl.classList.add("headerImage-small");
    } else {
      headerEl.classList.remove("headerImage-small");
    }
  }
  render() {
    return (
      <img
        src={Logo}
        id="imageLogo"
        className="headerImage"
        alt="Engineering Club"
        title="Engineering Club"
      />
    );
  }
}
