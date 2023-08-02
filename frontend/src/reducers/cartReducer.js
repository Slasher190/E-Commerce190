import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isCartItemExist = state.cartItems.find(
        (i) => i.product === item.product
      ); // product => product_id
      if (isCartItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isCartItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    default:
      return state;
  }
};