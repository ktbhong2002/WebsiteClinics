import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
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

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILDED,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILDED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
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

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
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

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("check create user", res);
      if (res && res.errCode === 0) {
        toast.success("Create a new user success");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
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
  type: "SAVE_USER_SUCCESS",
});

export const saveUserFailed = () => ({
  type: "SAVE_USER_FAILED",
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("fetch all users error");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("fetch all users error");
      dispatch(fetchAllUsersFailed());
      console.log(e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: "FETCH_ALL_USERS_SUCCESS",
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: "FETCH_ALL_USERS_FAILDED",
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      console.log("check create user", res);
      if (res && res.errCode === 0) {
        toast.success("Delete user success");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete user error");
        dispatch(deleteUsersFailed());
      }
    } catch (e) {
      toast.error("Delete user error ");
      dispatch(deleteUsersFailed());
      console.log(e);
    }
  };
};

export const deleteUsersSuccess = () => ({
  type: actionTypes.DELETE_USERS_SUCCESS,
});

export const deleteUsersFailed = () => ({
  type: actionTypes.DELETE_USERS_FAILDED,
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      console.log("check create user", res);
      if (res && res.errCode === 0) {
        toast.success("Update user successfly");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Update user error");
        dispatch(editUsersFailed());
      }
    } catch (e) {
      toast.error("Update user error ");
      dispatch(editUsersFailed());
      console.log(e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USERS_SUCCESS,
});

export const editUsersFailed = () => ({
  type: actionTypes.EDIT_USERS_FAILDED,
});
