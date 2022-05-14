import axios from "axios";
import Swal from "sweetalert2";
import { ADD_FEEDBACK_FAIL, ADD_FEEDBACK_REQUEST, ADD_FEEDBACK_SUCCESS } from "../Types/types";

export const addnewFeedback = (formData) => async (dispatch,getState) => {
    try {
      dispatch({ type: ADD_FEEDBACK_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
  
        },
      };
      const { data } = await axios.post('http://localhost:5000/api/feedback/add',formData,config);

      dispatch({ type: ADD_FEEDBACK_SUCCESS, payload: data });
     
      Swal.fire({
                    title: "Succces!",
                    text: "Request Sended Successfully",
                    icon: 'success',
                    button: "OK!"
                });  
     // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    } catch (error) {
      dispatch({
  
        type: ADD_FEEDBACK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      Swal.fire({
                    title: "Error!",
                    text: "Request Already Send",
                    icon: 'error',
                    button: "OK!"
                });
    }
  
  }
  