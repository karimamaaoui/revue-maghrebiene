import { ADD_ARTICLE_FAIL, ADD_ARTICLE_REQUEST, ADD_ARTICLE_SUCCESS, DELETE_ARTICLE_FAIL, DELETE_ARTICLE_REQUEST, DELETE_ARTICLE_SUCCESS, RETRIEVE_ARTICLE_BY_FILTER_FAIL, RETRIEVE_ARTICLE_BY_FILTER_REQUEST, RETRIEVE_ARTICLE_BY_FILTER_SUCCESS, RETRIEVE_ARTICLE_FAIL, RETRIEVE_ARTICLE_REQUEST, RETRIEVE_ARTICLE_SUCCESS, RETRIEVE_RANDOM_ARTICLE_FAIL, RETRIEVE_RANDOM_ARTICLE_REQUEST, RETRIEVE_RANDOM_ARTICLE_SUCCESS, UPDATE_ARTICLE_FAIL, UPDATE_ARTICLE_REQUEST, UPDATE_ARTICLE_SUCCESS } from "../Types/types";


export const addArticleReducer = (state = { formData: [] }, action) => {
    switch (action.type) {
        case ADD_ARTICLE_REQUEST:
            return { loading: true };
        case ADD_ARTICLE_SUCCESS:
            return { loading: false, formData: action.payload };
        case ADD_ARTICLE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}


export const retrieveAllArticleReducer = (state = { articles: [] }, action) => {
    switch (action.type) {
      case RETRIEVE_ARTICLE_REQUEST:
        return { loading: true };
      case RETRIEVE_ARTICLE_SUCCESS:
        return { loading: false, articles: action.payload, success: true };
      case RETRIEVE_ARTICLE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  }
  
  
export const retrieveArticleByFilterReducer = (state = { getAllArticle: [] }, action) => {
  switch (action.type) {
    case RETRIEVE_ARTICLE_BY_FILTER_REQUEST:
      return { loading: true };
    case RETRIEVE_ARTICLE_BY_FILTER_SUCCESS:
      return { loading: false, articles: action.payload, success: true };
    case RETRIEVE_ARTICLE_BY_FILTER_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
}


export const retrieveArticlerRandomReducer = (state = { articles: [] }, action) => {
  switch (action.type) {
    case RETRIEVE_RANDOM_ARTICLE_REQUEST:
      return { loading: true };
    case RETRIEVE_RANDOM_ARTICLE_SUCCESS:
      return { loading: false, articles: action.payload, success: true };
    case RETRIEVE_RANDOM_ARTICLE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
}





export const articleDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_ARTICLE_REQUEST:
        return { loading: true };
      case DELETE_ARTICLE_SUCCESS:
        return { loading: false, success: true };
      case DELETE_ARTICLE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  }
  
  export const articleUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_ARTICLE_REQUEST:
        return { loading: true };
      case UPDATE_ARTICLE_SUCCESS:
        return { loading: false, success: true };
      case UPDATE_ARTICLE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  }
