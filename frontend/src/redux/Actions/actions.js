import axios from "axios";
import Swal from 'sweetalert2'

import {
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  RETRIEVE_DEMAND_AUTHOR_FAIL,
  RETRIEVE_DEMAND_AUTHOR_REQUEST,
  RETRIEVE_DEMAND_AUTHOR_SUCCESS,
  RETRIEVE_USER_FAIL,
  RETRIEVE_USER_REQUEST,
  RETRIEVE_USER_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_NEW_ARRIVALS_FAIL,
  USER_NEW_ARRIVALS_REQUEST,
  USER_NEW_ARRIVALS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REST_PASSWORD_FAIL,
  USER_REST_PASSWORD_REQUEST,
  USER_REST_PASSWORD_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_Picture_FAIL,
  USER_UPDATE_Picture_REQUEST,
  USER_UPDATE_Picture_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../Types/types";

// login 
export const login = (username, password) => async (dispatch) => {
  //  const [islogged, setIslogged] = useState(false);

  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    // setLoading(true)
    const { data } = await axios.post('http://localhost:5000/api/auth/login', {
      username,
      password
    },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
    console.log("user data", data)

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}
// logout
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  await axios.post(
    'http://localhost:5000/api/user/logout')
  dispatch({ type: USER_LOGOUT });

}

// register new account
export const register = (username, email, password) => async (dispatch) => {

  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await axios.post(
      'http://localhost:5000/api/auth/register',
      {
        username,
        email,
        password,
      },
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    console.log("user data", data)

    dispatch({ type: USER_REGISTER_FAIL, payload: data });

  } catch (error) {
    dispatch({

      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }

}

// send request forgot password 
export const Forgot = (email) => async (dispatch) => {

  try {
    dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });

    const { data } = await axios.post('http://localhost:5000/api/user/requestPasswordReset', {
      email,
    },
    );
    dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS, payload: data });

    console.log("forgot password", data)

  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}



// send rest  password 
export const Rest = (email) => async (dispatch) => {

  try {
    dispatch({ type: USER_REST_PASSWORD_REQUEST });

    const { data } = await axios.post('http://localhost:5000/api/user/restPassword', {
      email,
    },
    );
    dispatch({ type: USER_REST_PASSWORD_SUCCESS, payload: data });

    console.log("forgot password", data)

  } catch (error) {
    dispatch({
      type: USER_REST_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}


// update profile 
export const updateProfile = (user) => async (dispatch, getState) => {

  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,

      },
    };

    console.log("user token", config)

    const { data } = await axios.patch('http://localhost:5000/api/user/update', user, config);
    console.log("user data", data)


    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data, config));

  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}



// update profile picture
export const userupdatePicture = (profilePic) => async (dispatch, getState) => {

  try {
    dispatch({ type: USER_UPDATE_Picture_REQUEST});

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,

      },
    };

    console.log("profilePic", profilePic)

    const { data } = await axios.patch('http://localhost:5000/api/user/upload-image',
     profilePic, config);
    console.log("user data", config)


    dispatch({ type: USER_UPDATE_Picture_SUCCESS, payload: data });
    
    
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data, config));


  } catch (error) {
    dispatch({
      type: USER_UPDATE_Picture_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}


// get all user
export const getAllUsers = () => async (dispatch, getState) => {

  try {
    dispatch({ type: RETRIEVE_USER_REQUEST});

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,

      },
    };

   // console.log("user token", config)

    const { data } = await axios.get('http://localhost:5000/api/user/getAllUsers', config);
    //console.log("user data", data)


    dispatch({ type: RETRIEVE_USER_SUCCESS, payload: data });
    
    //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //localStorage.setItem("userInfo", JSON.stringify(data, config));

  } catch (error) {
    dispatch({
      type: RETRIEVE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}



export const getAllUserPaginate= (currentPage) => async (dispatch, getState) => {

  try {
    dispatch({ type: RETRIEVE_USER_REQUEST});

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,

      },
    };

    const { data } = await axios.get(`http://localhost:5000/api/file/user/getAllUsers?currentPage=${currentPage}`, config);
    dispatch({ type: RETRIEVE_USER_SUCCESS, payload: data });
  
  } catch (error) {
    dispatch({
      type: RETRIEVE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}
// get all user
export const listNewArrivals = () => async (dispatch, getState) => {

  try {
    dispatch({ type: USER_NEW_ARRIVALS_REQUEST});

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,

      },
    };
    const { data } = await axios.get('http://localhost:5000/api/user/getnew', config);
    
   // console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',data)
   
   dispatch({ type: USER_NEW_ARRIVALS_SUCCESS, payload: data });
    
  } catch (error) {
    dispatch({
      type: USER_NEW_ARRIVALS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}
// delete one user
export const deleteUser = (id) => async (dispatch, getState) => {

  try {
    dispatch({ type: DELETE_USER_REQUEST});

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,

      },
    };

    console.log("user token", config)

    const { data } = await axios.delete(`http://localhost:5000/api/user/delete/${id}`, config);
    console.log("user data", data)


    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    
    //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //localStorage.setItem("userInfo", JSON.stringify(data, config));

  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}


// get all user
export const getAllDemands = () => async (dispatch, getState) => {

  try {
    dispatch({ type: RETRIEVE_DEMAND_AUTHOR_REQUEST});

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,

      },
    };

   // console.log("user token", config)

    const { data } = await axios.get('http://localhost:5000/api/demand/', config);
   // console.log("demand data", data)
    dispatch({ type: RETRIEVE_DEMAND_AUTHOR_SUCCESS, payload: data });
    
    //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //localStorage.setItem("userInfo", JSON.stringify(data, config));

  } catch (error) {
    dispatch({
      type: RETRIEVE_DEMAND_AUTHOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}
