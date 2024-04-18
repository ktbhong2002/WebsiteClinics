import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllMedicalPackage } from "../../../services/userService";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./medicalPackage.scss";

class MedicalPackageHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMedicalPackage: [],
    };
  }

  async componentDidMount() {
    let res = await getAllMedicalPackage();
    if (res && res.errCode === 0) {
      this.setState({
        dataMedicalPackage: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailMedicalPackage = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-medical-package/${item.id}`);
    }
  };

  render() {
    const { dataMedicalPackage } = this.state;
    return (
      <div
        className="section-share section-medicalPackage"
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
                <FormattedMessage id="Gói khám" />
              </center>
            </span>
          </div>
          <div className="row">
            <div className="col-7"></div>
            <div className="search col-5">
              <input
                id="searchId"
                className="form-control mr-sm-1 search__input"
                type="search"
                placeholder=" 🔍  Nhập nội dung cần tìm kiếm..."
                // value={textSearch}
                // onChange={(e) => setTextSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="section-body-medicalPackage">
            {dataMedicalPackage &&
              dataMedicalPackage.length > 0 &&
              dataMedicalPackage.map((item, index) => (
                <div
                  className="section-customize-medicalPackage medicalPackage-child"
                  key={index}
                  onClick={() => this.handleViewDetailMedicalPackage(item)}
                >
                  <div className="medicalPackage-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="medicalPackage-info">
                    <div className="medicalPackage-name">{item.name}</div>
                    <div className="medicalPackage-clinic">{item.sapo}</div>
                    <div className="medicalPackage-clinic">
                      🏥 {item.clinicData.name}
                    </div>
                  </div>
                  <div className="col-12 row medicalPackage-content">
                    <div className="col-md-6">Giá: </div>
                    <div
                      className="col-md-6 medicalPackage-content medicalPackage-price"
                      style={{ textAlign: "right" }}
                    >
                      {item.price}
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalPackageHome);
