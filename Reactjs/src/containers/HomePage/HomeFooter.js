import React, { Component } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import moment from "moment"; // Import moment library if not imported

class HomeFooter extends Component {
  render() {
    return (
      <div className="">
        <div className="horizontal-line">
          <hr style={{ borderTop: "1px solid #ccc", margin: "20px 0" }} />
        </div>
        <div className="row">
          <div className="col-md-1 mx-auto"></div>
          <div className="col-md-7 mx-auto" style={{ marginRight: "1000px" }}>
            <div className="d-flex align-items-center">
              {" "}
              {/* Use flex container for image and information */}
              <div className="mr-3">
                {" "}
                {/* Adjust margin as needed */}
                <Link to="/home">
                  {" "}
                  <img
                    src="static/media/logo.2e2d78c9.svg"
                    alt="Booking Care"
                    style={{ width: "300px", height: "auto" }}
                  />
                </Link>
              </div>
              <div>
                <h5 className="font-weight-bold text-uppercase mt-3 mb-4">
                  Hệ thống đặt lịch khám BookingCare
                </h5>
                <ul>
                  <li className="list-style-none border-0">
                    <p>
                      <span className="font-weight-bold">Địa chỉ: </span>Đại học
                      Kinh tế - Kỹ thuật - Công nghiệp Hà Nội
                    </p>
                  </li>
                  <li className="list-style-none border-0">
                    <p>
                      <span className="font-weight-bold">Hotline: </span>
                      0982650713
                    </p>
                  </li>
                  <li className="list-style-none border-0">
                    <p>
                      <span className="font-weight-bold">Liên hệ: </span>
                      kieuhong05102002@gmail.com
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4 mx-auto mt-3 mb-4">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDaihoc.uneti%2F&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true&appId"
              width="100%"
              height={130}
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder={0}
              allow="encrypted-media"
              title="fanpage"
            />
          </div>
        </div>
        <div
          style={{ background: "#435165" }}
          className="footer-copyright text-center py-3 text-white"
        >
          © {moment().format("YYYY")} Copyright:
          <a
            href="https://fb.com/hoon.512"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            {/* Add rel attribute */} Toàn bộ bản quyền thuộc Kiều Thị Bích
            Hồng.
          </a>
        </div>
      </div>
    );
  }
}

export default HomeFooter;
