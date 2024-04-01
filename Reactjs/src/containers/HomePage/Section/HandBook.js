import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { getAllHandbook } from "../../../services/userService";
import Slider from "react-slick";
import { withRouter } from "react-router";

class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbook: [],
    };
  }

  async componentDidMount() {
    let res = await getAllHandbook();
    if (res && res.errCode === 0) {
      this.setState({
        dataHandbook: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailHandbook = (item) => {
    // if (this.props.history) {
    //   this.props.history.push(`/detail-handbook/${item.id}`);
    // }
    window.open(item.link, "_blank");
  };

  render() {
    let { dataHandbook } = this.state;
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.handbooks" />
            </span>
            <Link to="/handbook">
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
              {dataHandbook &&
                dataHandbook.length > 0 &&
                dataHandbook.map((item, index) => {
                  return (
                    <div
                      className="section-customize specialty-child"
                      key={index}
                      onClick={() => this.handleViewDetailHandbook(item)}
                    >
                      <div
                        className="bg-image section-sepcialty"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      {/* kich thuoc anh 5,5 */}
                      <div
                        className="handbook-name"
                        style={{ fontSize: "17px" }}
                      >
                        {item.title}
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
