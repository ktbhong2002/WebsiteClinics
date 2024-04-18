// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';

import actionTypes from './actionTypes';
import {
  getAllUsers,
  getAllClinic,
  getAllDoctors,
  getAllClinics,
  getAllHandbook,
  editUserService,
  getAllSpecialty,
  getAllCodeService,
  deleteUserService,
  editClinicService,
  getAllSpecialties,
  getPostOfCategory,
  deleteClinicService,
  editHandbookService,
  createNewUserService,
  editSpecialtyService,
  deleteHandbookService,
  getAllMedicalPackages,
  createNewClinicService,
  deleteSpecialtyService,
  getTopDoctorHomeService,
  saveDetailDoctorService,
  createNewSpecialtyService,
  deleteMedicalPackageService,
  createNewMedicalPackageService,
} from '../../Services/userService';

export const fetchGenderStart = () => async (dispatch, getState) => {
  try {
    console.log('hh');
    dispatch({
      type: actionTypes.FETCH_GENDER_START,
    });
    const res = await getAllCodeService(`GENDER`);
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

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILDED,
});

export const fetchPositionStart = () => async (dispatch, getState) => {
  try {
    const res = await getAllCodeService(`POSITION`);
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

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});

export const fetchClinicStart = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.FETCH_CLINIC_START,
    });
    const res = await getAllClinics(`ALL`);
    if (res && res.errCode === 0) {
      dispatch(fetchClinicSuccess(res.data));
    } else {
      dispatch(fetchClinicFailed());
    }
  } catch (e) {
    dispatch(fetchClinicFailed());
    console.log(e);
  }
};
export const fetchClinicSuccess = (clinicData) => ({
  type: actionTypes.FETCH_CLINIC_SUCCESS,
  data: clinicData,
});
export const fetchClinicFailed = () => ({
  type: actionTypes.FETCH_CLINIC_FAILED,
});

export const fetchSpecialtyStart = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.FETCH_SPECIALTY_START,
    });
    const res = await getAllSpecialty(`ALL`);
    if (res && res.errCode === 0) {
      dispatch(fetchSpecialtySuccess(res.data));
    } else {
      dispatch(fetchSpecialtyFailed());
    }
  } catch (e) {
    dispatch(fetchSpecialtyFailed());
    console.log(e);
  }
};
export const fetchSpecialtySuccess = (specialtyData) => ({
  type: actionTypes.FETCH_SPECIALTY_SUCCESS,
  data: specialtyData,
});
export const fetchSpecialtyFailed = () => ({
  type: actionTypes.FETCH_SPECIALTY_FAILED,
});

export const fetchRoleStart = () => async (dispatch, getState) => {
  try {
    const res = await getAllCodeService(`ROLE`);
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

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILDED,
});

export const createNewUser = (data) => async (dispatch, getState) => {
  try {
    const res = await createNewUserService(data);
    console.log('check create user redux: ', res);
    if (res && res.errCode === 0) {
      toast.success('Create a new user successfly!');
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

export const saveUserSuccess = () => ({
  type: 'CREATE_USER_SUCCESS',
});

export const saveUserFailed = () => ({
  type: 'CREATE_USER_FAILDED',
});

export const fetchAllUserStart = () => async (dispatch, getState) => {
  try {
    const res = await getAllUsers(`ALL`);
    if (res && res.errCode === 0) {
      dispatch(fetchAllUsersSuccess(res.users.reverse()));
      // console.log(res.users);
    } else {
      toast.error('Fetch all user error!');
      dispatch(fetchAllUsersFailed());
    }
  } catch (e) {
    toast.error('Fetch all user error!');
    dispatch(fetchAllUsersFailed());
    console.log(e);
  }
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILDED,
});

export const deleteAUser = (userId) => async (dispatch, getState) => {
  try {
    const res = await deleteUserService(userId);
    if (res && res.errCode === 0) {
      toast.success('Delete the user successfly!');
      dispatch(deleteUserSuccess());
      dispatch(fetchAllUserStart());
    } else {
      toast.error('Delete the user error!');
      dispatch(deleteUserFailed());
    }
  } catch (e) {
    toast.error('Delete the user error!');
    dispatch(deleteUserFailed());
    console.log(e);
  }
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILDED,
});

export const editAUser = (data) => async (dispatch, getState) => {
  try {
    const res = await editUserService(data);
    if (res && res.errCode === 0) {
      toast.success('Update the user successfly!');
      dispatch(editUserSuccess());
      dispatch(fetchAllUserStart());
    } else {
      toast.error('Update the user error!');
      dispatch(editUserFailed());
    }
  } catch (e) {
    toast.error('Update the user error!');
    dispatch(editUserFailed());
    console.log(e);
  }
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILDED,
});

