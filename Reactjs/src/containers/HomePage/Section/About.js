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
            <h5>
              BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện cung cấp
              nền tảng công nghệ giúp bệnh nhân dễ dàng lựa chọn đúng bác sĩ từ
              mạng lưới bác sĩ chuyên khoa giỏi, với thông tin đã xác thực và
              đặt lịch nhanh chóng. BookingCare là nền tảng kết nối mạng lưới
              bác sĩ giỏi ở nhiều bệnh viện, phòng khám khác nhau.
            </h5>
            <h5>
              BookingCare hoạt động liên tục 24 giờ một ngày, 7 ngày một tuần,
              và 365 ngày một năm, kể cả ngày nghỉ và ngày lễ để bạn có thể đặt
              lịch trực tuyến.Bạn có thể sử dụng dịch vụ đặt lịch khám của
              BookingCare bất cứ lúc nào nếu bạn có một tình trạng sức khỏe
              không khẩn cấp, có kế hoạch thăm khám chủ động. Hoặc đơn giản là
              muốn có một lựa chọn phù hợp, hiệu quả thay cho cho việc đến đăng
              ký khám trực tiếp và chờ đợi, xếp hàng tại các cơ sở y tế.
            </h5>
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
