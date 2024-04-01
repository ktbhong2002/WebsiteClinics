import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { getAllClinic } from "../../../services/userService";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: "",
      // address: "",
      // imageBase64: "",
      // descriptionHTML: "",
      // descriptionMarkdown: "",
      // previewImgURL: "",
      // isOpen: false,
      // arrClinics: [],
      // isOpenModaEditlClinic: false,
      // isOpenModalClinic: false,
      // clinicEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllClinicsFromReact();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  // handleOnChangeImage = async (event) => {
  //   let data = event.target.files;
  //   let file = data[0];
  //   if (file) {
  //     let base64 = await CommonUtils.getBase64(file);
  //     this.setState({
  //       imageBase64: base64,
  //     });
  //   }
  // };

  getAllClinicsFromReact = async () => {
    let response = await getAllClinic(`ALL`);
    if (response && response.errCode === 0) {
      this.setState({
        arrClinics: response.data,
      });
    }
  };

  handleAddNewClinic = () => {
    this.setState({
      isOpenModalClinic: true,
    });
  };

  toggleClinicModal = () => {
    this.setState({
      isOpenModalClinic: !this.state.isOpenModalClinic,
    });
  };

  toggleClinicEditModal = () => {
    this.setState({
      isOpenModaEditlClinic: !this.state.isOpenModaEditlClinic,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log("check base64: ", base64);
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

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Successfully added a new clinic.");
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        image: "",
      });
    } else {
      toast.error("Failed to add a new clinic.");
      console.log("check res: ", res);
    }
  };

  handleDeleteClinic = async (clinic) => {
    // try {
    //   // Hiển thị hộp thoại xác nhận trước khi xóa người dùng
    //   let confirmDelete = window.confirm(
    //     "Bạn có chắc chắn muốn xóa người dùng này không?"
    //   );
    //   // Nếu người dùng đồng ý xóa
    //   if (confirmDelete) {
    //     let res = await deleteClinic(user.id);
    //     if (res && res.errCode === 0) {
    //       await this.getAllUsersFromReact();
    //     } else {
    //       alert(res.errMessage);
    //     }
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  handleEditClinic = (clinic) => {
    this.setState({
      isOpenModaEditlClinic: true,
      clinicEdit: clinic,
    });
  };

  doEditClinic = async (clinic) => {
    // try {
    //   let res = await editClinicService(clinic);
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       isOpenModaEditlClinic: false,
    //     });
    //     await this.getAllClinicsFromReact();
    //   } else {
    //     alert(res.errMessage);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  render() {
    let arrClinics = this.state.arrClinics;
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">
          <FormattedMessage id={"admin.manage-clinic.title"} />
        </div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id={"admin.manage-clinic.name-clinic"} />
            </label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnchangeInput(event, "name")}
            />
          </div>
          {/* <div className="col-6 form-group">
            <label>
              <FormattedMessage id={"admin.manage-clinic.picture-clinic"} />
            </label>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnChangeImage(event)}
            /> */}

          <div className="col-6 form-group">
            <label>
              {" "}
              <FormattedMessage id={"admin.manage-clinic.address-clinic"} />
            </label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handleOnchangeInput(event, "address")}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id={"admin.manage-clinic.picture-clinic"} />
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
              <div
                className="preview-image"
                style={{
                  backgroundImage: `url(${this.state.previewImgURL})`,
                }}
                onClick={() => this.openPreviewImage()}
              ></div>
            </div>
          </div>
          <div className="col-12 ">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewClinic()}
            >
              <FormattedMessage id={"admin.manage-clinic.add"} />
            </button>
          </div>
          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>

        <div className="clinics-table mt-3 mx-1">
          <table id="clinics-table">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Description</th>
                <th>Image</th>
              </tr>

              {arrClinics &&
                arrClinics.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>
                        {item.descriptionMarkdown &&
                        item.descriptionMarkdown.length > 500 ? (
                          <>
                            {`${item.descriptionMarkdown.slice(0, 500)}...`}
                            <span>
                              {" "}
                              <Link
                                to={`/detail-clinic/${item.id}`}
                                target="_blank"
                              >
                                Xem thêm
                              </Link>
                            </span>
                          </>
                        ) : (
                          item.descriptionMarkdown
                        )}
                      </td>
                      <td>
                        {item.image && (
                          <img
                            src={item.image}
                            alt="Description"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                        )}
                      </td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditClinic(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteClinic(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
