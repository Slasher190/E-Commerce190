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

export const getProduct =
  (params = {}) =>
  async (dispatch) => {
    const {
      search = "",
      filter = "",
      page = 1,
      perPage = 5,
      price = "0-25000",
      rating = 0
    } = params;
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      const { data } = await axios.get("/api/v1/products", {
        params: { search, filter, page, perPage, price, rating },
      });
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
