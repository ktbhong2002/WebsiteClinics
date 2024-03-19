import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`); //, { id: inputId });
};

const createNewUserService = (data) => {
  return axios.post("/api/creatr-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: { id: userId },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};

const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheludeDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraDoctorInforById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheludeDoctor,
  getScheduleDoctorByDate,
  getExtraDoctorInforById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
};
