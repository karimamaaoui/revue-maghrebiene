import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  userLoginReducer,
  userRegisterReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
  userUpdateReducer,
  userUpdatePictureReducer,
  retrieveAllUserReducer,
  userDeleteReducer,
  userNewArrivalReducer,
  demandAuthorReducer
} from './redux/reducers/userReducer';
import { retrieveTypeReducer, typeDeleteReducer } from './redux/reducers/typesReducers';
import { attributeDeleteReducer, retrieveAttributeReducer } from './redux/reducers/attributeReducers';
import { addArticleReducer, articleDeleteReducer, articleUpdateReducer, retrieveAllArticleReducer, retrieveArticlerRandomReducer } from './redux/reducers/articleReducers';
import { addFileReducer, addPostReducer } from './redux/reducers/fileReducers';
import { retrieveRulesReducer, ruleDeleteReducer } from './redux/reducers/rulesReducers';
import { getArticleByFilter } from './redux/Actions/articleActions';
import { addFeedBackReducer, retreiveFeedBackReducer, retrieveAllFeedbackReducer } from './redux/reducers/feedbackReducers';
import { getUserByFilter } from './redux/Actions/actions';

const reducer = combineReducers({
  // here contain our reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPasswordReducer: userResetPasswordReducer,
  userUpdate: userUpdateReducer,
  userupdatePicture: userUpdatePictureReducer,
  typeList: retrieveTypeReducer,
  attributeList: retrieveAttributeReducer,
  addArticle: addArticleReducer,
  addFile:addFileReducer,
  addPost:addPostReducer,
  getAllUser:retrieveAllUserReducer,
  userDelete:userDeleteReducer,
  ruleDelete:ruleDeleteReducer,
  attributeDelete:attributeDeleteReducer,
  typeDelete:typeDeleteReducer,
  getAllArticle:retrieveAllArticleReducer,
  articleDelete:articleDeleteReducer,
  getAllRule:retrieveRulesReducer,
  articleFilters: getArticleByFilter,
  userFilters:getUserByFilter,
  RandomArticle:retrieveArticlerRandomReducer,
  listArrivals:userNewArrivalReducer,
  articleUpdate: articleUpdateReducer,
  demandList: demandAuthorReducer,
  addFeedback:addFeedBackReducer,
  feedbackList:retrieveAllFeedbackReducer

})

const userInfoFromStorage = localStorage.
  getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const intialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
