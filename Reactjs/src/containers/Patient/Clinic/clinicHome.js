import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllClinic } from "../../../services/userService";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./clinicHome.scss";
class clinicHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };

  render() {
    const { dataClinic } = this.state;

    return (
      <div
        className="section-share section-clinic"
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
              <center>Cơ sở y tế</center>
            </span>
          </div>

          <div className="section-body-clinic">
            {dataClinic &&
              dataClinic.length > 0 &&
              dataClinic.map((item, index) => (
                <div
                  className="section-customize-clinic clinic-child"
                  key={index}
                  onClick={() => this.handleViewDetailClinic(item)}
                >
                  <center>
                    <div
                      className="bg-image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="item-content">
                      <div className="clinic-name">{item.name}</div>
                    </div>
                  </center>
                </div>
              ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(clinicHome);
