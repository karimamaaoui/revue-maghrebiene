import {
    RETRIEVE_TYPES_REQUEST, RETRIEVE_TYPES_SUCCESS, RETRIEVE_TYPES_FAIL, DELETE_TYPE_REQUEST, DELETE_TYPE_SUCCESS, DELETE_TYPE_FAIL
} from "../Types/types";


export const retrieveTypeReducer = (state = { types: [] }, action) => {
    switch (action.type) {
        case RETRIEVE_TYPES_REQUEST:
            return { loading: true };
        case RETRIEVE_TYPES_SUCCESS:
            return { loading: false, types: action.payload };
        case RETRIEVE_TYPES_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}


export const typeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_TYPE_REQUEST:
        return { loading: true };
      case DELETE_TYPE_SUCCESS:
        return { loading: false, success: true };
      case DELETE_TYPE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  }
