import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./historyBooking.scss";
import { getDetailInforDoctor } from "../../../services/userService";

class historyBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHistoryBooking: [], // Khởi tạo state dataHistoryBooking
      detailDoctors: [], // Khởi tạo state detailDoctors để lưu trữ thông tin chi tiết của các bác sĩ
    };
  }

  async componentDidMount() {
    const bookings = this.getBookingsFromLocal();
    this.setState({ dataHistoryBooking: bookings });

    try {
      const promises = bookings.map(async (booking) => {
        const res = await getDetailInforDoctor(booking.doctorId);
        if (res && res.errCode === 0) {
          return res.data;
        }
        return null;
      });

      const detailDoctors = await Promise.all(promises);
      this.setState({ detailDoctors });
    } catch (error) {
      console.log(error);
    }
  }

  getBookingsFromLocal = () => {
    return JSON.parse(localStorage.getItem("bookings")) || [];
  };

  render() {
    const { dataHistoryBooking, detailDoctors } = this.state;
    const dataBooking = dataHistoryBooking.reverse();
    return (
      <div>
        <HomeHeader />
        <div className="section-container">
          <div className="section-header" style={{ paddingTop: "25px" }}>
            <span className="title-section">
              <center>
                <h3>
                  <b>Lịch hẹn đã đặt</b>
                </h3>
              </center>
            </span>
          </div>
        </div>

        <div
          className="section-body-history-booking"
          style={{ paddingBottom: "45px" }}
        >
          {dataBooking.length > 0 ? (
            dataBooking.map((booking, index) => {
              const doctorDetail = detailDoctors.find(
                (doctor) => doctor.id === booking.doctorId
              );

              return (
                <div
                  key={index}
                  className="section-customize-history-booking history-booking-child"
                >
                  <div
                    className="bg-image"
                    style={{
                      backgroundImage: `url("https://cdn-icons-png.flaticon.com/512/8062/8062430.png")`,
                    }}
                  />
                  <div className="item-content">
                    <p>
                      <strong>Bệnh nhân: {booking.fullName}</strong>
                    </p>
                    <p>Lý do khám: {booking.reason}</p>
                    <p>
                      Nơi khám:{" "}
                      {doctorDetail ? doctorDetail.Doctor_Infor.nameClinic : ""}
                    </p>
                    <p>
                      Địa chỉ:{" "}
                      {doctorDetail
                        ? doctorDetail.Doctor_Infor.addressClinic
                        : ""}
                    </p>
                    <p>Thời gian khám: {booking.timeString}</p>
                    <p>
                      Bác sĩ:{" "}
                      <Link to={`/detail-doctor/${booking.doctorId}`}>
                        {booking.doctorName}
                      </Link>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className="no-booking-message"
              style={{ color: "rgb(169, 68, 66)", fontSize: "16px" }}
            >
              Bạn chưa đặt lịch hẹn trên trình duyệt này!
            </div>
          )}
        </div>

        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(historyBooking);
