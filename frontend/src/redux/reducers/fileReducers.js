import { ADD_FILE_FAIL, ADD_FILE_REQUEST, ADD_FILE_SUCCESS, ADD_POST_FAIL, ADD_POST_REQUEST, ADD_POST_SUCCESS } from "../Types/types";

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


export const addPostReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return { loading: true };
        case ADD_POST_SUCCESS:
            return { loading: false, posts: action.payload };
        case ADD_POST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}