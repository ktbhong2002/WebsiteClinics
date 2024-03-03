import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về BookingCare
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="590px"
              height="332px"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <h4>
              On his deathbed, a father advised his son to always speak the
              truth. The son promised that he would never tell a lie. One day,
              while going to the city through a forest, he got surrounded by
              some robbers. One of them asked: “What do you have?”. The boy
              answered, “I have fifty rupees”. They searched for him but
              couldn’t find anything.
            </h4>
            <h4>
              When they were about to go, the boy called out: “I am not telling
              a lie. See this fifty rupee note which I had hidden in my shirt”.
              The leader of the robbers felt pleased at the truthfulness of the
              boy, and gave him hundred rupees as reward and went away.
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