export const fetchTopDoctor = () => async (dispatch, getState) => {
  try {
    const res = await getTopDoctorHomeService('');
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

export const createNewClinic = (data) => async (dispatch, getState) => {
  try {
    const res = await createNewClinicService(data);
    if (res && res.errCode === 0) {
      toast.success('Create a new clinic successfly!');
      dispatch(saveClinicSuccess());
      dispatch(fetchAllClinicStart());
    } else {
      toast.failed('Create a new clinic failed!');
      dispatch(saveClinicFailed());
    }
  } catch (e) {
    dispatch(saveClinicFailed());
    console.log(e);
  }
};

export const deleteAClinic = (clinicId) => async (dispatch, getState) => {
  try {
    const res = await deleteClinicService(clinicId);
    if (res && res.errCode === 0) {
      toast.success('Delete the clinic successfly!');
      dispatch(deleteClinicSuccess());
      dispatch(fetchAllClinicStart());
    } else {
      toast.error('Delete the clinic error!');
      dispatch(deleteClinicFailed());
    }
  } catch (e) {
    toast.error('Delete the clinic error!');
    dispatch(deleteClinicFailed());
    console.log(e);
  }
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
  type: 'CREATE_CLINIC_FAILDED',
});

export const editAClinic = (data) => async (dispatch, getState) => {
  try {
    const res = await editClinicService(data);
    if (res && res.errCode === 0) {
      toast.success('Update the clinic successfly!');
      dispatch(editClinicSuccess());
      dispatch(fetchAllClinicStart());
    } else {
      toast.error('Update the clinic error!');
      dispatch(editClinicFailed());
    }
  } catch (e) {
    toast.error('Update the clinic error!');
    dispatch(editClinicFailed());
    console.log(e);
  }
};

export const fetchAllClinicStart = () => async (dispatch, getState) => {
  try {
    const res = await getAllClinics();
    if (res && res.errCode === 0) {
      dispatch(fetchAllClinicsSuccess(res.data.reverse()));
      console.log(res.data);
    } else {
      toast.error('Fetch all clinic error!');
      dispatch(fetchAllClinicsFailed());
    }
  } catch (e) {
    toast.error('Fetch all Specialty error!');
    dispatch(fetchAllClinicsFailed());
    console.log(e);
  }
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

export const createNewSpecialty = (data) => async (dispatch, getState) => {
  try {
    const res = await createNewSpecialtyService(data);
    if (res && res.errCode === 0) {
      toast.success('Create a new specialty successfly!');
      dispatch(saveSpecialtySuccess());
      dispatch(fetchAllSpecialtyStart());
    } else {
      toast.failed('Create a new specialty failed!');
      dispatch(saveSpecialtyFailed());
    }
  } catch (e) {
    dispatch(saveSpecialtyFailed());
    console.log(e);
  }
};

export const deleteASpecialty = (specialtyId) => async (dispatch, getState) => {
  try {
    const res = await deleteSpecialtyService(specialtyId);
    if (res && res.errCode === 0) {
      toast.success('Delete the specialty successfly!');
      dispatch(deleteSpecialtySuccess());
      dispatch(fetchAllSpecialtyStart());
    } else {
      toast.error('Delete the Specialty error!');
      dispatch(deleteSpecialtyFailed());
    }
  } catch (e) {
    toast.error('Delete the Specialty error!');
    dispatch(deleteSpecialtyFailed());
    console.log(e);
  }
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
  type: 'CREATE_SPECIALTY_FAILDED',
});

export const editASpecialty = (data) => async (dispatch, getState) => {
  try {
    const res = await editSpecialtyService(data);
    if (res && res.errCode === 0) {
      toast.success('Update the Specialty successfly!');
      dispatch(editSpecialtySuccess());
      dispatch(fetchAllSpecialtyStart());
    } else {
      toast.error('Update the Specialty error!');
      dispatch(editSpecialtyFailed());
    }
  } catch (e) {
    toast.error('Update the Specialty error!');
    dispatch(editSpecialtyFailed());
    console.log(e);
  }
};

export const fetchAllSpecialtyStart = () => async (dispatch, getState) => {
  try {
    const res = await getAllSpecialties();
    if (res && res.errCode === 0) {
      dispatch(fetchAllSpecialtiesSuccess(res.data.reverse()));
    } else {
      toast.error('Fetch all Specialty error!');
      dispatch(fetchAllSpecialtiesFailed());
    }
  } catch (e) {
    toast.error('Fetch all Specialty error!');
    dispatch(fetchAllSpecialtiesFailed());
    console.log(e);
  }
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

export const fetchAllDoctors = () => async (dispatch, getState) => {
  try {
    const res = await getAllDoctors();
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

export const saveDetailDoctor = (data) => async (dispatch, getState) => {
  try {
    const res = await saveDetailDoctorService(data);
    if (res && res.errCode === 0) {
      toast.success('Save infor detail doctor successfly!');
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
      });
    } else {
      toast.error('Save infor detail doctor error!');
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
      });
    }
  } catch (e) {
    toast.error('Save infor detail doctor error!');
    dispatch({
      type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
    });
  }
};

