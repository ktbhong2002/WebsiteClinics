import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import {
  searchHandbookAction,
  getAllHandbook,
} from "../../../services/userService";
import "./handbookHome.scss";

const HandbookHome = () => {
  const [dataHandbook, setDataHandbook] = useState([]);
  const [perPage] = useState(14);
  const [currentPage, setCurrentPage] = useState(0);
  const [textSearch, setTextSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllHandbook();
        if (res && res.errCode === 0) {
          setDataHandbook(res.data || []);
        }
      } catch (error) {
        console.error("Error fetching handbook:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (textSearch.length >= 2) {
        setLoading(true);
        try {
          const res = await searchHandbookAction({
            textSearch: textSearch.trim(),
          });
          if (res && res.data) {
            setDataHandbook(res.data || []);
          }
        } catch (error) {
          console.error("Error searching handbook:", error);
        }
        setLoading(false);
      } else {
        // Nếu textSearch rỗng, load lại tất cả handbook
        fetchData();
      }
    };

    handleSearch();
  }, [textSearch, dispatch]);

  const fetchData = async () => {
    try {
      const res = await getAllHandbook();
      if (res && res.errCode === 0) {
        setDataHandbook(res.data || []);
      }
    } catch (error) {
      console.error("Error fetching handbook:", error);
    }
  };

  const handleViewDetailHandbook = (item) => {
    window.open(item.link, "_blank");
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  };

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
        <div className="row">
          <div className="col-7"></div>
          <div className="search col-5">
            <input
              id="searchId"
              className="form-control mr-sm-1 search__input"
              type="search"
              placeholder=" 🔍  Nhập nội dung cần tìm kiếm..."
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="section-body-handbook">
          {dataHandbook &&
            dataHandbook.length > 0 &&
            dataHandbook.slice(offset, offset + perPage).map((item, index) => (
              <div
                className="section-customize-handbook specialty-child"
                key={index}
                onClick={() => handleViewDetailHandbook(item)}
              >
                <div
                  className="bg-image"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="item-content">
                  <div className="specialty-name">{item.title}</div>
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
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
      <HomeFooter />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandbookHome);
