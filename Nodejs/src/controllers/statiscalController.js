import statiscalService from "../services/statiscalService";

let handleGetCountHandbook = async (req, res) => {
  try {
    let data = await statiscalService.getCountHandbook();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error getting count of handbook:", error);
    return res.status(500).json({
      errCode: 500,
      errMessage: "Internal server error",
    });
  }
};

let handleGetCountDoctor = async (req, res) => {
  try {
    let data = await statiscalService.getCountDoctor();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error getting count of doctor:", error);
    return res.status(500).json({
      errCode: 500,
      errMessage: "Internal server error",
    });
  }
};
let handleGetCountSpecialty = async (req, res) => {
  try {
    let data = await statiscalService.getCountSpecialty();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error getting count of Specialty:", error);
    return res.status(500).json({
      errCode: 500,
      errMessage: "Internal server error",
    });
  }
};
let handleGetCountPatient = async (req, res) => {
  try {
    let data = await statiscalService.getCountPatient();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error getting count of patient:", error);
    return res.status(500).json({
      errCode: 500,
      errMessage: "Internal server error",
    });
  }
};
let handleGetCountUser = async (req, res) => {
  try {
    let data = await statiscalService.getCountUser();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error getting count of user:", error);
    return res.status(500).json({
      errCode: 500,
      errMessage: "Internal server error",
    });
  }
};
let handleGetCountClinic = async (req, res) => {
  try {
    let data = await statiscalService.getCountClinic();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error getting count of clinic:", error);
    return res.status(500).json({
      errCode: 500,
      errMessage: "Internal server error",
    });
  }
};

let handlePostOfDay = async (req, res) => {
  try {
    let data = await statiscalService.postOfDay();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({
      errCode: 500,
      errMessage: "Internal server error",
    });
  }
};
let handlePostOfWeek = async (req, res) => {
  try {
    let data = await statiscalService.postOfWeek();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({
      errCode: 500,
      errMessage: "Internal server error",
    });
  }
};

let handleNewsByMonth = async (req, res) => {
  try {
    const month = req.query.month; // Nhận tham số month từ request
    let data = await statiscalService.newsByMonth(month); // Truyền tham số month vào hàm newsByMonth
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({
      errCode: 500,
      errMessage: "Internal server error",
    });
  }
};

let handleNewsByCategory = async (req, res) => {
  try {
    let data = await statiscalService.newsByCategory(); // Truyền tham số month vào hàm newsByMonth
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({
      errCode: 500,
      errMessage: "Internal server error",
    });
  }
};
let handleDoctorAppointmentSchedule = async (req, res) => {
  try {
    let data = await statiscalService.doctorAppointmentSchedule(); // Truyền tham số month vào hàm newsByMonth
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({
      errCode: 500,
      errMessage: "Internal server error",
    });
  }
};

// let handleGetCountHandbookofMonth = async (req, res) => {
//   try {
//     const { monthA } = req.body;
//     console.log(monthA);
//     let data = await statiscalService.getCountHandbookofMonth(monthA);
//     return res.status(200).json(data);
//   } catch (error) {
//     console.error("Error ", error);
//     return res.status(500).json({
//       errCode: 500,
//       errMessage: "Internal server error",
//     });
//   }
// };

module.exports = {
  handleGetCountHandbook: handleGetCountHandbook,
  handleGetCountDoctor: handleGetCountDoctor,
  handleGetCountSpecialty: handleGetCountSpecialty,
  handleGetCountClinic: handleGetCountClinic,
  handleGetCountPatient: handleGetCountPatient,
  handleGetCountUser: handleGetCountUser,
  handlePostOfDay: handlePostOfDay,
  handlePostOfWeek: handlePostOfWeek,
  handleNewsByMonth: handleNewsByMonth,
  handleNewsByCategory: handleNewsByCategory,
  handleDoctorAppointmentSchedule: handleDoctorAppointmentSchedule,
  //   handleGetCountHandbookofMonth: handleGetCountHandbookofMonth,
};
