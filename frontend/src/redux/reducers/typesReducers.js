import {
    RETRIEVE_TYPES_REQUEST, RETRIEVE_TYPES_SUCCESS, RETRIEVE_TYPES_FAIL
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