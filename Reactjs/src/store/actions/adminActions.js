import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getAllSpecialty,
  getAllClinic,
  getAllClinics,
  deleteClinicService,
  editClinicService,
  createNewClinicService,
  getAllHandbooks,
  getAllHandbook,
  editHandbookService,
  deleteHandbookService,
  crawlNewHandbook,
  createNewSpecialtyService,
  editSpecialtyService,
  deleteSpecialtyService,
  getAllSpecialties,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService(`GENDER`);
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log(e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILDED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService(`POSITION`);
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log(e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService(`ROLE`);
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log(e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILDED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("check create user redux: ", res);
      if (res && res.errCode === 0) {
        toast.success("Create a new user successfly!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log(e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: "CREATE_USER_SUCCESS",
});

export const saveUserFailed = () => ({
  type: "CREATE_USER_FAILDED",
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers(`ALL`);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
        // console.log(res.users);
      } else {
        toast.error("Fetch all user error!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("Fetch all user error!");
      dispatch(fetchAllUsersFailed());
      console.log(e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILDED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete the user successfly!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete the user error!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("Delete the user error!");
      dispatch(deleteUserFailed());
      console.log(e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILDED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the user successfly!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Update the user error!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Update the user error!");
      dispatch(editUserFailed());
      console.log(e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILDED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
      });
    }
  };
};

export const createNewClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewClinicService(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new clinic successfly!");
        dispatch(saveClinicSuccess());
        dispatch(fetchAllClinicStart());
      } else {
        toast.failed("Create a new clinic failed!");
        dispatch(saveClinicFailed());
      }
    } catch (e) {
      dispatch(saveClinicFailed());
      console.log(e);
    }
  };
};

export const deleteAClinic = (clinicId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteClinicService(clinicId);
      if (res && res.errCode === 0) {
        toast.success("Delete the clinic successfly!");
        dispatch(deleteClinicSuccess());
        dispatch(fetchAllClinicStart());
      } else {
        toast.error("Delete the clinic error!");
        dispatch(deleteClinicFailed());
      }
    } catch (e) {
      toast.error("Delete the clinic error!");
      dispatch(deleteClinicFailed());
      console.log(e);
    }
  };
};

export const deleteClinicSuccess = () => ({
  type: actionTypes.DELETE_CLINIC_SUCCESS,
});

export const deleteClinicFailed = () => ({
  type: actionTypes.DELETE_CLINIC_FAILDED,
});

export const saveClinicSuccess = () => ({
  // type: "CREATE_SPECIALTY_SUCCESS",
  type: actionTypes.CREATE_CLINIC_SUCCESS,
});

export const saveClinicFailed = () => ({
  type: "CREATE_CLINIC_FAILDED",
});

export const editAClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editClinicService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the clinic successfly!");
        dispatch(editClinicSuccess());
        dispatch(fetchAllClinicStart());
      } else {
        toast.error("Update the clinic error!");
        dispatch(editClinicFailed());
      }
    } catch (e) {
      toast.error("Update the clinic error!");
      dispatch(editClinicFailed());
      console.log(e);
    }
  };
};

export const fetchAllClinicStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllClinics();
      if (res && res.errCode === 0) {
        dispatch(fetchAllClinicsSuccess(res.data.reverse()));
        console.log(res.data);
      } else {
        toast.error("Fetch all clinic error!");
        dispatch(fetchAllClinicsFailed());
      }
    } catch (e) {
      toast.error("Fetch all Specialty error!");
      dispatch(fetchAllClinicsFailed());
      console.log(e);
    }
  };
};

export const fetchAllClinicsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_CLINICS_SUCCESS,
  editClinicSuccess: data,
});

export const fetchAllClinicsFailed = () => ({
  type: actionTypes.FETCH_ALL_CLINICS_FAILDED,
});

export const editClinicSuccess = () => ({
  type: actionTypes.EDIT_CLINIC_SUCCESS,
});

export const editClinicFailed = () => ({
  type: actionTypes.EDIT_CLINIC_FAILDED,
});

export const createNewSpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewSpecialtyService(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new specialty successfly!");
        dispatch(saveSpecialtySuccess());
        dispatch(fetchAllSpecialtyStart());
      } else {
        toast.failed("Create a new specialty failed!");
        dispatch(saveSpecialtyFailed());
      }
    } catch (e) {
      dispatch(saveSpecialtyFailed());
      console.log(e);
    }
  };
};

export const deleteASpecialty = (specialtyId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteSpecialtyService(specialtyId);
      if (res && res.errCode === 0) {
        toast.success("Delete the specialty successfly!");
        dispatch(deleteSpecialtySuccess());
        dispatch(fetchAllSpecialtyStart());
      } else {
        toast.error("Delete the Specialty error!");
        dispatch(deleteSpecialtyFailed());
      }
    } catch (e) {
      toast.error("Delete the Specialty error!");
      dispatch(deleteSpecialtyFailed());
      console.log(e);
    }
  };
};

