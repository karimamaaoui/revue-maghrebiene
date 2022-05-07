import { ADD_FILE_FAIL, ADD_FILE_REQUEST, ADD_FILE_SUCCESS } from "../Types/types";

export const addFileReducer = (state = { multiple_files: [] }, action) => {
    switch (action.type) {
        case ADD_FILE_REQUEST:
            return { loading: true };
        case ADD_FILE_SUCCESS:
            return { loading: false, multiple_files: action.payload };
        case ADD_FILE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}