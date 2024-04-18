import actionTypes from '../actions/actionTypes';

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoadingGender: false,
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  allRequiredDoctorInfor: [],
  specialties: [],
  clinics: [],
  medical_packages: [],
};

const adminReducer = (state = initialState, action) => {
  const copyState = { ...state };
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILDED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILDED:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILDED:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILDED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAILDED:
      state.topDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.dataDr;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILDED:
      state.allDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED:
      state.allScheduleTime = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      state.allRequiredDoctorInfor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED:
      state.allRequiredDoctorInfor = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_SPECIALTY_SUCCESS:
      state.specialties = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_SPECIALTY_FAILED:
      state.specialties = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_CLINIC_SUCCESS:
      state.clinics = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_CLINIC_FAILED:
      state.clinics = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_MEDICAL_PACKAGES_SUCCESS:
      state.medical_packages = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_MEDICAL_PACKAGES_FAILDED:
      state.medical_packages = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
