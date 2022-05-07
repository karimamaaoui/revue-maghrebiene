import axios from "axios";
import {
    RETRIEVE_TYPES_REQUEST, RETRIEVE_TYPES_SUCCESS, RETRIEVE_TYPES_FAIL
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