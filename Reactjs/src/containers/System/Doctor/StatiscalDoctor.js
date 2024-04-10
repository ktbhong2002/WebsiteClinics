import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import {
  getAllPatientForDoctor,
  getAllPatientsForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import moment from "moment";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverLay from "react-loading-overlay";
import ReactTable from "react-table-6";
import "react-table-v6/react-table.css";

class StatiscalDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  // getDataPatient = async () => {
  //   let { user } = this.props;
  //   let { currentDate } = this.state;
  //   let formatedDate = new Date(currentDate).getTime();
  //   let res = await getAllPatientForDoctor({
  //     doctorId: user.id,
  //     date: formatedDate,
  //   });
  //   if (res && res.errCode === 0) {
  //     this.setState({
  //       dataPatient: res.data,
  //     });
  //   }
  // };
  getDataPatient = async () => {
    let { user } = this.props;
    let res = await getAllPatientsForDoctor({
      doctorId: user.id,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      await this.getDataPatient();
      this.closeRemedyModal();
      toast.success("Sent successfully!");
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Failed to send");
      console.log("check remedy: ", res);
    }
  };

  render() {
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;

    let { language } = this.props;

    return (
      <>
        <LoadingOverLay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
            <div className="manage-patient-body row">
              <div className="col-12 table-manage-patient">
                <ReactTable
                  data={dataPatient}
                  columns={[
                    // {
                    //   Header: "STT",
                    //   accessor: (row, index) => index + 1,
                    // },
                    {
                      Header: "Ngày",
                      accessor: "patientData.date",
                      filterable: true,
                      Cell: (row) => (
                        <div>
                          {new Date(
                            parseInt(row.original.date)
                          ).toLocaleDateString("vi-VN", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                          })}
                        </div>
                      ),
                    },
                    {
                      Header: "Thời gian",
                      accessor: "timeTypeDataPatient.valueVi",
                      filterable: true,
                      Cell: (row) => <div>{row.value}</div>,
                    },
                    {
                      Header: "Họ tên",
                      accessor: "patientData.firstName",
                      filterable: true,
                      Cell: (row) =>
                        row.value ? row.value : "No name available",
                    },
                    {
                      Header: "Địa chỉ",
                      accessor: "patientData.address",
                      filterable: true,
                      Cell: (row) =>
                        row.value ? row.value : "No address available",
                    },
                    {
                      Header: "Số điện thoại",
                      accessor: "patientData.phoneNumber",
                      filterable: true,
                      Cell: (row) =>
                        row.value ? row.value : "No phoneNumber available",
                    },
                    {
                      Header: "Email",
                      accessor: "patientData.email",
                      filterable: true,
                      Cell: (row) =>
                        row.value ? row.value : "No email available",
                    },
                    {
                      Header: "Giới tính",
                      accessor: "patientData.genderData.valueVi",
                      filterable: true,
                      Cell: (row) =>
                        row.value ? row.value : "No gender available",
                    },
                    {
                      Header: "Trạng thái",
                      accessor: "statusDataPatient.valueVi",
                      Cell: (row) => (
                        <div className="mp-btn-confirm">
                          <center>
                            {row.value ? row.value : "No status available"}
                          </center>
                        </div>
                      ),
                    },
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            filterable
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverLay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StatiscalDoctor);
