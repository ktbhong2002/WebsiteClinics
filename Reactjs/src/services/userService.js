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

const getAllPatientsForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patients-for-doctor?doctorId=${data.doctorId}`
  );
};

const cancelBookAppointment = (data) => {
  return axios.post(`/api/cancel-book-appointment`, data);
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
const searchHandbookAction = (textSearch) => {
  return axios.get(`/api/search-handbook`, { params: textSearch });
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

const getPostOfCategory = () => {
  return axios.get(`/api/statiscal/post-of-category`);
};

const getAllMedicalPackage = () => {
  return axios.get(`/api/get-all-medical-package`);
};

const getDetailMedicalPackageById = (inputId) => {
  return axios.get(`/api/get-detail-medical-package?id=${inputId}`);
};

//admin
const getWeeklyRevenue = () => {
  return axios.get(`/api/get-weekly-revenue`);
};

const getTotalNewUserDay = () => {
  return axios.get(`/api/get-total-new-user-day`);
};

const getTotalHealthAppointmentDone = () => {
  return axios.get(`/api/get-total-health-appointment-done`);
};

const getTotalDoctors = () => {
  return axios.get(`/api/get-total-doctor`);
};

const getTopThreeDoctorOfTheYear = () => {
  return axios.get(`/api/get-top-three-doctors-of-the-year`);
};

const getTopFourVipPatient = () => {
  return axios.get(`/api/get-top-four-vip-patient`);
};

const getMonthlyRevenueSpecialty = () => {
  return axios.get(`/api/get-monthly-revenue-specialty`);
};

const getHandleLoginGoogle = (data) => {
  return axios.post(`/api/login-google`, data);
};

const filterHistoriesPatient = (data) => {
  return axios.post(`/api/filter-history`, data);
};

const filterUsers = (data) => {
  return axios.post(`/api/filter-users`, data);
};

const editPassword = (data) => {
  return axios.post(`/api/edit-password-user`, data);
};

const filterRestoreUsers = (data) => {
  return axios.post(`/api/filter-restore-users`, data);
};

const handleRestoreUser = (data) => {
  return axios.post(`/api/handle-restore-user`, data);
};

const deleteRestoreUser = (data) => {
  return axios.post(`/api/delete-restore-user`, data);
};
const getBookingById = (bookingId) => {
  return axios.get(`/api/get-booking-by-id?bookingId=${bookingId}`);
};

const saveDetailDoctor = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getAllSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
const postUserForgotPassword = (data) => {
  return axios.post("/api/user-forgot-password", data);
};

const postVerifyRetrievePassword = (data) => {
  return axios.post("/api/verify-retrieve-password", data);
};

const cancelBooking = (data) => {
  return axios.post("/api/cancel-booking", data);
};

const postCreateRemedy = (data) => {
  return axios.post("/api/create-remedy", data);
};

const getAllMedicalPackages = (data) => {
  return axios.get("/api/get-all-medical-package", data);
};

const deleteMedicalPackageService = (medicalPackageId) => {
  console.log(medicalPackageId);
  return axios.delete("/api/delete-medical-package", {
    data: { id: medicalPackageId },
  });
};

const createNewMedicalPackageService = (data) => {
  return axios.post("/api/save-infor-medical-packages", data);
};

const getDetailInforMedicalPackage = (inputId) => {
  return axios.get(`/api/get-detail-medical-package?id=${inputId}`);
};
const search = (text) => {
  return axios.get(`/api/search?text=${text}`);
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
  getAllPatientsForDoctor,
  postSendRemedy,
  getAllHandbooks,
  getAllHandbook,
  crawlNewHandbook,
  searchHandbookAction,
  deleteHandbookService,
  editHandbookService,
  getAllDetailHandbookById,
  createNewSpecialtyService,
  deleteSpecialtyService,
  editSpecialtyService,
  getAllSpecialties,
  editClinicService,
  deleteClinicService,
  getPostOfCategory,
  getAllMedicalPackage,
  getDetailMedicalPackageById,
  getWeeklyRevenue,
  getTotalNewUserDay,
  getTotalHealthAppointmentDone,
  getTopThreeDoctorOfTheYear,
  getHandleLoginGoogle,
  getBookingById,
  filterHistoriesPatient,
  filterUsers,
  editPassword,
  filterRestoreUsers,
  handleRestoreUser,
  deleteRestoreUser,
  getMonthlyRevenueSpecialty,
  getTopFourVipPatient,
  getTotalDoctors,
  saveDetailDoctor,
  saveBulkScheduleDoctor,
  getExtraInforDoctorById,
  getAllSpecialtyById,
  postUserForgotPassword,
  postVerifyRetrievePassword,
  cancelBooking,
  postCreateRemedy,
  getAllMedicalPackages,
  deleteMedicalPackageService,
  getDetailInforMedicalPackage,
  createNewMedicalPackageService,
  search,
  cancelBookAppointment,
};
