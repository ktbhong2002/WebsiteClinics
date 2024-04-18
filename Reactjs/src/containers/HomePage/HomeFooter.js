import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import logo from "../../assets/logo.svg";
import "./HomeFooter.scss";
import cn from "../../../src/assets/bo-cong-thuong.svg";
class About extends Component {
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
    return (
      <React.Fragment>
        <div className="footer-container">
          <div className="footer-content">
            <df-messenger
              intent="WELCOME"
              chat-title="BookingCare"
              // agent-id="35a9454e-7af2-4630-a14e-aa68ba4cf9e3"
              agent-id="0eab4d47-7d1e-4305-ac5c-6dd90964f5f9"
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
            <div className="colum1">
              <div className="logo">
                <img src={logo}></img>
              </div>
              <div className="title-cl1">
                <FormattedMessage id="homefooter.companyName" />
              </div>
              <div>
                {" "}
                <i class="fas fa-map-marker-alt"></i> 28 Thành Thái, Dịch Vọng,
                Cầu Giấy, Hà Nội
              </div>
              <div>
                <i class="fas fa-check"></i> ĐKKD số: 0106790291. Sở KHĐT Hà Nội
                cấp ngày 16/03/2015
              </div>
              <div>
                <img className="bct" src={cn}></img>
                <img className="bct" src={cn}></img>
              </div>
            </div>
            <div className="colum2">
              <div className="ul-li">
                <FormattedMessage id="homefooter.Recruit" />
              </div>
              <div className="ul-li">
                <FormattedMessage id="homefooter.Contact-for-cooperation" />
              </div>
              <div className="ul-li">
                <FormattedMessage id="homefooter.Frequently-asked-questions" />
              </div>
              <div className="ul-li">
                <FormattedMessage id="homefooter.terms-of-use" />
              </div>
              <div className="ul-li">
                <FormattedMessage id="homefooter.Privacy-Policy" />
              </div>
              <div className="ul-li">
                <FormattedMessage id="homefooter.Enterprise-digital-transformation-package" />
              </div>

              {/* <div className='ul-li'><FormattedMessage id="homefooter.Complaint-handling-support-process" /></div>
                            <div className='ul-li'><FormattedMessage id="homefooter.Operational-Regulations" /></div> */}
            </div>
            <div className="colum3">
              <div className="title-cl3">
                <FormattedMessage id="homefooter.Headquarters" />
              </div>
              <div className="descpt">
                28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
              </div>

              <div className="title-cl3">
                <FormattedMessage id="homefooter.Office" />
              </div>
              <div className="descpt">
                Số 01, Hồ Bá Kiện, Phường 15, Quận 10
              </div>

              <div className="title-cl3">
                <FormattedMessage id="homefooter.support" />
              </div>
              <div className="descpt">support@bookingcare.vn (7h30 - 18h)</div>
            </div>
          </div>
          <div className="download">
            <i class="fas fa-mobile-alt"></i>{" "}
            <FormattedMessage id="homefooter.download" />{" "}
            <span className="linkdown">Android</span>-{" "}
            <span className="linkdown">iPhone/iPad</span>-{" "}
            <span className="linkdown">
              <FormattedMessage id="homefooter.other" />
            </span>
          </div>
        </div>
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
