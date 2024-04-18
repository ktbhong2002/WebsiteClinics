import patientService from "../services/patientService";

let postBookAppointment = async (req, res) => {
  try {
    let infor = await patientService.postBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

let postVerifyBookAppointment = async (req, res) => {
  try {
    let infor = await patientService.postVerifyBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

let cancelBookAppointment = async (req, res) => {
  try {
    let infor = await patientService.cancelBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

let acceptBookAppointment = async (req, res) => {
  try {
    let infor = await patientService.acceptBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

let getBookAppointmentExpired = async (req, res) => {
  try {
    let infor = await patientService.getBookAppointmentExpired();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

const getSearch = async (req, res) => {
  try {
    let infor = await patientService.getSearch(req.query.text);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const bookingByChatBot = async (req, res) => {
  try {
    let infoBooking = await patientService.bookingByChatBot(req.body);
    console.log("infoBooking", infoBooking);
    return res.json(infoBooking);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
  cancelBookAppointment: cancelBookAppointment,
  getSearch: getSearch,
  getBookAppointmentExpired: getBookAppointmentExpired,
  acceptBookAppointment: acceptBookAppointment,
  bookingByChatBot: bookingByChatBot,
};
