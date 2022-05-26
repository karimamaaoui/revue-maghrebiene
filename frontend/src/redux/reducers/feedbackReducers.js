import { ADD_FEEDBACK_FAIL, ADD_FEEDBACK_REQUEST, 
    ADD_FEEDBACK_SUCCESS, RETRIEVE_FEEDBACK_FAIL, RETRIEVE_FEEDBACK_REQUEST,
     RETRIEVE_FEEDBACK_SUCCESS } from "../Types/types";

export const addFeedBackReducer = (state = { formData: [] }, action) => {
    switch (action.type) {
        case ADD_FEEDBACK_REQUEST:
            return { loading: true };
        case ADD_FEEDBACK_SUCCESS:
            return { loading: false, formData: action.payload };
        case ADD_FEEDBACK_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}


export const retrieveAllFeedbackReducer = (state = { feedbacks: [] }, action) => {
    
    switch (action.type) {
        case RETRIEVE_FEEDBACK_REQUEST:
            return { loading: true };
        case RETRIEVE_FEEDBACK_SUCCESS:
            return { loading: false, feedbacks: action.payload, success: true };
            case RETRIEVE_FEEDBACK_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}
