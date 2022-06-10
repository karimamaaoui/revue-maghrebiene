import axios from "axios";
import { DELETE_RULE_FAIL, DELETE_RULE_REQUEST, DELETE_RULE_SUCCESS, RETRIEVE_RULES_FAIL, RETRIEVE_RULES_REQUEST, RETRIEVE_RULES_SUCCESS } from "../Types/types";


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


    // delete one user
export const deleteRule = (id) => async (dispatch, getState) => {

  try {
    dispatch({ type: DELETE_RULE_REQUEST});

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

    const { data } = await axios.delete(`http://localhost:5000/api/rule/delete/${id}`, config);
    console.log("user data", data)


    dispatch({ type: DELETE_RULE_SUCCESS, payload: data });
    
    //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //localStorage.setItem("userInfo", JSON.stringify(data, config));

  } catch (error) {
    dispatch({
      type: DELETE_RULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}