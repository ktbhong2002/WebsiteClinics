import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import { getExtraDoctorInforById } from "../../../services/userService";
import NumberFormat from "react-number-format";
// import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getDetailMedicalPackageById } from "../../../services/userService";
import _ from "lodash";
import "./DetailMedicalPackage.scss";
import "./MedicalPackageExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import MedicalPackageExtraInfor from "./MedicalPackageExtraInfor";

class DetailMedicalPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailMedicalPackage: {},
      currentMedicalPackageId: -1,
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
        this.setState({
          currentMedicalPackageId: id,
        });
        let res = await getDetailMedicalPackageById(id);
        if (res && res.errCode === 0) {
          this.setState({
            dataDetailMedicalPackage: res.data,
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
  showDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { dataDetailMedicalPackage, isShowDetailInfor } = this.state;
    console.log(dataDetailMedicalPackage);

    console.log(dataDetailMedicalPackage.image);
    if (!dataDetailMedicalPackage.image) {
      return null;
    }
    let { language } = this.props;
    return (
      <>
        <HomeHeader />
        <div className="medicalPackage-detail-container">
          <div className="intro-medicalPackage">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(data:image/jpeg;base64,${Buffer.from(
                  dataDetailMedicalPackage.image,
                  "binary"
                ).toString("base64")})`,
              }}
            ></div>

            <div className="content-right">
              <div className="up">{dataDetailMedicalPackage.name}</div>
              {/* <div className="up">{dataDetailMedicalPackage.image}</div> */}
            </div>
          </div>
          <div className="schedule-medicalPackage">
            <div className="content-left">
              {dataDetailMedicalPackage && dataDetailMedicalPackage.sapo && (
                <span>{dataDetailMedicalPackage.sapo}</span>
              )}
              {/* <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} /> */}
            </div>
            <div className="content-right">
              <div className="doctor-extra-infor-container">
                <div className="content-up">
                  <div className="text-address">
                    <FormattedMessage id="patient.extra-infor-doctor.text-address" />
                  </div>
                  <div className="name-clinic">
                    {/* {dataDetailMedicalPackage &&
                    dataDetailMedicalPackage.clinicId
                      ? dataDetailMedicalPackage.clinicId
                      : "BookingCare"} */}
                    Phòng khám Bệnh viện Đại học Y Dược 1
                  </div>
                  <div className="detail-address">
                    {dataDetailMedicalPackage &&
                    dataDetailMedicalPackage.address
                      ? dataDetailMedicalPackage.address
                      : "Đang cập nhật!"}
                  </div>
                </div>
                <div className="content-down">
                  Giá khám : {dataDetailMedicalPackage.price}
                  {dataDetailMedicalPackage === false && (
                    <div className="short-infor">
                      <FormattedMessage id="patient.extra-infor-doctor.price" />

                      {/* {dataDetailMedicalPackage &&
                dataDetailMedicalPackage.price &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    className="currency"
                    value={dataDetailMedicalPackage.priceTypeData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={`VND`}
                  />
                )} */}
                      {/* {dataDetailMedicalPackage &&
                dataDetailMedicalPackage.priceTypeData &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    className="currency"
                    value={extraInfor.priceTypeData.valueEn}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={`$`}
                  />
                )} */}
                      <span
                        className="detail"
                        onClick={() => this.showDetailInfor(true)}
                      >
                        <FormattedMessage id="patient.extra-infor-doctor.detail" />
                      </span>
                    </div>
                  )}
                  {isShowDetailInfor === true && (
                    <>
                      <div className="title-price">
                        <FormattedMessage id="patient.extra-infor-doctor.price" />
                      </div>
                      <div className="detail-infor">
                        <div className="price">
                          <span className="left">
                            <FormattedMessage id="patient.extra-infor-doctor.price" />
                          </span>
                          <span className="right">
                            {dataDetailMedicalPackage &&
                              dataDetailMedicalPackage.priceTypeData &&
                              language === LANGUAGES.VI && (
                                <NumberFormat
                                  className="currency"
                                  value={
                                    dataDetailMedicalPackage.priceTypeData
                                      .valueVi
                                  }
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  suffix={`VND`}
                                />
                              )}
                            {dataDetailMedicalPackage &&
                              dataDetailMedicalPackage.priceTypeData &&
                              language === LANGUAGES.EN && (
                                <NumberFormat
                                  className="currency"
                                  value={
                                    dataDetailMedicalPackage.priceTypeData
                                      .valueEn
                                  }
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={`$`}
                                />
                              )}
                          </span>
                        </div>
                        <div className="note">
                          {dataDetailMedicalPackage &&
                          dataDetailMedicalPackage.note
                            ? dataDetailMedicalPackage.note
                            : ""}
                        </div>
                      </div>
                      <div className="payment">
                        <FormattedMessage id="patient.extra-infor-doctor.payment" />
                        {dataDetailMedicalPackage &&
                        dataDetailMedicalPackage.paymentTypeData &&
                        language === LANGUAGES.VI
                          ? dataDetailMedicalPackage.paymentTypeData.valueVi
                          : ""}
                        {dataDetailMedicalPackage &&
                        dataDetailMedicalPackage.paymentTypeData &&
                        language === LANGUAGES.EN
                          ? dataDetailMedicalPackage.paymentTypeData.valueEn
                          : ""}
                      </div>
                      <div className="hide-price">
                        <span onClick={() => this.showDetailInfor(false)}>
                          <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-infor-medicalPackage">
            {dataDetailMedicalPackage &&
              dataDetailMedicalPackage.descriptionMarkdown &&
              dataDetailMedicalPackage.descriptionHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailMedicalPackage.descriptionHTML,
                  }}
                ></div>
              )}
          </div>

          <HomeFooter />
        </div>
      </>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailMedicalPackage);
