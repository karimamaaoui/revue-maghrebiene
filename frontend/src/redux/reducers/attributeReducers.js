import {
    RETRIEVE_ATTRIBUTE_REQUEST, RETRIEVE_ATTRIBUTE_SUCCESS, RETRIEVE_ATTRIBUTE_FAIL, DELETE_ATTRIBUTE_REQUEST, DELETE_ATTRIBUTE_SUCCESS, DELETE_ATTRIBUTE_FAIL
} from "../Types/types";


export const retrieveAttributeReducer = (state = { attributes: [] }, action) => {
    switch (action.type) {
        case RETRIEVE_ATTRIBUTE_REQUEST:
            return { loading: true };
        case RETRIEVE_ATTRIBUTE_SUCCESS:
            return { loading: false, attributes: action.payload };
        case RETRIEVE_ATTRIBUTE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}


export const attributeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_ATTRIBUTE_REQUEST:
        return { loading: true };
      case DELETE_ATTRIBUTE_SUCCESS:
        return { loading: false, success: true };
      case DELETE_ATTRIBUTE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  }
  