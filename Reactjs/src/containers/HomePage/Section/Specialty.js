import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";

class Specialty extends Component {
  render() {
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên khoa</span>
            <button className="btn-section">XEM THÊM</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-sepcialty" />
                {/* kich thuoc anh 5,5 */}
                <h4>Cơ xương khớp</h4>
              </div>
              <div className="section-customize">
                <div className="bg-image section-sepcialty" />
                <h4>Thần kinh</h4>
              </div>
              <div className="section-customize">
                <div className="bg-image section-sepcialty" />
                <h4>Tiêu hóa</h4>
              </div>
              <div className="section-customize">
                <div className="bg-image section-sepcialty" />
                <h4>Tim mạch</h4>
              </div>
              <div className="section-customize">
                <div className="bg-image section-sepcialty" />
                <h4>Tai mũi họng</h4>
              </div>
              <div className="section-customize">
                <div className="bg-image section-sepcialty" />
                <h4>Cột sống</h4>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
