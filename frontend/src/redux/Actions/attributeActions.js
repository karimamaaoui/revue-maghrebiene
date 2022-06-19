import axios from "axios";
import {
    RETRIEVE_ATTRIBUTE_REQUEST, RETRIEVE_ATTRIBUTE_SUCCESS, RETRIEVE_ATTRIBUTE_FAIL, DELETE_ATTRIBUTE_REQUEST, DELETE_ATTRIBUTE_SUCCESS, DELETE_ATTRIBUTE_FAIL, RETRIEVE_THEME_BY_FILTER_SUCCESS, RETRIEVE_THEME_BY_FILTER_REQUEST, RETRIEVE_THEME_BY_FILTER_FAIL
} from "../Types/types";

export const listAttribute = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: RETRIEVE_ATTRIBUTE_REQUEST,
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
      const { data } = await axios.get(`http://localhost:5000/api/attribute/attributes`, config);
  
      dispatch({
        type: RETRIEVE_ATTRIBUTE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: RETRIEVE_ATTRIBUTE_FAIL,
        payload: message,
      });
    }}


        // delete one user
export const deleteAttribute = (id) => async (dispatch, getState) => {

  try {
    dispatch({ type: DELETE_ATTRIBUTE_REQUEST});

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

    const { data } = await axios.delete(`http://localhost:5000/api/attribute/delete/${id}`, config);
    console.log("user data", data)


    dispatch({ type: DELETE_ATTRIBUTE_SUCCESS, payload: data });
    
  } catch (error) {
    dispatch({
      type: DELETE_ATTRIBUTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}


export const getThemeByFilter= (searchTerm,data) => async (dispatch, getState) => {
  try {
    dispatch({ type: RETRIEVE_THEME_BY_FILTER_REQUEST});

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,

      },
    };


    const { data } = await axios.get(`http://localhost:5000/api/attribut/filter/${searchTerm}`, config);
    console.log("filter data", data)


    dispatch({ type: RETRIEVE_THEME_BY_FILTER_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: RETRIEVE_THEME_BY_FILTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}