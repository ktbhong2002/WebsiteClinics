import db from "../models/index";
import moment from "moment";
const { Op } = require("sequelize");

function getToday() {
  return new Date(moment(timedate).utc().startOf("day").toDate());
}

const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

const endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999);

function getEndDay() {
  return (endDay = new Date(moment(getToday()).utc().endOf("day").toDate()));
}

let getCountHandbook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.Handbook.count();
      resolve({
        errCode: 0,
        errMessage: "OK",
        count: count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getCountDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.User.count({
        where: {
          roleId: "R2", // Điều kiện roleId là R1
        },
      });
      resolve({
        errCode: 0,
        errMessage: "OK",
        count: count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getCountSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.Specialty.count();
      resolve({
        errCode: 0,
        errMessage: "OK",
        count: count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getCountPatient = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.User.count({
        where: {
          roleId: "R3", // Điều kiện roleId là R1
        },
      });
      resolve({
        errCode: 0,
        errMessage: "OK",
        count: count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getCountBooking = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.Booking.count();
      resolve({
        errCode: 0,
        errMessage: "OK",
        count: count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getCountUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.User.count();
      resolve({
        errCode: 0,
        errMessage: "OK",
        count: count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getCountClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.Clinic.count();
      resolve({
        errCode: 0,
        errMessage: "OK",
        count: count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getCountMedicalPackage = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.Medical_Package.count();
      resolve({
        errCode: 0,
        errMessage: "OK",
        count: count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let postOfDay = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set giờ, phút, giây, mili giây của ngày hiện tại về 0 để so sánh với updatedAt

      const count = await db.Handbook.count({
        where: {
          updatedAt: {
            [Op.gte]: today, // updatedAt lớn hơn hoặc bằng ngày hôm nay
          },
        },
      });

      resolve({
        errCode: 0,
        errMessage: "OK",
        count: count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const startOfWeek = moment().startOf("isoWeek").toDate();
const endOfWeek = moment().endOf("isoWeek").toDate();

let postOfWeek = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await db.Handbook.count({
        where: {
          updatedAt: {
            [Op.between]: [startOfWeek, endOfWeek], // updatedAt nằm trong khoảng thời gian của tuần
          },
        },
      });

      resolve({
        errCode: 0,
        errMessage: "OK",
        count: count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let newsByMonth = (month) => {
  return new Promise(async (resolve, reject) => {
    try {
      const startOfMonth = moment(month).startOf("month").toDate();
      const endOfMonth = moment(month).endOf("month").toDate();
      const count = await db.Handbook.count({
        where: {
          updatedAt: {
            [Op.between]: [startOfMonth, endOfMonth], // updatedAt nằm trong khoảng thời gian của tháng
          },
        },
      });
      resolve({
        errCode: 0,
        errMessage: "OK",
        count: count,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let newsByCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Sử dụng raw SQL query để nhóm và đếm số lượng bản ghi theo category
      const categoriesCount = await db.sequelize.query(
        "SELECT category, COUNT(*) AS count FROM handbooks GROUP BY category",
        { type: db.sequelize.QueryTypes.SELECT }
      );

      resolve({
        errCode: 0,
        errMessage: "OK",
        categoriesCount: categoriesCount,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// let getCountHandbookofMonth = async (month) => {
//   try {
//     // Chuyển thời gian sang UTC để tránh lỗi múi giờ
//     // const utcMonth = moment.utc(month, "YYYY-MM");
//     // console.log(utcMonth);

//     const utcMonth = `2024-${month}-01 00:00:00`;
//     const startMonth = moment
//       .utc(utcMonth)
//       .startOf("month")
//       .format("YYYY-MM-DD HH:mm:ss");
//     console.log(startMonth);

//     const endMonth = moment
//       .utc(utcMonth)
//       .endOf("month")
//       .format("YYYY-MM-DD HH:mm:ss");
//     console.log(endMonth);

//     let count = await db.Handbook.count({
//       where: {
//         updatedAt: {
//           [Op.between]: [startMonth, endMonth], // Điều kiện thời gian bắt đầu và kết thúc
//         },
//       },
//     });
//     return {
//       errCode: 0,
//       errMessage: "OK",
//       count: count,
//     };
//   } catch (error) {
//     return {
//       errCode: 500,
//       errMessage: "Internal server error",
//     };
//   }
// };

let doctorAppointmentSchedule = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set giờ, phút, giây, mili giây của ngày hiện tại về 0 để so sánh với updatedAt
      const epochTime = today.getTime();
      const doctorAppointmentSchedule = await db.Booking.findAll({
        where: {
          // updatedAt: {
          //   [Op.gte]: today,
          // },
          date: epochTime,
        },
        include: [
          {
            model: db.Allcode,
            as: "statusDataPatient",
            attributes: ["valueVi", "valueEn"],
          },
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
            model: db.User,
            as: "doctorData",
            attributes: ["email", "firstName", "address", "gender", "lastName"],
            include: [
              {
                model: db.Allcode,
                as: "genderData",
                attributes: ["valueVi", "valueEn"],
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
        errMessage: "OK",
        data: doctorAppointmentSchedule,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getCountHandbook: getCountHandbook,
  getCountDoctor: getCountDoctor,
  getCountSpecialty: getCountSpecialty,
  getCountPatient: getCountPatient,
  getCountUser: getCountUser,
  getCountClinic: getCountClinic,
  getCountBooking: getCountBooking,
  postOfDay: postOfDay,
  postOfWeek: postOfWeek,
  newsByMonth: newsByMonth,
  newsByCategory: newsByCategory,
  doctorAppointmentSchedule: doctorAppointmentSchedule,
  getCountMedicalPackage: getCountMedicalPackage,

  // getCountHandbookofMonth: getCountHandbookofMonth,
};