export const fetchAllScheduleTime = () => async (dispatch, getState) => {
  try {
    const res = await getAllCodeService(`TIME`);
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

export const fetchAllHandbooksSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_HANDBOOKS_SUCCESS,
  // data: data,
});

export const fetchAllHandbooksFailed = () => ({
  type: actionTypes.FETCH_ALL_HANDBOOKS_FAILDED,
});
export const saveHandbookSuccess = () => ({
  type: 'SAVE_HANDBOOK_SUCCESS',
});
export const saveHandbookFail = () => ({
  type: 'SAVE_HANDBOOK_FAILDED',
});
export const fetchAllHandbookStart = () => async (dispatch, getState) => {
  try {
    const res = await getAllHandbook(`ALL`);
    if (res && res.errCode === 0) {
      dispatch(fetchAllHandbooksSuccess(res.data.reverse()));
    } else {
      toast.error('Fetch all handbook error!');
      dispatch(fetchAllUsersFailed());
    }
  } catch (e) {
    toast.error('Fetch all handbook error!');
    dispatch(fetchAllHandbooksFailed());
    console.log(e);
  }
};
export const editHandbookSuccess = () => ({
  type: actionTypes.EDIT_HANDBOOK_SUCCESS,
});

export const editHandbookFailed = () => ({
  type: actionTypes.EDIT_HANDBOOK_FAILDED,
});
export const editAHandbook = (data) => async (dispatch, getState) => {
  try {
    const res = await editHandbookService(data);
    if (res && res.errCode === 0) {
      toast.success('Update the handbook successfly!');
      dispatch(editHandbookSuccess());
      dispatch(fetchAllHandbookStart());
    } else {
      toast.error('Update the handbook error!');
      dispatch(editHandbookFailed());
    }
  } catch (e) {
    toast.error('Update the handbook error!');
    dispatch(editHandbookFailed());
    console.log(e);
  }
};

export const deleteAHandbook = (id) => async (dispatch, getState) => {
  try {
    const res = await deleteHandbookService(id);
    if (res && res.errCode === 0) {
      toast.success('Delete the handbook successfly!');
      dispatch(deleteHandbookSuccess());
      dispatch(fetchAllHandbookStart());
    } else {
      toast.error('Delete the user error!');
      dispatch(deleteHandbookFailed());
    }
  } catch (e) {
    toast.error('Delete the user error!');
    dispatch(deleteHandbookFailed());
    console.log(e);
  }
};

export const deleteHandbookSuccess = () => ({
  type: actionTypes.DELETE_HANDBOOK_SUCCESS,
});

export const deleteHandbookFailed = () => ({
  type: actionTypes.DELETE_HANDBOOK_FAILDED,
});

export const getRequiredDoctorInfor = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
    });
    const resPrice = await getAllCodeService(`PRICE`);
    const resPayment = await getAllCodeService(`PAYMENT`);
    const resProvince = await getAllCodeService(`PROVINCE`);
    const resSpecialty = await getAllSpecialty();
    const resClinic = await getAllClinic();
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
      const data = {
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

export const fetchRequiredDoctorSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});

