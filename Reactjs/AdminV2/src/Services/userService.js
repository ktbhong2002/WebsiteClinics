import axios from '../axios';

const handleLoginApi = (email, password) => axios.post('api/login', { email, password });

const getAllUsers = (inputId) => axios.get(`/api/get-all-users?id=${inputId}`); // , { id: inputId });
const createNewUserService = (data) => axios.post('/api/creatr-new-user', data);

const deleteUserService = (userId) =>
  axios.delete('/api/delete-user', {
    data: { id: userId },
  });

const editUserService = (inputData) => axios.put('/api/edit-user', inputData);

const getAllCodeService = (inputType) => axios.get(`/api/allcode?type=${inputType}`);

const getTopDoctorHomeService = (limit) => axios.get(`/api/top-doctor-home?limit=${limit}`);

const getAllDoctors = () => axios.get(`/api/get-all-doctors`);

const saveDetailDoctorService = (data) => axios.post('/api/save-infor-doctors', data);

const getDetailInforDoctor = (inputId) => axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);

const saveBulkScheludeDoctor = (data) => axios.post(`/api/bulk-create-schedule`, data);

const getScheduleDoctorByDate = (doctorId, date) =>
  axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);

const getExtraDoctorInforById = (doctorId) =>
  axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);

const getProfileDoctorById = (doctorId) =>
  axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);

const postPatientBookAppointment = (data) => axios.post(`/api/patient-book-appointment`, data);

const postVerifyBookAppointment = (data) => axios.post(`/api/verify-book-appointment`, data);

const createNewSpecialty = (data) => axios.post(`/api/create-new-specialty`, data);

const getAllSpecialty = () => axios.get(`/api/get-all-specialty`);

const getAllDetailSpecialtyById = (data) =>
  axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);

const getAllSpecialties = () => axios.get(`/api/get-all-specialty`);

const createNewSpecialtyService = (data) => axios.post('/api/create-new-specialty', data);

const deleteSpecialtyService = (specialtyId) =>
  axios.delete('/api/delete-specialty', {
    data: { id: specialtyId },
  });

const editSpecialtyService = (inputData) => axios.put('/api/edit-specialty', inputData);

const createNewClinic = (data) => axios.post(`/api/create-new-clinic`, data);

const createNewClinicService = (data) => axios.post(`/api/create-new-clinic`, data);

const getAllClinic = () => axios.get(`/api/get-all-clinic`);

const getAllClinics = () => axios.get(`/api/get-all-clinic`);

const getAllDetailClinicById = (data) => axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);

const editClinicService = (inputData) => axios.put('/api/edit-clinic', inputData);

const deleteClinicService = (clinicId) =>
  axios.delete('/api/delete-clinic', {
    data: { id: clinicId },
  });

const getAllPatientForDoctor = (data) =>
  axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);

const getAllPatientsForDoctor = (data) =>
  axios.get(`/api/get-list-patients-for-doctor?doctorId=${data.doctorId}`);

const cancelBookAppointment = (data) => axios.post(`/api/cancel-book-appointment`, data);
const postSendRemedy = (data) => axios.post(`/api/send-remedy`, data);

const crawlNewHandbook = (data) => axios.post(`/api/crawl-new-handbook`);
const getAllHandbooks = (data) => axios.get(`/api/get-all-handbook`);
const getAllHandbook = (data) => axios.get(`/api/get-all-handbook`);
const searchHandbookAction = (textSearch) =>
  axios.get(`/api/search-handbook`, { params: textSearch });

const deleteHandbookService = (handbookId) =>
  axios.delete('/api/delete-handbook-by-id', {
    data: { id: handbookId },
  });
const editHandbookService = (inputData) => axios.put('/api/edit-handbook', inputData);

