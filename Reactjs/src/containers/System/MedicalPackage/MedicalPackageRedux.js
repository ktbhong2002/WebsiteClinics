import React, { Component } from "react";
import { connect } from "react-redux";
import { CRUD_ACTION, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./MedicalPackageRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
// import TableManageClinic from "./TableManageClinic";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { FormattedMessage } from "react-intl";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailMedicalPackageById } from "../../../services/userService";
import TableMedicalPackage from "./TableMedicalPackage";
import { getDetailInforMedicalPackage } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class MedicalPackageRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectedClinic: "",
      selectedSpecialty: "",

      previewImgURL: "",
      isOpen: false,
      name: "",
      address: "",
      descriptionMarkdown: "",
      descriptionHTML: "",
      avatar: "",
      sapo: "",

      //   action: "",
      action: CRUD_ACTION.CREATE,
      clinicEditId: "",
    };
  }

  componentDidMount() {
    // this.props.fetchAllMedicalPackage();
    // this.handleChangeSelect();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listClinics !== this.props.listClinics) {
      this.setState({
        name: "",
        descriptionMarkdown: "",
        descriptionHTML: "",
        image: "",
        address: "",
        action: CRUD_ACTION.CREATE,
        avatar: "",
        previewImgURL: "",
      });
    }
  }

  handleChangeSelect = async () => {
    let { medicalPackageId } = this.props.params;
    let { listSpecialty, listClinic } = this.state;

    let res = await getDetailMedicalPackageById(medicalPackageId);

    if (res && res.errCode === 0 && res.data) {
      let addressMedicalPackage = "",
        specialtyId = "",
        clinicId = "",
        selectedSpecialty = "",
        selectedClinic = "";

      // if (res.data.Doctor_Infor) {
      //   addressClinic = res.data.Doctor_Infor.addressClinic;
      //   nameClinic = res.data.Doctor_Infor.nameClinic;
      //   note = res.data.Doctor_Infor.note;
      //   paymentId = res.data.Doctor_Infor.paymentId;
      //   priceId = res.data.Doctor_Infor.priceId;
      //   provinceId = res.data.Doctor_Infor.provinceId;
      //   specialtyId = res.data.Doctor_Infor.specialtyId;
      //   clinicId = res.data.Doctor_Infor.clinicId;

      //   selectedPayment = paymentId;
      //   selectedPrice = priceId;
      //   selectedProvice = provinceId;
      //   selectedSpecialty = specialtyId;
      //   selectedClinic = clinicId;
      // }
      // this.setState({
      //   descriptionHTML: descriptionHTML,
      //   descriptionMarkdown: descriptionMarkdown,
      //   hasOldData: true,
      //   addressClinic: addressClinic,
      //   nameClinic: nameClinic,
      //   note: note,
      //   selectedPayment: selectedPayment,
      //   selectedPrice: selectedPrice,
      //   selectedProvice: selectedProvice,
      //   selectedSpecialty: selectedSpecialty,
      //   selectedClinic: selectedClinic,
      // });
    } else {
      this.setState({
        descriptionHTML: "",
        descriptionMarkdown: "",
        hasOldData: false,
        addressMedicalPackage: "",
        name: "",
        selectedSpecialty: "",
        selectedClinic: "",
      });
    }
  };

  handleSavedescriptionMarkdown = () => {
    let { doctorId } = this.props.params;
    let { hasOldData } = this.state;
    this.props.saveDetailMedicalPackageAction({
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
      doctorId: doctorId,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic,
      specialtyId: this.state.selectedSpecialty,
    });

    setTimeout(function () {
      window.location.href = "/admin-dashboard/manage-doctor";
    }, 1000);
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveClinic = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    if (action !== CRUD_ACTION.EDIT) {
      this.props.createNewClinic({
        name: this.state.name,
        address: this.state.address,
        descriptionMarkdown: this.state.descriptionMarkdown,
        descriptionHTML: this.state.descriptionHTML,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTION.EDIT) {
      this.props.editAClinicRedux({
        id: this.state.clinicEditId,
        name: this.state.name,
        address: this.state.address,
        descriptionMarkdown: this.state.descriptionMarkdown,
        descriptionHTML: this.state.descriptionHTML,
        avatar: this.state.avatar,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["name", "address"]; // Thêm trường "avatar" vào mảng kiểm tra
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditMedicalPackageFromParent = (medicalPackage) => {
    let imageBase64 = "";
    if (medicalPackage.image) {
      imageBase64 = medicalPackage.image;
    }
    console.log(imageBase64);

    this.setState({
      name: medicalPackage.name,
      descriptionMarkdown: medicalPackage.descriptionMarkdown,
      descriptionHTML: medicalPackage.descriptionHTML,
      avatar: "",
      address: medicalPackage.address,
      previewImgURL: imageBase64,
      action: CRUD_ACTION.EDIT,
      clinicEditId: medicalPackage.id,
    });
  };

  handleSaveContentMarkdown = () => {
    let { doctorId } = this.props.params;
    let { hasOldData } = this.state;
    this.props.saveDetailDoctorAction({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: doctorId,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice,
      selectedPayment: this.state.selectedPayment,
      selectedProvice: this.state.selectedProvice,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic,
      specialtyId: this.state.selectedSpecialty,
    });

    setTimeout(function () {
      window.location.href = "/admin-dashboard/manage-doctor";
    }, 1000);
  };

  handleChangeSelect = async () => {
    let { medicalPackageId } = this.props.params;
    let { listSpecialty, listClinic } = this.state;

    let res = await getDetailInforMedicalPackage(medicalPackageId);

    if (res && res.errCode === 0 && res.data) {
      let addressMedicalPackage = "",
        name = "",
        specialtyId = "",
        clinicId = "",
        selectedSpecialty = "",
        selectedClinic = "",
        address = "";

      if (res.data) {
        address = res.data.address;
        name = res.data.name;

        specialtyId = res.data.specialtyId;
        clinicId = res.data.clinicId;

        selectedSpecialty = specialtyId;
        selectedClinic = clinicId;
      }
      this.setState({
        descriptionHTML: res.data.descriptionHTML,
        descriptionMarkdown: res.data.descriptionMarkdown,
        hasOldData: true,
        address: res.data.address,
        name: res.data.name,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        descriptionHTML: "",
        descriptionMarkdown: "",
        hasOldData: false,
        address: "",
        name: "",
        selectedSpecialty: "",
        selectedClinic: "",
      });
    }
  };

  handleChangeSelectMedicalPackageInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeSelect = (event, type) => {
    let copyState = { ...this.state };
    copyState[type] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  render() {
    let { name, descriptionMarkdown, address, avatar, sapo, price } =
      this.state;
    return (
      <div className="manage-clinic-container">
        <div className="ms-title">Quản lý gói khám</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <label>Tên gói khám</label>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    this.onChangeInput(event, "name");
                  }}
                  disabled={this.state.action === CRUD_ACTION.EDIT}
                />

                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label className="label-upload" htmlFor="previewImg">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div onClick={() => this.openPreviewImage()}>
                    {this.state.previewImgURL && (
                      <img
                        src={this.state.previewImgURL}
                        alt="Preview Image"
                        style={{ maxWidth: "50%", maxHeight: "50%" }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <label>Mô tả ngắn</label>
                <textarea
                  className="form-control"
                  type="text"
                  value={sapo}
                  style={{ height: "75px", resize: "none" }} //
                  onChange={(event) => {
                    this.onChangeInput(event, "sapo");
                  }}
                />
              </div>
              <div className="col-6"></div>

              <div className="col-6">
                <label>Địa chỉ</label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address");
                  }}
                />
              </div>
              <div className="col-6">
                <label>Gói khám thuộc chuyên khoa</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  value={this.state.selectedSpecialty}
                  onChange={(event) =>
                    this.handleOnChangeSelect(event, "selectedSpecialty")
                  }
                >
                  <option value="">
                    {this.props.language == "en"
                      ? "Choose specialty"
                      : "Chọn chuyên khoa"}
                  </option>
                  {this.state.listSpecialty.map((specialty) => {
                    return (
                      <option value={specialty.value}>{specialty.label}</option>
                    );
                  })}
                </select>
              </div>
              <div className="col-6">
                <label>Cơ sở y tế thực hiện gói khám</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  value={this.state.selectedClinic}
                  onChange={(event) =>
                    this.handleOnChangeSelect(event, "selectedClinic")
                  }
                >
                  <option value="">
                    {this.props.language == "en"
                      ? "Choose hospital"
                      : "Chọn bệnh viện"}
                  </option>
                  {this.state.listClinic.map((clinic) => {
                    return <option value={clinic.value}>{clinic.label}</option>;
                  })}
                </select>
              </div>

              <div className="col-6">
                <label>Giá khám</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nhập giá tiền... (để trống sẽ hiển thị Liên hệ)"
                  value={price}
                  onChange={(event) => {
                    this.onChangeInput(event, "price");
                  }}
                />
              </div>

              <div className="" style={{ padding: "20px" }}></div>
              <div className="col-12">
                <div className="" style={{ fontSize: "17px" }}>
                  Mô tả gói khám
                </div>
                <MdEditor
                  style={{ height: "300px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  value={descriptionMarkdown}
                />
              </div>
            </div>

            <div className="col-12 my-3">
              <button
                className={
                  this.state.action === CRUD_ACTION.EDIT
                    ? "btn btn-warning"
                    : "btn btn-primary"
                }
                onClick={() => this.handleSaveClinic()}
              >
                {this.state.action === CRUD_ACTION.EDIT ? "Sửa" : "Lưu"}
              </button>
            </div>
            <div className="col-12 mb-5"></div>
            {/* <TableManageClinic
              handleEditClinicFromParentKey={this.handleEditClinicFromParent}
            /> */}
          </div>
        </div>

        <TableMedicalPackage />

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allMedicalPackages: state.admin.allMedicalPackages,
    allRequiredMedicalPackageInfor: state.admin.allRequiredMedicalPackageInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllMedicalPackages: () => dispatch(actions.fetchAllMedicalPackages()),
    // createNewClinic: (data) => dispatch(actions.createNewClinic(data)),
    // editAClinicRedux: (data) => dispatch(actions.editAClinic(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicalPackageRedux);
