import { DELETE_RULE_FAIL, DELETE_RULE_REQUEST, DELETE_RULE_SUCCESS, RETRIEVE_RULES_FAIL, RETRIEVE_RULES_REQUEST, RETRIEVE_RULES_SUCCESS } from "../Types/types";


export const retrieveRulesReducer = (state = { rules: [] }, action) => {
    switch (action.type) {
        case RETRIEVE_RULES_REQUEST:
            return { loading: true };
        case RETRIEVE_RULES_SUCCESS:
            return { loading: false, rules: action.payload };
        case RETRIEVE_RULES_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}


export const ruleDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_RULE_REQUEST:
        return { loading: true };
      case DELETE_RULE_SUCCESS:
        return { loading: false, success: true };
      case DELETE_RULE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  }
  