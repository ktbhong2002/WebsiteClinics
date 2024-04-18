import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllSpecialty } from "../../../services/userService";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import ReactPaginate from "react-paginate";
import "./specialtyHome.scss";
class specialtyHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/specialties/${item.id}`);
    }
  };

  render() {
    const { dataSpecialty } = this.state;

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
              <center>
                <FormattedMessage id="home_header.specialty" />
              </center>
            </span>
          </div>

          <div className="section-body-specialty">
            {dataSpecialty &&
              dataSpecialty.length > 0 &&
              dataSpecialty.map((item, index) => (
                <div
                  className="section-customize-specialty specialty-child"
                  key={index}
                  onClick={() => this.handleViewDetailSpecialty(item)}
                >
                  <div
                    className="bg-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="item-content">
                    <div className="specialty-name">{item.name}</div>
                    {/* <div className="sapo">{item.sapo}</div> */}
                    {/* Các thông tin khác nếu cần */}
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(specialtyHome);