export const deleteSpecialtySuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteSpecialtyFailed = () => ({
  type: actionTypes.DELETE_USER_FAILDED,
});

export const saveSpecialtySuccess = () => ({
  // type: "CREATE_SPECIALTY_SUCCESS",
  type: actionTypes.CREATE_SPECIALTY_SUCCESS,
});

export const saveSpecialtyFailed = () => ({
  type: "CREATE_SPECIALTY_FAILDED",
});

export const editASpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editSpecialtyService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the Specialty successfly!");
        dispatch(editSpecialtySuccess());
        dispatch(fetchAllSpecialtyStart());
      } else {
        toast.error("Update the Specialty error!");
        dispatch(editSpecialtyFailed());
      }
    } catch (e) {
      toast.error("Update the Specialty error!");
      dispatch(editSpecialtyFailed());
      console.log(e);
    }
  };
};

export const fetchAllSpecialtyStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllSpecialties();
      if (res && res.errCode === 0) {
        dispatch(fetchAllSpecialtiesSuccess(res.data.reverse()));
        console.log(res.data);
      } else {
        toast.error("Fetch all Specialty error!");
        dispatch(fetchAllSpecialtiesFailed());
      }
    } catch (e) {
      toast.error("Fetch all Specialty error!");
      dispatch(fetchAllSpecialtiesFailed());
      console.log(e);
    }
  };
};

export const fetchAllSpecialtiesSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_SPECIALTIES_SUCCESS,
  specialties: data,
});

export const fetchAllSpecialtiesFailed = () => ({
  type: actionTypes.FETCH_ALL_SPECIALTIES_FAILDED,
});

export const editSpecialtySuccess = () => ({
  type: actionTypes.EDIT_SPECIALTY_SUCCESS,
});

export const editSpecialtyFailed = () => ({
  type: actionTypes.EDIT_SPECIALTY_FAILDED,
});

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
      });
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save infor detail doctor successfly!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save infor detail doctor error!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
        });
      }
    } catch (e) {
      toast.error("Save infor detail doctor error!");
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
      });
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService(`TIME`);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
      });
    }
  };
};

export const fetchAllHandbooksSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_HANDBOOKS_SUCCESS,
  // data: data,
});

export const fetchAllHandbooksFailed = () => ({
  type: actionTypes.FETCH_ALL_HANDBOOKS_FAILDED,
});
export const saveHandbookSuccess = () => ({
  type: "SAVE_HANDBOOK_SUCCESS",
});
export const saveHandbookFail = () => ({
  type: "SAVE_HANDBOOK_FAILDED",
});
export const fetchAllHandbookStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllHandbook(`ALL`);
      if (res && res.errCode === 0) {
        dispatch(fetchAllHandbooksSuccess(res.data.reverse()));
      } else {
        toast.error("Fetch all handbook error!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("Fetch all handbook error!");
      dispatch(fetchAllHandbooksFailed());
      console.log(e);
    }
  };
};
export const editHandbookSuccess = () => ({
  type: actionTypes.EDIT_HANDBOOK_SUCCESS,
});

export const editHandbookFailed = () => ({
  type: actionTypes.EDIT_HANDBOOK_FAILDED,
});
export const editAHandbook = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editHandbookService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the handbook successfly!");
        dispatch(editHandbookSuccess());
        dispatch(fetchAllHandbookStart());
      } else {
        toast.error("Update the handbook error!");
        dispatch(editHandbookFailed());
      }
    } catch (e) {
      toast.error("Update the handbook error!");
      dispatch(editHandbookFailed());
      console.log(e);
    }
  };
};

export const deleteAHandbook = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteHandbookService(id);
      if (res && res.errCode === 0) {
        toast.success("Delete the handbook successfly!");
        dispatch(deleteHandbookSuccess());
        dispatch(fetchAllHandbookStart());
      } else {
        toast.error("Delete the user error!");
        dispatch(deleteHandbookFailed());
      }
    } catch (e) {
      toast.error("Delete the user error!");
      dispatch(deleteHandbookFailed());
      console.log(e);
    }
  };
};

export const deleteHandbookSuccess = () => ({
  type: actionTypes.DELETE_HANDBOOK_SUCCESS,
});

export const deleteHandbookFailed = () => ({
  type: actionTypes.DELETE_HANDBOOK_FAILDED,
});

export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
      });
      let resPrice = await getAllCodeService(`PRICE`);
      let resPayment = await getAllCodeService(`PAYMENT`);
      let resProvince = await getAllCodeService(`PROVINCE`);
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchRequiredDoctorSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorFailed());
      console.log(e);
    }
  };
};

export const fetchRequiredDoctorSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});

export const fetchRequiredDoctorFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED,
});
