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
import { getAllSpecialties } from "../../../services/userService";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialtiesRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchSpecialtyRedux();
    this.getAllSpecialtiesFromReact();
  }

  getAllSpecialtiesFromReact = async () => {
    let response = await getAllSpecialties(`ALL`);
    if (response && response.errCode === 0) {
      this.setState({
        arrSpecialties: response.data,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listSpecialties !== this.props.listSpecialties) {
      this.setState({
        specialtiesRedux: this.props.listSpecialties,
      });
    }
  }

  handleDeleteSpecialty = (specialty) => {
    try {
      // Hiển thị hộp thoại xác nhận trước khi xóa người dùng
      let confirmDelete = window.confirm(
        "Bạn có chắc chắn muốn xóa chuyên khoa này không?"
      );
      if (confirmDelete) {
        this.props.deleteASpecialtyRedux(specialty.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditSpecialty = (specialty) => {
    this.props.handleEditSpecialtyFromParentKey(specialty);
  };

  render() {
    let arrSpecialties = this.state.arrSpecialties;
    console.log(arrSpecialties);
    return (
      <React.Fragment>
        <table id="TableManageUser">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>

            {arrSpecialties &&
              arrSpecialties.length > 0 &&
              arrSpecialties.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                      {item.descriptionMarkdown &&
                      item.descriptionMarkdown.length > 500 ? (
                        <>
                          {`${item.descriptionMarkdown.slice(0, 500)}...`}
                          <span>
                            {" "}
                            <Link
                              to={`/detail-specialty/${item.id}`}
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
                        onClick={() => this.handleEditSpecialty(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => this.handleDeleteSpecialty(item)}
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
    listSpecialties: state.admin.specialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecialtyRedux: () => dispatch(actions.fetchAllSpecialtyStart()),
    deleteASpecialtyRedux: (id) => dispatch(actions.deleteASpecialty(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageSpecialty);
