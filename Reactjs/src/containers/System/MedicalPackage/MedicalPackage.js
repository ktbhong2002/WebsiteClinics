import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableMedicalPackage from "./TableMedicalPackage";
// import validInput from "../../../utils/validInput";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class MedicalPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasOldData: false,
      previewImgURL: "",
      isOpen: false,

      name: "",
      descriptionMarkdown: "",
      descriptionHTML: "",
      avatar: "",
      sapo: "",
      address: "",
      clinic: "",
      specialty: "",
      price: "",
      action: "CREATE",

      clinicArr: [],
      specialtyArr: [],
      medicalPackageEditId: "",
    };
  }
  componentDidMount() {
    this.props.getClinicStart();
    this.props.getAllSpecialtyStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.specialtyRedux !== this.props.specialtyRedux) {
      let arrSpecialties = this.props.specialtyRedux;
      this.setState({
        specialtyArr: arrSpecialties,
        specialty:
          arrSpecialties && arrSpecialties.length > 0
            ? arrSpecialties[0].id
            : "",
      });
    }
    if (prevProps.clinicRedux !== this.props.clinicRedux) {
      let arrClinics = this.props.clinicRedux;
      this.setState({
        clinicArr: arrClinics,
        clinic: arrClinics && arrClinics.length > 0 ? arrClinics[0].id : "",
      });
    }
    if (prevProps.listMedicalPackages !== this.props.listMedicalPackages) {
      let arrSpecialties = this.props.specialtyRedux;
      let arrClinics = this.props.clinicRedux;

      if (
        prevProps.listMedicalPackages.length !== this.props.listMedicalPackages
      ) {
        this.setState({
          name: "",
          descriptionMarkdown: "",
          descriptionHTML: "",
          sapo: "",
          address: "",
          price: "",
          image: "",
          specialty:
            arrSpecialties && arrSpecialties.length > 0
              ? arrSpecialties[0].id
              : "",
          clinic: arrClinics && arrClinics.length > 0 ? arrClinics[0].id : "",
          avatar: "",
          action: CRUD_ACTION.CREATE,
          previewImgURL: "",
        });
      }
    }
  }

  handleOnChangeText = (event, id) => {
    this.setState({
      [id]: event.target.value,
    });
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
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  handleSaveMedicalPackage = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    if (action === CRUD_ACTION.CREATE) {
      this.props.createNewMedicalPackage({
        name: this.state.name,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
        avatar: this.state.avatar,
        sapo: this.state.sapo,
        address: this.state.address,
        price: this.state.price,
        specialtyId: this.state.specialty,
        clinicId: this.state.clinic,
        action: "CREATE",
      });
    }
    if (action === CRUD_ACTION.EDIT) {
      //fire redux edit user
      this.props.editAMedicalPackageRedux({
        id: this.state.medicalPackageEditId,
        name: this.state.name,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
        avatar: this.state.avatar,
        sapo: this.state.sapo,
        address: this.state.address,
        price: this.state.price,
        specialtyId: this.state.specialty,
        clinicId: this.state.clinic,
        action: "EDIT",
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "name",
      "sapo",
      "address",
      "descriptionMarkdown",
      "descriptionHTML",
    ];
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

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  handleEditMedicalPackageFromParent = (medicalPackage) => {
    let imageBase64 = "";
    if (medicalPackage.image) {
      imageBase64 = medicalPackage.image;
    }

    this.setState({
      name: medicalPackage.name,
      descriptionHTML: medicalPackage.descriptionHTML,
      descriptionMarkdown: medicalPackage.descriptionMarkdown,
      avatar: "",
      sapo: medicalPackage.sapo,
      address: medicalPackage.address,
      specialty: medicalPackage.specialtyId,
      clinic: medicalPackage.clinicId,
      price: medicalPackage.price,
      previewImgURL: imageBase64,
      action: CRUD_ACTION.EDIT,
      medicalPackageEditId: medicalPackage.id,
    });
  };

  render() {
    let clinics = this.state.clinicArr;
    let specialties = this.state.specialtyArr;
    let language = this.state.language;
    console.log(this.state);
    let {
      name,
      descriptionMarkdown,
      avatar,
      sapo,
      address,
      specialty,
      clinic,
      price,
    } = this.state;

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
                />
              </div>

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

              <div className="col-4">
                <label>Phòng khám</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "clinic");
                  }}
                  value={clinic}
                >
                  {clinics &&
                    clinics.length > 0 &&
                    clinics.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-4">
                <label>Chuyên khoa</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "specialty");
                  }}
                  value={specialty}
                >
                  {specialties &&
                    specialties.length > 0 &&
                    specialties.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-4">
                <label>Giá khám</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="để trống sẽ hiển thị Liên hệ"
                  value={price}
                  onChange={(event) => {
                    this.onChangeInput(event, "price");
                  }}
                />
              </div>

              <div className="col-6">
                <label>Mô tả</label>
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

              <div className="col-3">
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

              <div className="col-12">
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
                  this.state.action === CRUD_ACTION.CREATE
                    ? "btn btn-warning"
                    : "btn btn-primary"
                }
                onClick={() => this.handleSaveMedicalPackage()}
              >
                {this.state.action === CRUD_ACTION.EDIT
                  ? "Lưu thay đổi"
                  : "Lưu"}
              </button>
            </div>
          </div>

          <TableMedicalPackage
            handleEditMedicalPackageFromParentKey={
              this.handleEditMedicalPackageFromParent
            }
            action={this.state.action}
          />

          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    specialtyRedux: state.admin.specialties,
    clinicRedux: state.admin.clinics,
    listMedicalPackages: state.admin.medical_packages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClinicStart: () => dispatch(actions.fetchClinicStart()),
    getAllSpecialtyStart: () => dispatch(actions.fetchSpecialtyStart()),
    createNewMedicalPackage: (data) =>
      dispatch(actions.createNewMedicalPackage(data)),
    // fetchMedicalPackageRedux: () =>
    //   dispatch(actions.fetchAllMedicalPackageStart()),
    editAMedicalPackageRedux: (data) =>
      dispatch(actions.editAMedicalPackage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalPackage);
