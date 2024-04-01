import React, { Component } from "react";
import { connect } from "react-redux";
import { CRUD_ACTION, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./clinicRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageClinic from "./TableManageClinic";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ClinicRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgURL: "",
      isOpen: false,
      name: "",
      address: "",
      descriptionMarkdown: "",
      descriptionHTML: "",
      avatar: "",

      //   action: "",
      action: CRUD_ACTION.CREATE,
      clinicEditId: "",
    };
  }

  componentDidMount() {
    this.props.fetchClinicRedux();
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

  handleEditClinicFromParent = (clinic) => {
    let imageBase64 = "";
    if (clinic.image) {
      imageBase64 = clinic.image;
    }
    console.log(imageBase64);

    this.setState({
      name: clinic.name,
      descriptionMarkdown: clinic.descriptionMarkdown,
      descriptionHTML: clinic.descriptionHTML,
      avatar: "",
      address: clinic.address,
      previewImgURL: imageBase64,
      action: CRUD_ACTION.EDIT,
      clinicEditId: clinic.id,
    });
  };

  render() {
    let { name, descriptionMarkdown, address, avatar } = this.state;
    return (
      <div className="manage-clinic-container">
        <div className="ms-title">Quản lý phòng khám</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <label>Tên phòng khám</label>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    this.onChangeInput(event, "name");
                  }}
                  disabled={this.state.action === CRUD_ACTION.EDIT}
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
              <div className="col-6">
                <label>Địa chỉ phòng khám</label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address");
                  }}
                />
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
            <TableManageClinic
              handleEditClinicFromParentKey={this.handleEditClinicFromParent}
            />
          </div>
        </div>

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
    listClinics: state.admin.clinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClinicRedux: () => dispatch(actions.fetchAllClinicStart()),
    createNewClinic: (data) => dispatch(actions.createNewClinic(data)),
    editAClinicRedux: (data) => dispatch(actions.editAClinic(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicRedux);
