import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class medicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };
  render() {
    let { dataClinics } = this.state;
    return (
      <div className="section-share section-clinic">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế</span>
            <Link to="/clinic">
              <button className="btn-section">
                <FormattedMessage id="homepage.more-infor" />
              </button>
            </Link>
          </div>
          <div className="section-body">
            <Slider
              {...{
                ...this.props.settings,
                slidesToShow: 3,
                slidesToScroll: 3,
              }}
            >
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div
                      className="section-customize clinic-child"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <center>
                        <div
                          className="bg-image"
                          style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: "contain", // Sử dụng backgroundSize thay vì background-size
                          }}
                        />
                      </center>

                      {/* kích thước ảnh 5x5 */}
                      <div className="clinic-name">{item.name}</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(medicalFacility)
);
