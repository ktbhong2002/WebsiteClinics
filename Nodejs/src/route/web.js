import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import paitentController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import handbookController from "../controllers/handbookController";
import statiscalController from "../controllers/statiscalController";
import medicalPackageController from "../controllers/medicalPackageController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/creatr-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser); //restAPI
  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-infor-doctors", doctorController.postInforDoctor);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );
  router.get(
    "/api/get-extra-infor-doctor-by-id",
    doctorController.getExtraInforDoctorById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );
  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );
  router.get(
    "/api/get-list-patients-for-doctor",
    doctorController.getListPatientsForDoctor
  );
  router.get(
    "/api/get-all-schedule-today",
    doctorController.getAllScheduleToday
  );

  router.get("/api/get-doctor-schedule", doctorController.getDoctorSchedule);
  router.get(
    "/api/doctor-cancel-schedule",
    doctorController.doctorCancelSchedule
  );
  router.post("/api/send-remedy", doctorController.sendRemedy);

  router.post(
    "/api/patient-book-appointment",
    paitentController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    paitentController.postVerifyBookAppointment
  );

  router.post(
    "/api/cancel-book-appointment",
    paitentController.cancelBookAppointment
  );

  router.post(
    "/api/accept-book-appointment",
    paitentController.acceptBookAppointment
  );

  router.get(
    "/api/get-book-appointment-expired",
    paitentController.getBookAppointmentExpired
  );

  router.post(
    "/api/create-new-specialty",
    specialtyController.handleCreateNewSpecialty
  );
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );
  router.put("/api/edit-specialty", specialtyController.handleEditSpecialty);
  router.delete(
    "/api/delete-specialty",
    specialtyController.handleDeleteSpecialty
  ); //restAPI

  router.post("/api/create-new-clinic", clinicController.createClinic);
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  router.put("/api/edit-clinic", clinicController.handleEditClinic);

  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );
  router.delete("/api/delete-clinic", clinicController.handleDeleteClinic);

  router.post("/api/create-new-handbook", handbookController.createHandbook);
  router.post("/api/crawl-new-handbook", handbookController.crawlHandbook);
  router.get("/api/search-handbook", handbookController.searchHandbook);
  router.get("/api/get-all-handbook", handbookController.getAllHandbook);
  router.get(
    "/api/get-detail-handbook-by-id",
    handbookController.getDetailHandbookById
  );
  router.delete(
    "/api/delete-handbook-by-id",
    handbookController.handleDeleteHandbook
  );

  router.get(
    "/api/statiscal/get-count-handbook",
    statiscalController.handleGetCountHandbook
  );
  router.get(
    "/api/statiscal/get-count-doctor",
    statiscalController.handleGetCountDoctor
  );
  router.get(
    "/api/statiscal/get-count-medical-package",
    statiscalController.handleGetCountMedicalPackage
  );
  router.get(
    "/api/statiscal/get-count-specialty",
    statiscalController.handleGetCountSpecialty
  );
  router.get(
    "/api/statiscal/get-count-patient",
    statiscalController.handleGetCountPatient
  );
  router.get(
    "/api/statiscal/get-count-user",
    statiscalController.handleGetCountUser
  );
  router.get(
    "/api/statiscal/get-count-clinic",
    statiscalController.handleGetCountClinic
  );

  // router.get(
  //   "/api/statiscal/get-count-handbook-ofMonth",
  //   statiscalController.handleGetCountHandbookofMonth
  // );
  router.get("/api/statiscal/post-of-day", statiscalController.handlePostOfDay);
  router.get(
    "/api/statiscal/post-of-week",
    statiscalController.handlePostOfWeek
  );
  router.get(
    "/api/statiscal/post-of-month",
    statiscalController.handleNewsByMonth
  );
  router.get(
    "/api/statiscal/post-of-category",
    statiscalController.handleNewsByCategory
  );
  router.get(
    "/api/statiscal/doctor-appointment-schedule",
    statiscalController.handleDoctorAppointmentSchedule
  );

  router.get(
    "/api/get-all-medical-package",
    medicalPackageController.getAllMedicalPackage
  );
  router.get(
    "/api/get-detail-medical-package",
    medicalPackageController.getDetailMedicalPackageById
  );
  router.post(
    "/api/save-infor-medical-packages",
    medicalPackageController.postInforMedicalPackage
  );
  router.delete(
    "/api/delete-medical-package",
    medicalPackageController.handleDeleteMedicalPackage
  );
  router.get("/api/search", paitentController.getSearch);

  router.post("/api/booking", paitentController.bookingByChatBot);

  return app.use("/", router);
};

module.exports = initWebRoutes;
