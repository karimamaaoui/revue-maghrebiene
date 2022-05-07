import axios from "axios";
import {
    RETRIEVE_ATTRIBUTE_REQUEST, RETRIEVE_ATTRIBUTE_SUCCESS, RETRIEVE_ATTRIBUTE_FAIL
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