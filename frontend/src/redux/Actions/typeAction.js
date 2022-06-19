import axios from "axios";
import {
    RETRIEVE_TYPES_REQUEST, RETRIEVE_TYPES_SUCCESS, RETRIEVE_TYPES_FAIL, DELETE_TYPE_REQUEST, DELETE_TYPE_SUCCESS, DELETE_TYPE_FAIL, RETRIEVE_USER_BY_FILTER_SUCCESS, RETRIEVE_TYPE_BY_FILTER_SUCCESS, RETRIEVE_TYPE_BY_FILTER_REQUEST, RETRIEVE_TYPE_BY_FILTER_FAIL
} from "../Types/types";

export const listTypes = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: RETRIEVE_TYPES_REQUEST,
      }); 
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
  
        },
      };
      const { data } = await axios.get(`http://localhost:5000/api/type/types`, config);
  
      dispatch({
        type: RETRIEVE_TYPES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: RETRIEVE_TYPES_FAIL,
        payload: message,
      });
    }}

       // delete one user
export const deleteType = (id) => async (dispatch, getState) => {

  try {
    dispatch({ type: DELETE_TYPE_REQUEST});

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

    const { data } = await axios.delete(`http://localhost:5000/api/type/delete/${id}`, config);
    console.log("user data", data)


    dispatch({ type: DELETE_TYPE_SUCCESS, payload: data });
    
    //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //localStorage.setItem("userInfo", JSON.stringify(data, config));

  } catch (error) {
    dispatch({
      type: DELETE_TYPE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}

export const getTypeByFilter= (searchTerm,data) => async (dispatch, getState) => {
  try {
    dispatch({ type: RETRIEVE_TYPE_BY_FILTER_REQUEST});

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,

      },
    };


    const { data } = await axios.get(`http://localhost:5000/api/type/filter/${searchTerm}`, config);
    console.log("filter data", data)


    dispatch({ type: RETRIEVE_TYPE_BY_FILTER_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: RETRIEVE_TYPE_BY_FILTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}
