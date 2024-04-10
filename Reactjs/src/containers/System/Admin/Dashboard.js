import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import LoadingOverLay from "react-loading-overlay";
import ReactTable from "react-table-6";
import "react-table-v6/react-table.css";
import moment from "moment";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      postOfCategory: [],
      dataDoctorAppointmentSchedule: [],
      countDoctor: [],
      countHandbook: [],
      countClinic: [],
      countPatient: [],
      countSpecialty: [],
      countUser: [],
      allScheduleToday: [],
    };
  }

  componentDidMount() {
    this.fetchData();
    this.fetchCountHandbook();
    this.fetchCountDoctor();
    this.fetchCountPatient();
    this.fetchCountSpecialty();
    this.fetchCountUser();
    this.fetchCountClinic();
    this.fetchDoctorAppointmentSchedule();
    this.fetchAllScheduleToday();
  }

  fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/statiscal/post-of-category"
      );
      this.setState({ postOfCategory: res.data.categoriesCount });
    } catch (e) {
      console.log(e);
    }
  };

  fetchCountHandbook = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/statiscal/get-count-handbook"
      );
      this.setState({ countHandbook: res.data });
    } catch (e) {
      console.log(e);
    }
  };
  fetchCountDoctor = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/statiscal/get-count-doctor"
      );
      this.setState({ countDoctor: res.data });
    } catch (e) {
      console.log(e);
    }
  };
  fetchCountSpecialty = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/statiscal/get-count-specialty"
      );
      this.setState({ countSpecialty: res.data });
    } catch (e) {
      console.log(e);
    }
  };
  fetchCountPatient = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/statiscal/get-count-patient"
      );
      this.setState({ countPatient: res.data });
    } catch (e) {
      console.log(e);
    }
  };
  fetchCountUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/statiscal/get-count-user"
      );
      this.setState({ countUser: res.data });
    } catch (e) {
      console.log(e);
    }
  };
  fetchCountClinic = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/statiscal/get-count-clinic"
      );
      this.setState({ countClinic: res.data });
    } catch (e) {
      console.log(e);
    }
  };
  fetchDoctorAppointmentSchedule = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/statiscal/doctor-appointment-schedule"
      );
      this.setState({ dataDoctorAppointmentSchedule: res.data.data });
    } catch (e) {
      console.log(e);
    }
  };
  fetchAllScheduleToday = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/get-all-schedule-today"
      );
      this.setState({ allScheduleToday: res.data.data });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { postOfCategory, dataDoctorAppointmentSchedule, allScheduleToday } =
      this.state;
    const labels = postOfCategory.map((item) => item.category);
    const counts = postOfCategory.map((item) => item.count);
    const numberDoctorAppointmentSchedule =
      dataDoctorAppointmentSchedule.length;
    const numberScheduleToday = allScheduleToday.length;
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Số lượng",
          data: counts,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    const {
      countDoctor,
      countClinic,
      countHandbook,
      countPatient,
      countSpecialty,
    } = this.state;

    const styles = {
      container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        padding: 20,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: 200,
        height: 150,
        margin: 30,
      },
      iconContainer: {
        flex: "0 0 auto",
        marginRight: 20,
      },
      icon: {
        width: 60,
        height: 60,
      },
      textContainer: {
        flex: "1 1 auto",
        textAlign: "center",
      },
      count: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 5,
      },
      label: {
        fontSize: 16,
        color: "#666",
      },
    };
    const backgroundColors = [
      "#f5f5f5",
      "#f0f0f0",
      "#e5e5e5",
      "#dddddd",
      "#cccccc",
    ];

    // Chuẩn bị đối tượng để gộp dữ liệu
    const mergedRows = {};

    // Duyệt qua mảng dữ liệu allScheduleToday để gộp các hàng
    allScheduleToday.forEach((row) => {
      const doctorId = row.doctorId;
      if (!mergedRows[doctorId]) {
        // Nếu chưa có dữ liệu cho doctorId này, thêm vào đối tượng mergedRows
        mergedRows[doctorId] = { ...row }; // Copy dữ liệu từ hàng đầu tiên
      } else {
        // Nếu đã có dữ liệu cho doctorId này, gộp các trường dữ liệu cần thiết
        mergedRows[
          doctorId
        ].timeTypeData.valueVi += `, ${row.timeTypeData.valueVi}`;
        // Các trường dữ liệu khác có thể được gộp tùy thuộc vào yêu cầu cụ thể của bạn
      }
    });

    // Chuyển đổi đối tượng mergedRows thành mảng để sử dụng trong ReactTable
    const mergedData = Object.values(mergedRows);

    return (
      <div className="col-12">
        <div className="row justify-content-center">
          {[
            {
              count: countClinic.count,
              label: "Phòng khám",
              icon: "https://cdn.iconscout.com/icon/free/png-256/free-clinic-1450835-1226364.png",
            },
            {
              count: countSpecialty.count,
              label: "Chuyên khoa",
              icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4V7Z_-xb5DnAMMUWLqF0pasu1Mt47ErjUPDXtIyTsdKgjLWZXpRpUK6CZNT48nng-lU&usqp=CAU",
            },
            {
              count: countDoctor.count,
              label: "Bác sĩ",
              icon: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
            },
            {
              count: countPatient.count,
              label: "Bệnh nhân",
              icon: "https://cdn.icon-icons.com/icons2/2265/PNG/512/crowd_patient_patients_icon_140420.png",
            },
            {
              count: countHandbook.count,
              label: "Bài viết",
              icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Circle-icons-news.svg/1200px-Circle-icons-news.svg.png",
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.container,
                backgroundColor:
                  backgroundColors[index % backgroundColors.length],
              }}
            >
              <div style={styles.iconContainer}>
                <img src={item.icon} alt="Dashboard Icon" style={styles.icon} />
              </div>
              <div style={styles.textContainer}>
                <div style={styles.count}>{item.count}</div>
                <div style={styles.label}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-5">
            <div
              className="row justify-content-center"
              style={{ marginLeft: "35px" }}
            >
              <div style={styles.container}>
                <div style={styles.iconContainer}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbMerzGYEhcuCpDKMZw9u8rP-tp7beeYxRytY_wpkkFQ&s"
                    alt="Icon"
                    style={styles.icon}
                  />
                  <div style={styles.textContainer}>
                    <div style={styles.count}>
                      {numberDoctorAppointmentSchedule}
                    </div>
                    <div style={styles.label}>Lịch khám hôm nay</div>
                  </div>
                </div>
              </div>
              <div style={styles.container}>
                <div style={styles.iconContainer}>
                  <img
                    src="https://oxanh.vn/Data/upload/images/Page/danh-muc-benh.svg"
                    alt="Icon"
                    style={styles.icon}
                  />
                  <div style={styles.textContainer}>
                    <div style={styles.count}>{numberScheduleToday}</div>
                    <div style={styles.label}>Lịch bác sĩ đăng kí làm việc</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6"></div>
          <div className="col-3"></div>
          <div className="col-6" style={{}}>
            <h3>Thống kê số lượng bài viết theo thể loại</h3>
            <Bar data={data} />
          </div>
        </div>

        <div className="col-12" style={{ padding: "20px" }}>
          <center>
            <h3>Lịch khám hôm nay</h3>
          </center>
          <ReactTable
            data={dataDoctorAppointmentSchedule}
            columns={[
              //   {
              //     Header: "STT",
              //     accessor: (row, index) => index + 1,
              //   },
              {
                Header: "Thông tin bệnh nhân",
                accessor: "patientData.firstName",
                filterable: true,
                Cell: (row) => <div>{row.value}</div>,
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
                Cell: (row) => (row.value ? row.value : "No email available"),
              },
              {
                Header: "Địa chỉ",
                accessor: "patientData.address",
                filterable: true,
                Cell: (row) => (row.value ? row.value : "No address available"),
              },
              {
                Header: "Thời gian đặt",
                accessor: "createdAt",
                filterable: true,
                Cell: (row) => (
                  <div>
                    {moment(row.original.createdAt).format("HH:mm DD/MM/YYYY")}
                  </div>
                ),
              },
              {
                Header: "Giờ khám",
                accessor: "timeTypeDataPatient.valueVi",
                filterable: true,
                Cell: (row) => <div>{row.value}</div>,
              },
              {
                Header: "Ngày khám",
                accessor: "date",
                filterable: true,
                Cell: (row) => (
                  <div>{moment(parseInt(row.value)).format("DD/MM/YYYY")}</div>
                ),
              },
              {
                Header: "Bác sĩ khám",
                accessor: (row) =>
                  `${row.doctorData.lastName} ${row.doctorData.firstName} `,
                id: "doctorName", // Thêm id cho cột
                filterable: true,
                Cell: (row) => <div>{row.value}</div>,
              },
              {
                Header: "Cơ sở khám",
                accessor: "doctorData.Doctor_Infor.nameClinic",
                filterable: true,
                Cell: (row) => <div>{row.value}</div>,
              },
              {
                Header: "Trạng thái",
                accessor: "statusDataPatient.valueVi",
                filterable: true,
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

        <div className="col-12" style={{ padding: "20px" }}>
          <center>
            <h3>Lịch đăng kí làm việc ngày hôm nay của bác sĩ</h3>
          </center>

          <ReactTable
            data={mergedData}
            columns={[
              {
                Header: "ID",
                accessor: "doctorId",
                id: "doctorId",
                filterable: true,
                Cell: (row) => <div>{row.value}</div>,
                style: { textAlign: "center", width: "10px" },
              },
              {
                Header: "Tên bác sĩ",
                accessor: (row) =>
                  `${row.doctorData.lastName} ${row.doctorData.firstName} `,
                id: "doctorName",
                filterable: true,
                Cell: (row) => <div>{row.value}</div>,
                style: { width: "150px" },
              },
              {
                Header: "Cơ sở khám",
                accessor: "doctorData.Doctor_Infor.nameClinic",
                filterable: true,
                Cell: (row) => <div>{row.value}</div>,
                style: { width: "200px" },
              },
              {
                Header: "Ca làm việc",
                accessor: "timeTypeData.valueVi",
                filterable: true,
                style: { textAlign: "center", width: "200px" },
                Cell: (row) => <div>{row.value}</div>,
                aggregate: (vals) => vals.join(", "), // Gộp dữ liệu từ cột "Ca làm việc"
              },
              {
                Header: "Ngày đăng kí",
                accessor: "createdAt",
                filterable: true,
                style: { textAlign: "center", width: "200px" },
                Cell: (row) => (
                  <div>
                    {moment(row.original.createdAt).format("HH:mm DD/MM/YYYY")}
                  </div>
                ),
              },
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
