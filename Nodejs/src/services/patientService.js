import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import axios from "axios";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.address ||
        !data.phoneNumber ||
        !data.reason ||
        !data.selectedGender
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          reason: data.reason,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });

        let [user, created] = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            roleId: `R3`,
            gender: data.selectedGender,
            address: data.address,
            firstName: data.fullName,
            phoneNumber: data.phoneNumber,
            reason: data.reason,
          },
        });

        if (!created) {
          // Nếu người dùng đã tồn tại, cập nhật thông tin
          await db.User.update(
            {
              roleId: `R3`,
              gender: data.selectedGender,
              address: data.address,
              firstName: data.fullName,
              phoneNumber: data.phoneNumber,
              reason: data.reason,
            },
            {
              where: { email: data.email },
            }
          );
        }

        // Tạo bản ghi Booking
        await db.Booking.create({
          statusId: "S1",
          doctorId: data.doctorId,
          patientId: user.id, // Sử dụng user.id thay vì user[0].id nếu có
          date: data.date,
          timeType: data.timeType,
          reason: data.reason,
          token: token,
        });

        resolve({
          errCode: 0,
          errMessage: "Save successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Appointment booked successfully!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "The appointment has been activated or does not exist!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let cancelBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            id: data.id,
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S4";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Cancel Appointment booked successfully!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "The appointment has been activated or does not exist!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let acceptBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            id: data.id,
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S3";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Accept Appointment booked successfully!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "The appointment has been activated or does not exist!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getBookAppointmentExpired = () => {
  const twelveHoursAgo = new Date();
  twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 12);

  return new Promise(async (resolve, reject) => {
    try {
      let appointments = await db.Booking.findAll({
        where: {
          statusId: "S1",
          createdAt: {
            [Op.lt]: twelveHoursAgo,
          },
        },
        raw: true,
      });

      // Cập nhật statusId thành "S4" cho tất cả các bản ghi tìm thấy
      await Promise.all(
        appointments.map(async (appointment) => {
          await db.Booking.update(
            { statusId: "S4" },
            {
              where: {
                id: appointment.id,
              },
            }
          );
        })
      );

      resolve(appointments); // Trả về danh sách các bản ghi đã cập nhật
    } catch (error) {
      reject(error); // Xử lý trường hợp truy vấn thất bại
    }
  });
};

function formatDate(dateTime) {
  const dateObj = new Date(dateTime);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

function formatTime(dateTime) {
  const timeObj = new Date(dateTime);
  const hour = timeObj.getHours().toString().padStart(2, "0");
  const minute = timeObj.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hour}:${minute}`;
  return formattedTime;
}

function convertDateToEpoch(dateString) {
  // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
  const parts = dateString.split("-");
  const year = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10) - 1; // Trừ 1 vì tháng bắt đầu từ 0
  const day = parseInt(parts[0], 10);
  const dateObj = new Date(year, month, day);

  // Lấy thời gian Epoch từ đối tượng Date
  const epochTime = dateObj.getTime();
  return epochTime;
}

function formatTimeType(time) {
  const timeObj = new Date(time);
  const hour = timeObj.getHours().toString().padStart(2, "0");
  switch (hour) {
    case 8:
      return "T1";
    case 9:
      return "T2";
    case 10:
      return "T3";
    case 11:
      return "T4";
    case 12:
      return "T4";
    case 13:
      return "T5";
    case 14:
      return "T6";
    case 15:
      return "T7";
    case 16:
      return "T8";
    default:
      return "T8";
  }
}

const bookingByChatBot = async (req, res) => {
  console.log(req);
  if (
    req.queryResult.parameters.time !== "" &&
    req.queryResult.parameters.clinic == "" &&
    req.queryResult.intent.displayName == "iDaTungKham"
  ) {
    try {
      const getListClinic = await axios.get(
        "http://localhost:8080/api/get-all-clinic"
      );
      const listClinic = getListClinic.data.data;
      const clinicMessages = listClinic
        .map((clinic) => `${clinic.id}. ${clinic.name}`)
        .join("\n");
      const customPayload = {
        fulfillment_messages: [
          {
            text: {
              text: [
                "Lựa chọn 1 cơ sở khám bệnh dưới đây:",
                clinicMessages,
                "⚠️ Nhập mã số ID tương ứng với bệnh viện đến khám",
              ],
            },
          },
        ],
      };
      return customPayload;
    } catch (error) {
      console.error("Đã xảy ra lỗi khi xử lý dữ liệu:", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  if (
    req.queryResult.parameters.clinic !== "" &&
    req.queryResult.parameters.confirm == "" &&
    req.queryResult.intent.displayName == "iDaTungKham"
  ) {
    const parameters = req.queryResult.parameters;
    const name = parameters.name;
    const phone = parameters.phone;
    const email = parameters.email;
    const reason = parameters.reason;
    const clinic = parameters.clinic;
    const date = formatDate(parameters.date);
    const time = formatTime(parameters.time);
    const token = uuidv4();

    await emailService.sendSimpleEmail({
      reciverEmail: email,
      patientName: name,
      time: `${time} ngày ${date}`,
      doctorName: "Hệ thống BookingCare",
      language: "vi",
      reason: reason,
      redirectLink: buildUrlEmail(1, token),
    });

    let [user, created] = await db.User.findOrCreate({
      where: { email: email },
      defaults: {
        roleId: `R3`,
        gender: "O",
        address: null,
        firstName: name,
        phoneNumber: phone,
        reason: reason,
      },
    });

    if (!created) {
      // Nếu người dùng đã tồn tại, cập nhật thông tin
      await db.User.update(
        {
          roleId: `R3`,
          gender: `O`,
          address: null,
          firstName: name,
          phoneNumber: phone,
          reason: reason,
        },
        {
          where: { email: email },
        }
      );
    }

    await db.Booking.create({
      statusId: "S1",
      doctorId: 1,
      patientId: user.id, // Sử dụng user.id thay vì user[0].id nếu có
      date: convertDateToEpoch(date),
      timeType: formatTimeType(time),
      reason: reason,
      token: token,
    });

    const confirm = `BookingCare xin phép xác nhận lại thông tin đăng ký của anh chị như sau:
        Họ và tên: ${name}
        Số điện thoại: ${phone}
        Email: ${email}
        Triệu chứng gặp phải: ${reason}
        Cơ sở khám: ${clinic}
        Ngày khám: ${date}
        Giờ khám: ${time}`;

    const customPayload = {
      fulfillment_messages: [
        {
          text: {
            text: [
              confirm,
              "Vui lòng kiểm tra email bạn đã đăng kí và xác nhận để hoàn tất thủ tục đặt lịch trên hệ thống của chúng tôi. Xin cảm ơn!",
            ],
          },
        },
      ],
    };
    return customPayload;
  } else {
    // console.log("chưa đặt xong");
  }
};

const getSearch = (text) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!text) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let result = {};
        let doctors = await db.User.findAll({
          where: {
            [Op.or]: [
              { firstName: { [Op.like]: `%${text}%` } },
              { lastName: { [Op.like]: `%${text}%` } },
            ],
            roleId: "R2",
          },
          attributes: ["id", "firstName", "lastName", "roleId"],
          raw: true,
        });
        // doctors = doctors.filter(item => item.roleId === 'R2')
        let clinics = await db.Clinic.findAll({
          where: {
            name: { [Op.like]: `%${text}%` },
          },
          attributes: ["id", "name"],
          raw: true,
        });
        let specialtys = await db.Specialty.findAll({
          where: {
            name: { [Op.like]: `%${text}%` },
          },
          attributes: ["id", "name"],
          raw: true,
        });
        let medicalPackages = await db.Medical_Package.findAll({
          where: {
            name: { [Op.like]: `%${text}%` },
          },
          attributes: ["id", "name"],
          raw: true,
        });

        result.specialty = specialtys;
        result.doctors = doctors;
        result.clinics = clinics;
        result.medicalPackages = medicalPackages;
        resolve({
          errCode: 0,
          errMessage: "OK",
          result,
        });

        // let appointment = await db.Clinic.findAll({
        //   where: {
        //     doctorId: data.doctorId,
        //     token: data.token,
        //     statusId: "S1",
        //   },
        //   raw: false,
        // })

        // if (appointment) {
        //   appointment.statusId = "S2"
        //   await appointment.save()

        // } else {
        //   resolve({
        //     errCode: 2,
        //     errMessage: "Appointment has been activeted or does not exist!",
        //   })
        // }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
  cancelBookAppointment: cancelBookAppointment,
  acceptBookAppointment: acceptBookAppointment,
  getSearch: getSearch,
  getBookAppointmentExpired: getBookAppointmentExpired,
  bookingByChatBot: bookingByChatBot,
};
