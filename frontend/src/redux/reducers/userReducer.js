import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_REST_PASSWORD_REQUEST,
  USER_REST_PASSWORD_SUCCESS,
  USER_REST_PASSWORD_FAIL,
  USER_UPDATE_Picture_REQUEST,
  USER_UPDATE_Picture_SUCCESS,
  USER_UPDATE_Picture_FAIL,
  RETRIEVE_USER_REQUEST,
  RETRIEVE_ATTRIBUTE_SUCCESS,
  RETRIEVE_USER_FAIL,
  RETRIEVE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  RETRIEVE_DEMAND_AUTHOR_SUCCESS,
  RETRIEVE_DEMAND_AUTHOR_FAIL,
  RETRIEVE_DEMAND_AUTHOR_REQUEST,
  USER_NEW_ARRIVALS_REQUEST,
  USER_NEW_ARRIVALS_SUCCESS,
  USER_NEW_ARRIVALS_FAIL
} from "../Types/types";


export const userLoginReducer = (state = {}, action) => {

  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
    //  return { loading: false, isAuthenticate: true, userInfo: action.payload };
    return { loading: false,  userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }

}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case USER_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REST_PASSWORD_REQUEST:
      return { loading: true };
    case USER_REST_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REST_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
}


export const userUpdatePictureReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_Picture_REQUEST:
      return { loading: true };
    case USER_UPDATE_Picture_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_UPDATE_Picture_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
}



export const retrieveAllUserReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case RETRIEVE_USER_REQUEST:
      return { loading: true };
    case RETRIEVE_USER_SUCCESS:
      return { loading: false, users: action.payload, success: true };
    case RETRIEVE_USER_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
}


export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true };
    case DELETE_USER_SUCCESS:
      return { loading: false, success: true };
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
}


export const demandAuthorReducer = (state = {}, action) => {
  switch (action.type) {
    case RETRIEVE_DEMAND_AUTHOR_REQUEST:
      return { loading: true };
    case RETRIEVE_DEMAND_AUTHOR_SUCCESS:
      return { loading: false, success: true };
    case RETRIEVE_DEMAND_AUTHOR_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
}


export const userNewArrivalReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_NEW_ARRIVALS_REQUEST:
      return { loading: true };
    case USER_NEW_ARRIVALS_SUCCESS:
      return { loading: false, success: true };
    case USER_NEW_ARRIVALS_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
}
