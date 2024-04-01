import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../Admin/TableManageUser.scss";
import * as actions from "../../../store/actions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { getAllClinics } from "../../../services/userService";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicsRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchClinicRedux();
    this.getAllClinicsFromReact();
  }

  getAllClinicsFromReact = async () => {
    let response = await getAllClinics(`ALL`);
    if (response && response.errCode === 0) {
      this.setState({
        arrClinics: response.data,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listClinics !== this.props.listClinics) {
      this.setState({
        clinicsRedux: this.props.listClinics,
      });
    }
  }

  handleDeleteClinic = (clinic) => {
    try {
      // Hiển thị hộp thoại xác nhận trước khi xóa người dùng
      let confirmDelete = window.confirm(
        "Bạn có chắc chắn muốn xóa phòng khám này không?"
      );
      if (confirmDelete) {
        this.props.deleteAClinicRedux(clinic.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditClinic = (clinic) => {
    this.props.handleEditClinicFromParentKey(clinic);
  };

  render() {
    let arrClinics = this.state.arrClinics;
    console.log(arrClinics);
    return (
      <React.Fragment>
        <table id="TableManageUser">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>

            {arrClinics &&
              arrClinics.length > 0 &&
              arrClinics.map((item, index) => {
                return (
                  <tr key={index}>
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
                        onClick={() => this.handleEditClinic(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => this.handleDeleteClinic(item)}
                        className="btn-delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listClinics: state.admin.clinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClinicRedux: () => dispatch(actions.fetchAllClinicStart()),
    deleteAClinicRedux: (id) => dispatch(actions.deleteAClinic(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
