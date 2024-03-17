import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  showDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor } = this.state;
    let { language } = this.props;
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">ĐỊA CHỈ KHÁM</div>
          <div className="name-clinic">
            Phòng khám Chuyên khoa trị giãn tĩnh mạch An Viên - Bệnh viện Đa
            khoa An Việt
          </div>
          <div className="detail-address">
            Số 6, ngõ 1 Trường Chinh, Thanh Xuân, Hà Nội
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false && (
            <div className="short-infor">
              GIÁ KHÁM: 250.000đ{" "}
              <span onClick={() => this.showDetailInfor(true)}>
                Xem chi tiết
              </span>
            </div>
          )}
          {isShowDetailInfor === true && (
            <>
              <div className="title-price">GIÁ KHÁM: </div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">Giá khám </span>
                  <span className="right">200.000đ</span>
                </div>
                <div className="note">
                  Giá khám chưa bao gồm chi phí chụp chiếu xét nghiệm
                </div>
              </div>
              <div className="payment">
                Người bệnh có thể thanh toán bằng hình thức tiền mặt hoặc quẹt
                thẻ
              </div>
              <div className="hide-price">
                <span onClick={() => this.showDetailInfor(false)}>
                  Ẩn bảng giá
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
