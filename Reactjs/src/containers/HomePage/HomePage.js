import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/medicalFacility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";

import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);

    // Add scroll event listener
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    // Remove scroll event listener when component unmounts
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const scrolled = window.scrollY > 100; // Change this value as needed
    const buttons = document.querySelectorAll(
      ".zalo-button, .facebook-button, .hotline-button"
    );

    buttons.forEach((button) => {
      if (scrolled) {
        button.classList.add("scrolled");
      } else {
        button.classList.remove("scrolled");
      }
    });
  };

  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      // slidesToShow: 4,
      // slidesToScroll: 1,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        <HandBook settings={settings} />
        <About settings={settings} />
        <HomeFooter />

        {/* Add Dialogflow Messenger */}
        <df-messenger
          intent="WELCOME"
          chat-title="BookingCare"
          agent-id="35a9454e-7af2-4630-a14e-aa68ba4cf9e3"
          language-code="vi"
        ></df-messenger>

        <div className="connect-button">
          <a href="https://zalo.me/your_zalo_id">
            <div className="zalo-button">
              <img />
            </div>
          </a>
          <a href="https://www.facebook.com/61557548927775">
            <div className="facebook-button">
              <img />
            </div>
          </a>

          {/* <a href="tel:your_hotline_number" >
                        <div className="hotline-button">
                            <img />
                        </div>
                    </a> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
