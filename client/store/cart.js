import Axios from 'axios';

////// Action Types
const SET_CART = 'SET_CART';

////// Action Creators
export const setCart = (cart) => ({ type: SET_CART, cart });

////// Async Creators
export const fetchCart = (id) => {
  return async (dispatch) => {
    const { data: cart } = await Axios.get(`/api/users/${id}/current-order`);
    dispatch(setCart(cart));
  }
}

//////Reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}