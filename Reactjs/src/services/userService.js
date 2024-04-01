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

const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};

const getAllSpecialty = () => {
  return axios.get(`/api/get-all-specialty`);
};

const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const getAllSpecialties = () => {
  return axios.get(`/api/get-all-specialty`);
};

const createNewSpecialtyService = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const deleteSpecialtyService = (specialtyId) => {
  return axios.delete("/api/delete-specialty", {
    data: { id: specialtyId },
  });
};

const editSpecialtyService = (inputData) => {
  return axios.put("/api/edit-specialty", inputData);
};

const createNewClinic = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};

const createNewClinicService = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};

const getAllClinic = () => {
  return axios.get(`/api/get-all-clinic`);
};

const getAllClinics = () => {
  return axios.get(`/api/get-all-clinic`);
};

const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const editClinicService = (inputData) => {
  return axios.put("/api/edit-clinic", inputData);
};

const deleteClinicService = (clinicId) => {
  return axios.delete("/api/delete-clinic", {
    data: { id: clinicId },
  });
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const postSendRemedy = (data) => {
  return axios.post(`/api/send-remedy`, data);
};

const crawlNewHandbook = (data) => {
  return axios.post(`/api/crawl-new-handbook`);
};
const getAllHandbooks = (data) => {
  return axios.get(`/api/get-all-handbook`);
};
const getAllHandbook = (data) => {
  return axios.get(`/api/get-all-handbook`);
};

const deleteHandbookService = (handbookId) => {
  return axios.delete("/api/delete-handbook-by-id", {
    data: { id: handbookId },
  });
};
const editHandbookService = (inputData) => {
  return axios.put("/api/edit-handbook", inputData);
};

const getAllDetailHandbookById = (data) => {
  return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`);
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
  createNewSpecialty,
  getAllSpecialty,
  getAllDetailSpecialtyById,
  createNewClinic,
  createNewClinicService,
  getAllClinic,
  getAllClinics,
  getAllDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
  getAllHandbooks,
  getAllHandbook,
  crawlNewHandbook,
  deleteHandbookService,
  editHandbookService,
  getAllDetailHandbookById,
  createNewSpecialtyService,
  deleteSpecialtyService,
  editSpecialtyService,
  getAllSpecialties,
  editClinicService,
  deleteClinicService,
};
