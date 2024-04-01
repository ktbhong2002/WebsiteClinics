import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
//import { getAllDoctor } from "../../../services/userService";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./doctorHome.scss";
import { getAllDoctors } from "../../../services/userService";
class doctorHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDoctor: [],
    };
  }

  async componentDidMount() {
    let res = await getAllDoctors();
    if (res && res.errCode === 0) {
      this.setState({
        dataDoctor: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailDoctor = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${item.id}`);
    }
  };

  render() {
    const { dataDoctor } = this.state;

    return (
      <div
        className="section-share section-doctor"
        style={{
          backgroundImage:
            "url('https://www.tailwindcss.cn/_next/static/media/docs@tinypng.d9e4dcdc.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <HomeHeader />
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <center>Danh sách bác sĩ</center>
            </span>
          </div>

          <div className="section-body-doctor">
            {dataDoctor &&
              dataDoctor.length > 0 &&
              dataDoctor.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer.from(item.image, "base64").toString(
                    "binary"
                  );
                }
                return (
                  <div
                    className="section-customize-doctor doctor-child"
                    key={index}
                    onClick={() => this.handleViewDetailDoctor(item)}
                  >
                    <center>
                      <div
                        className="bg-image"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                    </center>
                    <div className="item-content">
                      <div className="doctor-name">
                        {item.positionData.valueVi} {item.lastName}{" "}
                        {item.firstName}
                      </div>
                      <div className="doctor-infor">
                        Số điện thoại : {item.phoneNumber}, Email : {item.email}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(doctorHome);
