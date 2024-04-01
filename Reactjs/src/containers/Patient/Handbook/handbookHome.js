import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllHandbook } from "../../../services/userService";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import ReactPaginate from "react-paginate";
import "./handbookHome.scss";
class handbookHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbook: [],
      perPage: 14, // Số mục trên mỗi trang
      currentPage: 0, // Trang hiện tại
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

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
    });
  };

  render() {
    const { dataHandbook, currentPage, perPage } = this.state;
    const offset = currentPage * perPage;
    const pageCount = Math.ceil(dataHandbook.length / perPage);

    return (
      <div
        className="section-share section-handbook"
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
                <FormattedMessage id="homepage.handbooks" />
              </center>
            </span>
          </div>

          <div className="section-body-handbook">
            {dataHandbook &&
              dataHandbook.length > 0 &&
              dataHandbook
                .slice(offset, offset + perPage)
                .map((item, index) => (
                  <div
                    className="section-customize-handbook specialty-child"
                    key={index}
                    onClick={() => this.handleViewDetailHandbook(item)}
                  >
                    <div
                      className="bg-image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="item-content">
                      <div className="specialty-name">{item.title}</div>
                      {/* <div className="sapo">{item.sapo}</div> */}
                      {/* Các thông tin khác nếu cần */}
                    </div>
                  </div>
                ))}
          </div>
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(handbookHome);
