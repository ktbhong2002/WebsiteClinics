import React, { Component } from "react";
import { connect } from "react-redux";
import { CRUD_ACTION, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./specialtyRedux.scss";
import "./ManageSpecialty.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageSpecialty from "./TableManageSpecialty";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class SpecialtyRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgURL: "",
      isOpen: false,
      name: "",
      descriptionMarkdown: "",
      descriptionHTML: "",
      avatar: "",

      action: "",
      // action: CRUD_ACTION.CREATE,
      specialtyEditId: "",
    };
  }

  componentDidMount() {
    this.props.fetchSpecialtyRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listSpecialties !== this.props.listSpecialties) {
      this.setState({
        name: "",
        descriptionMarkdown: "",
        descriptionHTML: "",
        image: "",
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

  handleSaveSpecialty = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    if (action !== CRUD_ACTION.EDIT) {
      this.props.createNewSpecialty({
        name: this.state.name,
        descriptionMarkdown: this.state.descriptionMarkdown,
        descriptionHTML: this.state.descriptionHTML,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTION.EDIT) {
      this.props.editASpecialtyRedux({
        id: this.state.specialtyEditId,
        name: this.state.name,
        descriptionMarkdown: this.state.descriptionMarkdown,
        descriptionHTML: this.state.descriptionHTML,
        avatar: this.state.avatar,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["name"]; // Thêm trường "avatar" vào mảng kiểm tra
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

  handleEditSpecialtyFromParent = (specialty) => {
    let imageBase64 = "";
    if (specialty.image) {
      imageBase64 = specialty.image;
    }
    console.log(imageBase64);

    this.setState({
      name: specialty.name,
      descriptionMarkdown: specialty.descriptionMarkdown,
      descriptionHTML: specialty.descriptionHTML,
      avatar: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTION.EDIT,
      specialtyEditId: specialty.id,
    });
  };

  render() {
    let { name, descriptionMarkdown, avatar } = this.state;
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý chuyên khoa</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <label>Tên chuyên khoa</label>
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
                onClick={() => this.handleSaveSpecialty()}
              >
                {this.state.action === CRUD_ACTION.EDIT ? "Sửa" : "Lưu"}
              </button>
            </div>
            <div className="col-12 mb-5"></div>
            <TableManageSpecialty
              handleEditSpecialtyFromParentKey={
                this.handleEditSpecialtyFromParent
              }
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
    listSpecialties: state.admin.specialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecialtyRedux: () => dispatch(actions.fetchAllSpecialtyStart()),
    createNewSpecialty: (data) => dispatch(actions.createNewSpecialty(data)),
    editASpecialtyRedux: (data) => dispatch(actions.editASpecialty(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyRedux);
