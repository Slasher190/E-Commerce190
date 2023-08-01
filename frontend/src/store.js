import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetail: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
});

let initialState = {};

const middileware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middileware))
);

export default store;
