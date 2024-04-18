import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getAllDetailClinicById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import LikeAndShare from "../SocialPlugin/Comment";
import { LANGUAGES } from "../../../utils";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      try {
        let id = this.props.match.params.id;
        let res = await getAllDetailClinicById({ id: id });
        if (res && res.errCode === 0) {
          let data = res.data;
          let arrDoctorId = [];
          if (data && !_.isEmpty(res.data)) {
            let arr = data.doctorClinic;
            if (arr && arr.length > 0) {
              arr.map((item) => {
                arrDoctorId.push(item.doctorId);
              });
            }
          }

          this.setState({
            dataDetailClinic: res.data,
            arrDoctorId: arrDoctorId,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    let { language } = this.props;
    let currentURL = window.location.href;
    let path = new URL(currentURL).pathname;
    return (
      <div className="detail-clinic-container">
        <HomeHeader />
        <div className="detail-clinic-body">
          <div className="description-clinic">
            <div className="section-customize-clinic-detail specialty-child">
              <img
                className="bg-image"
                src={dataDetailClinic.image}
                alt="Clinic Image"
                style={{ width: "auto", height: "auto" }}
              />
              <div className="item-content">
                <div className="clinic-name">{dataDetailClinic.name}</div>
                <div className="clinic-address">
                  📍 {dataDetailClinic.address}
                </div>
                {/* Các thông tin khác nếu cần */}
                <div className="plugin-fb">
                  <div
                    class="fb-like"
                    data-href={"https://ddtienanh.fun" + path}
                    data-width="450"
                    data-layout=""
                    data-action=""
                    data-size=""
                    data-share="true"
                  ></div>
                </div>
              </div>
            </div>
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClinic.descriptionHTML,
                  }}
                  style={{
                    marginBottom: "5px",
                    marginTop: "10px",
                    fontSize: "17px",
                  }}
                ></div>
              </>
            )}
          </div>

          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="dt-content-left">
                    <div className="profile-doctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                        //   dataTime={dataTime}
                      />
                    </div>
                  </div>
                  <div className="dt-content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>
                    <div className="doctor-extra-infor">
                      <DoctorExtraInfor doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <div
              className="fb-comments"
              data-href={"https://ddtienanh.fun" + path}
              data-width="1000"
              data-numposts="5"
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
