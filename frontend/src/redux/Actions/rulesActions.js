import axios from "axios";
import { RETRIEVE_RULES_FAIL, RETRIEVE_RULES_REQUEST, RETRIEVE_RULES_SUCCESS } from "../Types/types";


export const listRules = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: RETRIEVE_RULES_REQUEST,
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
      const { data } = await axios.get(`http://localhost:5000/api/rule/getallrules`, config);
  
      dispatch({
        type: RETRIEVE_RULES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: RETRIEVE_RULES_FAIL,
        payload: message,
      });
    }}