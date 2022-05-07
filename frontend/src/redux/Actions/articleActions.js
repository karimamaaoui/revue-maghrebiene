import axios from "axios";
import { ADD_ARTICLE_FAIL, ADD_ARTICLE_REQUEST, ADD_ARTICLE_SUCCESS, DELETE_ARTICLE_FAIL, DELETE_ARTICLE_REQUEST, DELETE_ARTICLE_SUCCESS, RETRIEVE_ARTICLE_BY_FILTER_FAIL, RETRIEVE_ARTICLE_BY_FILTER_REQUEST, RETRIEVE_ARTICLE_BY_FILTER_SUCCESS, RETRIEVE_ARTICLE_BY_TYPE_FAIL, RETRIEVE_ARTICLE_BY_TYPE_REQUEST, RETRIEVE_ARTICLE_BY_TYPE_SUCCESS, RETRIEVE_ARTICLE_FAIL, RETRIEVE_ARTICLE_REQUEST, RETRIEVE_ARTICLE_SUCCESS, RETRIEVE_RANDOM_ARTICLE_FAIL, RETRIEVE_RANDOM_ARTICLE_REQUEST, RETRIEVE_RANDOM_ARTICLE_SUCCESS, UPDATE_ARTICLE_FAIL, UPDATE_ARTICLE_REQUEST, UPDATE_ARTICLE_SUCCESS } from "../Types/types";


// add new article
export const addnewArticle = (formData) => async (dispatch,getState) => {
    try {
      dispatch({ type: ADD_ARTICLE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
  
        },
      };
      const { data } = await axios.post('http://localhost:5000/api/articles/addArticle',formData,config);

      dispatch({ type: ADD_ARTICLE_SUCCESS, payload: data });
     
      console.log("article data from action", formData)
  
     // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    } catch (error) {
      dispatch({
  
        type: ADD_ARTICLE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  
  }
  

  
// get all user
export const getAllArticles= () => async (dispatch, getState) => {

  try {
    dispatch({ type: RETRIEVE_ARTICLE_REQUEST});

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

    const { data } = await axios.get('http://localhost:5000/api/file/getallfiles', config);
    //console.log("user data", data)


    dispatch({ type: RETRIEVE_ARTICLE_SUCCESS, payload: data });
    
    //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //localStorage.setItem("userInfo", JSON.stringify(data, config));

  } catch (error) {
    dispatch({
      type: RETRIEVE_ARTICLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}

export const getAllArticlePaginate= (currentPage) => async (dispatch, getState) => {

  try {
    dispatch({ type: RETRIEVE_ARTICLE_REQUEST});

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

    const { data } = await axios.get(`http://localhost:5000/api/file/getallfiles?currentPage=${currentPage}`, config);
    //console.log("user data", data)


    dispatch({ type: RETRIEVE_ARTICLE_SUCCESS, payload: data });
    
    //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //localStorage.setItem("userInfo", JSON.stringify(data, config));

  } catch (error) {
    dispatch({
      type: RETRIEVE_ARTICLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}
// delete one user
export const deleteArticle = (id) => async (dispatch, getState) => {

  try {
    dispatch({ type: DELETE_ARTICLE_REQUEST});
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
    const { data } = await axios.delete(`http://localhost:5000/api/file/delete/${id}`, config);
    console.log("user data", data)
    dispatch({ type: DELETE_ARTICLE_SUCCESS, payload: data });
    //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    //localStorage.setItem("userInfo", JSON.stringify(data, config));
  } catch (error) {
    dispatch({
      type: DELETE_ARTICLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}

export const getArticleByFilter= (searchTerm,data) => async (dispatch, getState) => {
  try {
    dispatch({ type: RETRIEVE_ARTICLE_BY_FILTER_REQUEST});

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

    const { data } = await axios.get(`http://localhost:5000/api/file/filter/${searchTerm}`, config);
    console.log("article data", data)


    dispatch({ type: RETRIEVE_ARTICLE_BY_FILTER_SUCCESS, payload: data });
    
    //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //localStorage.setItem("userInfo", JSON.stringify(data, config));

  } catch (error) {
    dispatch({
      type: RETRIEVE_ARTICLE_BY_FILTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}

export const getArticleByType= (updatedCategoryIds) => async (dispatch, getState) => {
  try {
    dispatch({ type: RETRIEVE_ARTICLE_REQUEST});

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

    const { data } = await axios.get(`http://localhost:5000/api/file/getallfiles?types=${updatedCategoryIds}`, config);
    //console.log("user data", data)


    dispatch({ type: RETRIEVE_ARTICLE_SUCCESS, payload: data });
    
    //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //localStorage.setItem("userInfo", JSON.stringify(data, config));

  } catch (error) {
    dispatch({
      type: RETRIEVE_ARTICLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}


export const getArticleByAttribute= (updatedAttributeIds) => async (dispatch, getState) => {
  try {
    dispatch({ type: RETRIEVE_ARTICLE_REQUEST});

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,

      },
    };


    const { data } = await axios.get(`http://localhost:5000/api/file/getallfile?attribut=${updatedAttributeIds}`, config);


    dispatch({ type: RETRIEVE_ARTICLE_SUCCESS, payload: data });
    
  
  } catch (error) {
    dispatch({
      type: RETRIEVE_ARTICLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}

 
// get all user
export const getRandomArticle= () => async (dispatch, getState) => {

  try {
    dispatch({ type: RETRIEVE_RANDOM_ARTICLE_REQUEST});

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

    const { data } = await axios.get('http://localhost:5000/api/articles/random', config);
    console.log("user data", data)


    dispatch({ type: RETRIEVE_RANDOM_ARTICLE_SUCCESS, payload: data });
    
    //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    //localStorage.setItem("userInfo", JSON.stringify(data, config));

  } catch (error) {
    dispatch({
      type: RETRIEVE_RANDOM_ARTICLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}

export const getProductsByFilter = arg => async (dispatch,getState) => {
	try {
	//	const response = await axios.post('/api/filter/search', arg);

    dispatch({ type: RETRIEVE_ARTICLE_BY_FILTER_REQUEST});
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

    const { data } = await axios.post(`http://localhost:5000/api/articles/search`, config);
    console.log("user data", data)


    dispatch({ type: RETRIEVE_ARTICLE_BY_FILTER_SUCCESS, payload: data.articles });



	} catch (err) {
		console.log('getProductsByFilter api error: ', err);
		dispatch({
			type: RETRIEVE_ARTICLE_BY_FILTER_FAIL,
			payload: err.response.data.errorMessage,
		});
	}
};


// update article

export const updateArticle = (id) => async (dispatch, getState) => {

  try {
    dispatch({ type: UPDATE_ARTICLE_REQUEST});
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
    const { data } = await axios.put(`http://localhost:5000/api/file/update/${id}`, config);
    console.log("user data", data)
    dispatch({ type: UPDATE_ARTICLE_SUCCESS, payload: data });
    //dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    //localStorage.setItem("userInfo", JSON.stringify(data, config));
  } catch (error) {
    dispatch({
      type: UPDATE_ARTICLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}
