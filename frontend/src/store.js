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
import { retrieveTypeReducer } from './redux/reducers/typesReducers';
import { retrieveAttributeReducer } from './redux/reducers/attributeReducers';
import { addArticleReducer, articleDeleteReducer, articleUpdateReducer, retrieveAllArticleReducer, retrieveArticlerRandomReducer } from './redux/reducers/articleReducers';
import { addFileReducer } from './redux/reducers/fileReducers';
import { retrieveRulesReducer } from './redux/reducers/rulesReducers';
import { getArticleByFilter } from './redux/Actions/articleActions';

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
  getAllUser:retrieveAllUserReducer,
  userDelete:userDeleteReducer,
  getAllArticle:retrieveAllArticleReducer,
  articleDelete:articleDeleteReducer,
  getAllRule:retrieveRulesReducer,
  articleFilters: getArticleByFilter,
  RandomArticle:retrieveArticlerRandomReducer,
  listArrivals:userNewArrivalReducer,
  articleUpdate: articleUpdateReducer,
  demandList: demandAuthorReducer

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
