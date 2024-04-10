import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalPackageExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import { getExtraDoctorInforById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { getDetailMedicalPackageById } from "../../../services/userService";
class MedicalPackageExtraInfor extends Component {
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
    let { language } = this.props;
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-infor-doctor.text-address" />
          </div>
          <div className="name-clinic">
            {dataDetailMedicalPackage && dataDetailMedicalPackage.clinicId
              ? dataDetailMedicalPackage.clinicId
              : "BookingCare"}
          </div>
          <div className="detail-address">
            {dataDetailMedicalPackage && dataDetailMedicalPackage.address
              ? dataDetailMedicalPackage.address
              : "Đang cập nhật!"}
          </div>
        </div>
        <div className="content-down">
          {dataDetailMedicalPackage === false && (
            <div className="short-infor">
              <FormattedMessage id="patient.extra-infor-doctor.price" />
              {dataDetailMedicalPackage.price}
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
                          value={dataDetailMedicalPackage.priceTypeData.valueVi}
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
                          value={dataDetailMedicalPackage.priceTypeData.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={`$`}
                        />
                      )}
                  </span>
                </div>
                <div className="note">
                  {dataDetailMedicalPackage && dataDetailMedicalPackage.note
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
)(MedicalPackageExtraInfor);
