import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
import emailService from "../services/emailService";
import moment from "moment";
const { Op } = require("sequelize");

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: `R2` },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: [`password`],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Doctor_Infor,
            attributes: {
              exclude: [`id`, `doctorId`],
            },
            include: {
              model: db.Specialty,
              attributes: {
                exclude: [
                  `id`,
                  `doctorId`,
                  `descriptionMarkdown`,
                  `descriptionHTML`,
                  `image`,
                ],
              },
            },
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: `R2` },
        attributes: {
          exclude: [`password`],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
          // {
          //   model: db.Specialty,
          //   // as: "specialtyData",
          // },
        ],
        raw: true,
        nest: true,
      });
      if (doctors && doctors.length > 0) {
        doctors.forEach((doctor) => {
          if (doctor.image) {
            doctor.image = new Buffer.from(doctor.image, "base64").toString(
              "binary"
            );
          }
        });
      }
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let checkRequiredFields = (inputData) => {
  let arrFields = [
    "doctorId",
    "contentHTML",
    "contentMarkdown",
    "action",
    "selectedPrice",
    "selectedPayment",
    "selectedProvince",
    "nameClinic",
    "addressClinic",
    "note",
    "specialtyId",
  ];
  let isVailid = true;
  let element = "";
  for (let i = 0; i < arrFields.length; i++) {
    if (!inputData[arrFields[i]]) {
      isVailid = false;
      element = arrFields[i];
      break;
    }
  }
  return {
    isVailid: isVailid,
    element: element,
  };
};

