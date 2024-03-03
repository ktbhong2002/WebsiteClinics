import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class medicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế</span>
            <button className="btn-section">XEM THÊM</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                {/* kich thuoc anh 5,5 */}
                <div className="text-center">Bệnh viện Hữu nghị Việt Đức</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div className="text-center">Bệnh viện Chợ Rẫy</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div className="text-center">
                  Phòng khám Bệnh viện Đại học Y Dược 1
                </div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div className="text-center">
                  Tầng 2 Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương
                  Quân đội 108
                </div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div className="text-center">Bệnh viện Ung bướu Hưng Việt</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <div className="text-center">Hệ thống y tế MEDLATEC</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(medicalFacility);
