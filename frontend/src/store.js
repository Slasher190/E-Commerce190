import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer, productDetailsReducer } from "./reducers/productReducers";

const reducer = combineReducers({
  products: productReducer,
  productDetail: productDetailsReducer
});

let initialState = {};

const middileware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middileware))
);

export default store;
