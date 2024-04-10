import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllMedicalPackages,
  getAllPatientForDoctor,
  getAllPatientsForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import * as actions from "../../../store/actions";
import "../Doctor/ManagePatient.scss";
// import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverLay from "react-loading-overlay";
import ReactTable from "react-table-6";
import "react-table-v6/react-table.css";

class TableMedicalPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMedicalPackage: [],
      medicalPackageRedux: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataMedicalPackage();
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
  getDataMedicalPackage = async () => {
    let { medicalPackage } = this.props;
    let res = await getAllMedicalPackages({
      //   medicalPackageId: medicalPackage.id,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataMedicalPackage: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleDeleteMedicalPackage = (medicalPackage) => {
    try {
      // Hiển thị hộp thoại xác nhận trước khi xóa người dùng
      let confirmDelete = window.confirm(
        "Bạn có chắc chắn muốn xóa gói khám này không?"
      );
      if (confirmDelete) {
        this.props.deleteAMedicalPackageRedux(medicalPackage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditMedicalPackage = (medicalPackage) => {
    this.props.handleEditMedicalPackageFromParentKey(medicalPackage);
    console.log(this.props);
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
    let { dataMedicalPackage, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;

    return (
      <>
        <LoadingOverLay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Danh sách gói khám hiện có</div>
            <div className="manage-patient-body row">
              <div className="col-12 table-manage-patient">
                <ReactTable
                  data={dataMedicalPackage}
                  columns={[
                    {
                      Header: "Tên gói khám",
                      accessor: "name",
                      filterable: true,
                      Cell: (row) => <div>{row.value}</div>,
                    },
                    {
                      Header: "Cơ sở khám",
                      accessor: "clinicData.name",
                      filterable: true,
                      Cell: (row) => (
                        <div style={{ textAlign: "center" }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: "Chuyên khoa",
                      accessor: "specialtyData.name",
                      filterable: true,
                      Cell: (row) => (
                        <div style={{ textAlign: "center" }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: "Giá tiền",
                      accessor: "price",
                      filterable: true,
                      Cell: (row) => (
                        <div style={{ textAlign: "center" }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: "Mô tả ngắn",
                      accessor: "sapo",
                      filterable: true,
                      Cell: (row) => (row.value ? row.value : ""),
                    },
                    {
                      Header: "Action",
                      Cell: (row) => (
                        <div style={{ textAlign: "center" }}>
                          <button
                            onClick={() =>
                              this.handleEditMedicalPackage(row.original)
                            }
                            className="btn-edit"
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            onClick={() =>
                              this.handleDeleteMedicalPackage(row.original.id)
                            }
                            className="btn-delete"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
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
          {/* <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            filterable
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          /> */}
        </LoadingOverLay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listMedicalPackages: state.admin.medicalPackages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMedicalPackageRedux: () =>
      dispatch(actions.fetchAllMedicalPackageStart()),
    deleteAMedicalPackageRedux: (id) =>
      dispatch(actions.deleteAMedicalPackage(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableMedicalPackage);