const getAllDetailHandbookById = (data) =>
  axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`);

const getPostOfCategory = () => axios.get(`/api/statiscal/post-of-category`);

const getAllMedicalPackage = () => axios.get(`/api/get-all-medical-package`);

const getDetailMedicalPackageById = (inputId) =>
  axios.get(`/api/get-detail-medical-package?id=${inputId}`);

// admin
const getWeeklyRevenue = () => axios.get(`/api/get-weekly-revenue`);

const getTotalNewUserDay = () => axios.get(`/api/get-total-new-user-day`);

const getTotalHealthAppointmentDone = () => axios.get(`/api/get-total-health-appointment-done`);

const getTotalDoctors = () => axios.get(`/api/statiscal/get-count-doctor`);

const getTotalClinics = () => axios.get(`/api/statiscal/get-count-clinic`);

const getTotalSpecialties = () => axios.get(`/api/statiscal/get-count-specialty`);

const getTotalPatients = () => axios.get(`/api/statiscal/get-count-patient`);

const getTotalHandbooks = () => axios.get(`/api/statiscal/get-count-handbook`);

const getTotalScheduleToday = () => axios.get(`/api/get-all-schedule-today`);

const getTotalMedicalPackage = () => axios.get(`/api/statiscal/get-count-medical-package`);

const getTotalAppointmentSchedules = () => axios.get(`/api/statiscal/doctor-appointment-schedule`);

const getTopThreeDoctorOfTheYear = () => axios.get(`/api/get-top-three-doctors-of-the-year`);

const getTopFourVipPatient = () => axios.get(`/api/get-top-four-vip-patient`);

const getMonthlyRevenueSpecialty = () => axios.get(`/api/get-monthly-revenue-specialty`);

const getHandleLoginGoogle = (data) => axios.post(`/api/login-google`, data);

const filterHistoriesPatient = (data) => axios.post(`/api/filter-history`, data);

const filterUsers = (data) => axios.post(`/api/filter-users`, data);

const editPassword = (data) => axios.post(`/api/edit-password-user`, data);

const filterRestoreUsers = (data) => axios.post(`/api/filter-restore-users`, data);

const handleRestoreUser = (data) => axios.post(`/api/handle-restore-user`, data);

const deleteRestoreUser = (data) => axios.post(`/api/delete-restore-user`, data);
const getBookingById = (bookingId) => axios.get(`/api/get-booking-by-id?bookingId=${bookingId}`);

const saveDetailDoctor = (data) => axios.post('/api/save-infor-doctors', data);
const saveBulkScheduleDoctor = (data) => axios.post('/api/bulk-create-schedule', data);

const getExtraInforDoctorById = (doctorId) =>
  axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);

const getAllSpecialtyById = (data) =>
  axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
const postUserForgotPassword = (data) => axios.post('/api/user-forgot-password', data);

const postVerifyRetrievePassword = (data) => axios.post('/api/verify-retrieve-password', data);

const cancelBooking = (data) => axios.post('/api/cancel-booking', data);

const postCreateRemedy = (data) => axios.post('/api/create-remedy', data);

const getAllMedicalPackages = (data) => axios.get('/api/get-all-medical-package', data);

const deleteMedicalPackageService = (medicalPackageId) => {
  console.log(medicalPackageId);
  return axios.delete('/api/delete-medical-package', {
    data: { id: medicalPackageId },
  });
};

const createNewMedicalPackageService = (data) =>
  axios.post('/api/save-infor-medical-packages', data);

const getDetailInforMedicalPackage = (inputId) =>
  axios.get(`/api/get-detail-medical-package?id=${inputId}`);
const search = (text) => axios.get(`/api/search?text=${text}`);

const getDoctorSchedule = (doctorId) => axios.get(`/api/get-doctor-schedule?doctorId=${doctorId}`);

const doctorCancelSchedule = (doctorId, scheduleId) =>
  axios.get(`/api/doctor-cancel-schedule?doctorId=${doctorId}&scheduleId=${scheduleId}`);

const acceptBookAppointment = (data) => axios.post(`/api/accept-book-appointment`, data);

export {
  doctorCancelSchedule,
  acceptBookAppointment,
  search,
  getAllUsers,
  filterUsers,
  getAllClinic,
  editPassword,
  getAllDoctors,
  getAllClinics,
  cancelBooking,
  handleLoginApi,
  postSendRemedy,
  getAllHandbook,
  getBookingById,
  editUserService,
  getAllSpecialty,
  createNewClinic,
  getAllHandbooks,
  getTotalDoctors,
  getTotalClinics,
  getTotalPatients,
  crawlNewHandbook,
  getWeeklyRevenue,
  saveDetailDoctor,
  postCreateRemedy,
  getDoctorSchedule,
  getTotalHandbooks,
  deleteUserService,
  getAllCodeService,
  getAllSpecialties,
  editClinicService,
  getPostOfCategory,
  handleRestoreUser,
  deleteRestoreUser,
  createNewSpecialty,
  getTotalNewUserDay,
  filterRestoreUsers,
  getTotalSpecialties,
  editHandbookService,
  deleteClinicService,
  getAllSpecialtyById,
  createNewUserService,
  getDetailInforDoctor,
  getProfileDoctorById,
  searchHandbookAction,
  editSpecialtyService,
  getAllMedicalPackage,
  getHandleLoginGoogle,
  getTopFourVipPatient,
  getTotalScheduleToday,
  deleteHandbookService,
  getAllMedicalPackages,
  cancelBookAppointment,
  saveBulkScheludeDoctor,
  createNewClinicService,
  getAllDetailClinicById,
  getAllPatientForDoctor,
  deleteSpecialtyService,
  getTotalMedicalPackage,
  filterHistoriesPatient,
  saveBulkScheduleDoctor,
  postUserForgotPassword,
  getTopDoctorHomeService,
  saveDetailDoctorService,
  getScheduleDoctorByDate,
  getExtraDoctorInforById,
  getAllPatientsForDoctor,
  getExtraInforDoctorById,
  getAllDetailHandbookById,
  postVerifyBookAppointment,
  getAllDetailSpecialtyById,
  createNewSpecialtyService,
  postPatientBookAppointment,
  getTopThreeDoctorOfTheYear,
  getMonthlyRevenueSpecialty,
  postVerifyRetrievePassword,
  getDetailMedicalPackageById,
  deleteMedicalPackageService,
  getTotalAppointmentSchedules,
  getDetailInforMedicalPackage,
  getTotalHealthAppointmentDone,
  createNewMedicalPackageService,
};