export const fetchRequiredDoctorFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED,
});

export const fetchPostOfCategorySuccess = (data) => ({
  type: actionTypes.FETCH_PostOfCategory_SUCCESS,
  // data: data,
});

export const fetchPostOfCategoryFailed = () => ({
  type: actionTypes.FETCH_PostOfCategory_FAILDED,
});

export const fetchPostOfCategoryStart = () => async (dispatch, getState) => {
  try {
    const res = await getPostOfCategory(`ALL`);
    if (res && res.errCode === 0) {
      dispatch(fetchPostOfCategorySuccess(res.data));
    } else {
      toast.error('Fetch all error!');
      dispatch(fetchPostOfCategoryFailed());
    }
  } catch (e) {
    toast.error('Fetch all error!');
    dispatch(fetchPostOfCategoryFailed());
    console.log(e);
  }
};

export const fetchAllMedicalPackages = () => async (dispatch, getState) => {
  try {
    const res = await getAllMedicalPackages();
    if (res && res.errCode === 0) {
      dispatch({
        type: actionTypes.FETCH_ALL_MEDICAL_PACKAGES_SUCCESS,
        data: res.data,
      });
    } else {
      dispatch({
        type: actionTypes.FETCH_ALL_MEDICAL_PACKAGES_FAILDED,
      });
    }
  } catch (e) {
    dispatch({
      type: actionTypes.FETCH_ALL_MEDICAL_PACKAGES_FAILDED,
    });
  }
};

export const createNewMedicalPackage = (data) => async (dispatch, getState) => {
  try {
    const res = await createNewMedicalPackageService(data);
    if (res && res.errCode === 0) {
      toast.success('Create a new medical package successfly!');
      dispatch(saveMedicalPackageSuccess());
      dispatch(fetchAllMedicalPackageStart());
    } else {
      dispatch(saveMedicalPackageFailed());
    }
  } catch (e) {
    dispatch(saveMedicalPackageFailed());
    console.log(e);
  }
};

export const deleteAMedicalPackage = (medicalPackageId) => async (dispatch, getState) => {
  try {
    const res = await deleteMedicalPackageService(medicalPackageId);
    if (res && res.errCode === 0) {
      toast.success('Delete the MedicalPackage successfly!');
      dispatch(deleteMedicalPackageSuccess());
      dispatch(fetchAllMedicalPackageStart());
    } else {
      toast.error('Delete the MedicalPackage error!');
      dispatch(deleteMedicalPackageFailed());
    }
  } catch (e) {
    toast.error('Delete the MedicalPackage error!');
    dispatch(deleteMedicalPackageFailed());
    console.log(e);
  }
};

export const deleteMedicalPackageSuccess = () => ({
  type: actionTypes.DELETE_MEDICAL_PACKAGE_SUCCESS,
});

export const deleteMedicalPackageFailed = () => ({
  type: actionTypes.DELETE_MEDICAL_PACKAGE_FAILDED,
});

export const saveMedicalPackageSuccess = () => ({
  // type: "CREATE_SPECIALTY_SUCCESS",
  type: actionTypes.CREATE_MEDICAL_PACKAGE_SUCCESS,
});

export const saveMedicalPackageFailed = () => ({
  type: 'CREATE_MEDICAL_PACKAGE_FAILDED',
});

export const fetchAllMedicalPackageStart = (data) => ({
  type: actionTypes.FETCH_ALL_MEDICAL_PACKAGE_SUCCESS,
  data,
});

export const editAMedicalPackage = (data) => async (dispatch, getState) => {
  try {
    const res = await createNewMedicalPackageService(data);
    if (res && res.errCode === 0) {
      toast.success('Update the medicalpackage successfly!');
      // dispatch(editMedicalPackageSuccess());
      dispatch(fetchAllMedicalPackageStart());
    } else {
      toast.error('Update the medicalpackage error!');
      dispatch(editMedicalPackageFailed());
    }
  } catch (e) {
    toast.error('Update the medical package error!');
    dispatch(editMedicalPackageFailed());
    console.log(e);
  }
};

export const editMedicalPackageSuccess = () => ({
  type: actionTypes.EDIT_MEDICAL_PACKAGE_SUCCESS,
});

export const editMedicalPackageFailed = () => ({
  type: actionTypes.EDIT_MEDICAL_PACKAGE_FAILDED,
});