let saveDetailInforDoctor = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkObj = checkRequiredFields(inputData);
      if (checkObj.isVailid === false) {
        resolve({
          errCode: 1,
          errMessage: `Missing parameter: ${checkObj.element}`,
        });
      } else {
        //update insert markdown table
        if (inputData.action === `CREATE`) {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            doctorId: inputData.doctorId,
          });
        }
        if (inputData.action === `EDIT`) {
          let doctorMarkdown = await db.Markdown.findOne({
            where: { doctorId: inputData.doctorId },
            raw: false,
          });
          if (doctorMarkdown) {
            doctorMarkdown.contentHTML = inputData.contentHTML;
            doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
            doctorMarkdown.description = inputData.description;
            await doctorMarkdown.save();
          }
        }

        //update insert doctor-infor table
        let doctorInfor = await db.Doctor_Infor.findOne({
          where: {
            doctorId: inputData.doctorId,
          },
          raw: false,
        });
        if (doctorInfor) {
          //update
          doctorInfor.doctorId = inputData.doctorId;
          doctorInfor.priceId = inputData.selectedPrice;
          doctorInfor.paymentId = inputData.selectedPayment;
          doctorInfor.provinceId = inputData.selectedProvince;
          doctorInfor.nameClinic = inputData.nameClinic;
          doctorInfor.addressClinic = inputData.addressClinic;
          doctorInfor.note = inputData.note;
          doctorInfor.specialtyId = inputData.specialtyId;
          doctorInfor.clinicId = inputData.clinicId;
          await doctorInfor.save();
        } else {
          //create
          await db.Doctor_Infor.create({
            doctorId: inputData.doctorId,
            priceId: inputData.selectedPrice,
            paymentId: inputData.selectedPayment,
            provinceId: inputData.selectedProvince,
            nameClinic: inputData.nameClinic,
            addressClinic: inputData.addressClinic,
            note: inputData.note,
            specialtyId: inputData.specialtyId,
            clinicId: inputData.clinicId,
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Save information doctor successfly",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: {
            exclude: [`password`],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Infor,
              attributes: {
                exclude: [`id`, `doctorId`],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer.from(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const bulkCreateSchedule = async (data) => {
  try {
    // Kiểm tra các thông tin cần thiết
    if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
      return {
        errCode: 1,
        errMessage: "Missing required parameter!",
      };
    }

    // Thiết lập maxNumber cho mỗi mục trong arrSchedule
    const schedule = data.arrSchedule.map((item) => ({
      ...item,
      maxNumber: MAX_NUMBER_SCHEDULE,
      doctorId: data.doctorId, // Thêm doctorId vào mỗi mục
    }));

    // Truy vấn các lịch hẹn hiện có
    const existing = await db.Schedule.findAll({
      where: { doctorId: data.doctorId, date: data.formatedDate },
      attributes: ["timeType", "date", "doctorId", "maxNumber"],
      raw: true,
    });

    // So sánh và tạo danh sách lịch hẹn mới
    const toCreate = schedule.filter((newSchedule) => {
      return !existing.some((existingSchedule) => {
        return (
          existingSchedule.timeType === newSchedule.timeType &&
          existingSchedule.doctorId === newSchedule.doctorId && // So sánh doctorId
          +existingSchedule.date === +newSchedule.date
        );
      });
    });

    // Tạo các mục lịch hẹn mới nếu cần thiết
    if (toCreate.length > 0) {
      await db.Schedule.bulkCreate(toCreate);
    }

    return {
      errCode: 0,
      errMessage: "OK",
    };
  } catch (error) {
    // Xử lý lỗi và trả về thông báo lỗi
    return {
      errCode: 2,
      errMessage: "Failed to create schedule: " + error.message,
    };
  }
};

let getScheduleByDate = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!dataSchedule) dataSchedule = [];
        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllScheduleToday = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const today = new Date();
      today.setHours(7, 0, 0, 0);
      const epochTimeToday = today.getTime();
      const dataAllScheduleToday = await db.Schedule.findAll({
        where: {
          date: {
            [Op.gte]: epochTimeToday,
          },
        },
        include: [
          {
            model: db.Allcode,
            as: "timeTypeData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.User,
            as: "doctorData",
            attributes: ["firstName", "lastName", "email", "phoneNumber", "id"],
            include: [
              {
                model: db.Doctor_Infor,
                attributes: {
                  exclude: [`id`, `doctorId`],
                },
                include: [
                  {
                    model: db.Allcode,
                    as: "priceTypeData",
                    attributes: ["valueEn", "valueVi"],
                  },
                  {
                    model: db.Allcode,
                    as: "paymentTypeData",
                    attributes: ["valueEn", "valueVi"],
                  },
                  {
                    model: db.Allcode,
                    as: "provinceTypeData",
                    attributes: ["valueEn", "valueVi"],
                  },
                ],
              },
            ],
          },
        ],
        raw: false,
        nest: true,
      });

      const dataSchedule = dataAllScheduleToday || [];
      resolve({
        errCode: 0,
        data: dataSchedule,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getExtraInforDoctorById = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Doctor_Infor.findOne({
          where: {
            doctorId: idInput,
          },
          attributes: {
            exclude: [`id`, `doctorId`],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!data) data = {};

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getProfileDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: {
            exclude: [`password`],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Infor,
              attributes: {
                exclude: [`id`, `doctorId`],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer.from(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getListPatientForDoctor = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            statusId: "S2",
            doctorId: doctorId,
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: ["email", "firstName", "address", "gender"],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueVi", "valueEn"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataPatient",
              attributes: ["valueVi", "valueEn"],
            },
          ],
          raw: false,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getListPatientsForDoctor = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            doctorId: doctorId,
          },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: [
                "email",
                "firstName",
                "address",
                "gender",
                "phoneNumber",
              ],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueVi", "valueEn"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataPatient",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.Allcode,
              as: "statusDataPatient",
              attributes: ["valueVi", "valueEn"],
            },
          ],
          raw: false,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let sendRemedy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.email || !data.patientId || !data.timeType) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        //update patient status
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            patientId: data.patientId,
            timeType: data.timeType,
            statusId: "S2",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S3";
          await appointment.save();
        }

        //send email remedy
        await emailService.sendAttachment(data);
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  saveDetailInforDoctor: saveDetailInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDoctorById: getExtraInforDoctorById,
  getProfileDoctorById: getProfileDoctorById,
  getListPatientForDoctor: getListPatientForDoctor,
  getListPatientsForDoctor: getListPatientsForDoctor,
  sendRemedy: sendRemedy,
  getAllScheduleToday: getAllScheduleToday,
};
