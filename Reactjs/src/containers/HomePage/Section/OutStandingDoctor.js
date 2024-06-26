import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDocotors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDocotors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  render() {
    let arrDocotors = this.state.arrDocotors;
    let { language } = this.props;
    console.log("check doctor: ", arrDocotors);
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
            <Link to="/doctors">
              <button className="btn-section">
                <FormattedMessage id="homepage.more-infor" />
              </button>
            </Link>
          </div>
          <div className="section-body">
            <Slider
              {...{
                ...this.props.settings,
                slidesToShow: 4,
                slidesToScroll: 4,
              }}
            >
              {arrDocotors &&
                arrDocotors.length > 0 &&
                arrDocotors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer.from(
                      item.image,
                      "base64"
                    ).toString("binary");
                  }
                  let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-doctor"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          />
                        </div>
                        <div className="position text-center">
                          <div>
                            <strong style={{ fontSize: "medium" }}>
                              {language === LANGUAGES.VI ? nameVi : nameEn}
                            </strong>
                          </div>
                          {/* <div>Thần kinh</div> */}
                          <div className="">
                            {item.Doctor_Infor.Specialty.name}
                          </div>
                          <div className="">{item.name}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
