import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { search } from "../../services/userService";

class HomeHeader extends Component {
  state = {
    textSearch: "",
    resultSearch: [],
  };
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  handleStartSearch = async () => {
    let res = await search(this.state.textSearch);
    if (res && res.errCode === 0) {
      let doctors = res.result.doctors;
      let clinics = res.result.clinics;
      let specialties = res.result.specialty;
      let result = [];
      result = doctors.map((item) => ({
        id: item.id,
        type: 1,
        valueDisplay:
          this.props.language === LANGUAGES.VI
            ? `Bác sĩ, ${item.lastName} ${item.firstName}`
            : `Doctor, ${item.firstName} ${item.lastName}`,
      }));
      result = [
        ...result,
        ...clinics.map((item) => ({
          id: item.id,
          type: 0,
          valueDisplay:
            this.props.language === LANGUAGES.VI
              ? `Cơ sở, ${item.name}`
              : `Clinic, ${item.name}`,
        })),
      ];
      result = [
        ...result,
        ...specialties.map((item) => ({
          id: item.id,
          type: 2,
          valueDisplay:
            this.props.language === LANGUAGES.VI
              ? `Chuyên khoa, ${item.name}`
              : `Specialty, ${item.name}`,
        })),
      ];

      this.setState({ resultSearch: result });
    }
  };

  handleOnChangeSearch = (e) => {
    this.setState({ textSearch: e.target.value }, () => {
      if (this.state.textSearch.trim() !== "") {
        this.handleStartSearch();
      } else {
        this.setState({ resultSearch: [] });
      }
    });
  };

  handleClickItemSearch = (item) => {
    const { type, id } = item;
    let path = "";
    switch (type) {
      case 1:
        path = `/detail-doctor/${id}`;
        break;
      case 0:
        path = `/detail-clinic/${id}`;
        break;
      case 2:
        path = `/detail-specialty/${id}`;
        break;
      default:
        break;
    }
    this.props.history.push(path);
  };

  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.returnToHome()}
              ></div>
            </div>
            <div className="center-content">
              <Link to="/specialty">
                <div className="child-content">
                  <div>
                    <b>
                      <FormattedMessage id="home_header.specialty" />
                    </b>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="home_header.search-doctor" />
                  </div>
                </div>
              </Link>
              <Link to="/clinic">
                <div className="child-content">
                  <div>
                    <b>
                      <FormattedMessage id="home_header.health-facility" />
                    </b>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="home_header.select-room" />
                  </div>
                </div>
              </Link>
              <Link to="/doctors">
                <div className="child-content">
                  <div>
                    <b>
                      <FormattedMessage id="home_header.doctor" />
                    </b>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="home_header.select-doctor" />
                  </div>
                </div>
              </Link>
              <Link to="/medical-package">
                <div className="child-content">
                  <div>
                    <b>
                      <FormattedMessage id="home_header.fee" />
                    </b>
                  </div>
                  <div className="subs-title">
                    <FormattedMessage id="home_header.check-health" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="home_header.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  🇻🇳
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  🇬🇧
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="home_banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="home_banner.title2" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm thông tin"
                  value={this.state.textSearch}
                  onChange={this.handleOnChangeSearch}
                />
                {this.state.resultSearch.length > 0 && (
                  <div className="contentSearch">
                    {this.state.resultSearch.map((item, index) => (
                      <p
                        className="itemSearch"
                        key={index}
                        onClick={() => this.handleClickItemSearch(item)}
                      >
                        {item.valueDisplay}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home_banner.option-child1" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home_banner.option-child2" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home_banner.option-child3" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-flask"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home_banner.option-child4" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home_banner.option-child5" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-briefcase-medical"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="home_banner.option-child6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
