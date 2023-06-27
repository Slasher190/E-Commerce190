import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const getProduct = () => async (dispatch) => {
  try {
    // const query = { search, filter, page, perPage };
    // /products?filter=electronics
    // page = 1,2,3,
    // search mob...
    // perPage = 10,8 ...products
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const { data } = await axios.get("/api/v1/products");
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductDetail = (id) => async (dispatch) => {
  try {
    // const query = { search, filter, page, perPage };
    // /products?filter=electronics
    // page = 1,2,3,
    // search mob...
    // perPage = 10,8 ...products
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data?.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clearing error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
