import axios from "axios";
import Swal from "sweetalert2";
import { ADD_FILE_FAIL, ADD_FILE_REQUEST, ADD_FILE_SUCCESS } from "../Types/types";

// add new file
export const addNewFile = (formData) => async (dispatch, getState) => {

  try {
    dispatch({ type: ADD_FILE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    /*progress bar     
    const options = {
      onUploadProgress:progressEvent=>{
        const {loaded,total}=progressEvent;
        let percent =Math.floor((loaded +100)/total);
        if(percent <100){
          setUploadProgress(percent)
        }
      }
    }*/

    //get the token from localstorage
    const config = {
      headers: {
        Accept: 'application/json',
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      'http://localhost:5000/api/file/multiple-upload', formData, config);

      console.log("fddfghdflj",data);

    dispatch({ type: ADD_FILE_SUCCESS, payload: data });
    console.log("FILE data", data);
    Swal.fire({
      title: "Succces!",
      text: "File Added Successfully",
      icon: 'success',
      button: "OK!"
    });
  } catch (error) {
    dispatch({

      type: ADD_FILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }

}