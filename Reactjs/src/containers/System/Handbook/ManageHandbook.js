import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./../UserManage.scss";
import axios from "axios";
import {
  //createNewHandbookService,
  deleteHandbookService,
  editHandbookService,
  getAllHandbook,
  crawlNewHandbook,
  handleDeleteHandbook,
} from "../../../services/userService";
import { toast } from "react-toastify";

class HandbookManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHandbooks: [],
      isOpenModalHandbook: false,
      isOpenModaEditlHandbook: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllHandbooksFromReact();
  }
  componentDidUpdate(prevProps, prevState) {
    // Kiểm tra xem state đã thay đổi từ trước không
    if (prevState.arrHandbooks !== this.state.arrHandbooks) {
      // Log state mới
      console.log("New state:", this.state.arrHandbooks);
    }
  }

  getAllHandbooksFromReact = async () => {
    let response = await getAllHandbook(`ALL`);
    if (response && response.errCode === 0) {
      console.log(response);
      this.setState({
        arrHandbooks: response.data,
      });
    }
  };
  handleAddNewHandbook = async () => {
    try {
      let response = await crawlNewHandbook();
      if (response && response.errCode === 0) {
        this.setState({
          arrHandbooks: response.data,
        });
      }
      window.location.reload();
      toast.success("Thu thập bài viết thành công!");
    } catch (e) {
      toast.error("Lỗi server, liên hệ admin ");
    }
  };

  toggleHandbookModal = () => {
    this.setState({
      isOpenModalHandbook: !this.state.isOpenModalHandbook,
    });
  };
  toggleHandbookEditModal = () => {
    this.setState({
      isOpenModaEditlHandbook: !this.state.isOpenModaEditlHandbook,
    });
  };
  //   createNewHandbook = async (data) => {
  //     try {
  //       let response = await createNewHandbookService(data);
  //       if (response && response.errCode !== 0) {
  //         alert(response.errMessage);
  //       } else {
  //         await this.getAllHandbooksFromReact();
  //         this.setState({
  //           isOpenModalHandbook: false,
  //         });
  //         emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  handleDeleteHandbook = async (id) => {
    try {
      // Hiển thị hộp thoại xác nhận trước khi xóa người dùng
      let confirmDelete = window.confirm(
        "Bạn có chắc chắn muốn xóa bài viết này không?"
      );

      // Nếu người dùng đồng ý xóa
      if (confirmDelete) {
        let res = await deleteHandbookService(id.id);
        if (res && res.errCode === 0) {
          await this.getAllHandbooksFromReact();
        } else {
          alert(res.errMessage);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditHandbook = (user) => {
    this.setState({
      isOpenModaEditlHandbook: true,
      userEdit: user,
    });
  };

  doEditHandbook = async (user) => {
    try {
      let res = await editHandbookService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModaEditlHandbook: false,
        });
        await this.getAllHandbooksFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrHandbooks = this.state.arrHandbooks;
    console.log(arrHandbooks);
    return (
      <div className="users-container">
        <div className="title tex-center">Manage HandBook</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewHandbook()}
          >
            <i className="fas fa-plus"></i>Thu thập bài viết
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>
                  <FormattedMessage id={"manage-handbook.title"} />
                </th>
                <th>
                  <FormattedMessage id={"manage-handbook.category"} />
                </th>
                <th>
                  <FormattedMessage id={"manage-handbook.sapo"} />
                </th>
                <th>
                  <FormattedMessage id={"manage-handbook.image"} />
                </th>
                <th>
                  <FormattedMessage id={"manage-handbook.action"} />
                </th>
              </tr>

              {arrHandbooks &&
                arrHandbooks.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.title}
                        </a>
                      </td>
                      <td>{item.category}</td>
                      <td>{item.sapo}</td>
                      <td>
                        <img
                          src={item.image}
                          style={{ height: "100px", width: "160px" }}
                        />
                      </td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditHandbook(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteHandbook(item)}
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandbookManage);
