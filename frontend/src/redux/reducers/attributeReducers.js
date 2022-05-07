import {
    RETRIEVE_ATTRIBUTE_REQUEST, RETRIEVE_ATTRIBUTE_SUCCESS, RETRIEVE_ATTRIBUTE_FAIL
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