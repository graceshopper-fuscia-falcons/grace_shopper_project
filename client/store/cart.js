import Axios from 'axios';

////// Action Types
const SET_CART = 'SET_CART';
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_QTY = 'UPDATE_QTY';

////// Action Creators
export const setCart = (cart) => ({ type: SET_CART, cart });
export const _addItem = (item) => ({ type: ADD_ITEM, item });
export const _removeItem = (item) => ({ type: REMOVE_ITEM, item });
export const _updateQty = (item) => ({ type: UPDATE_QTY, item });

////// Async Creators
export const fetchCart = (userId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: cart } = await Axios.get(`/api/users/${userId}/current-order`, {
      headers: {
        authorization: token
      }
    });
    dispatch(setCart(cart));
  }
}

export const addItem = (userId, plantId, qty) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: addedItem } = await Axios.post(`/api/users/${userId}/current-order/${plantId}`, { plantId, qty }, {
      headers: {
        authorization: token
      }
    })
    dispatch(_addItem(addedItem))
  }
}

export const removeItem = (userId, plantId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: removedItem } = await Axios.delete(`/api/users/${userId}/current-order/${plantId}`, {
      plantId,
      headers: {
        authorization: token
      }
    })
    dispatch(_removeItem(removedItem))
  }
}

export const updateQty = (userId, plantId, newQty) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: updatedItem } = await Axios.put(`/api/users/${userId}/current-order/${plantId}`, { newQty }, {
      headers: {
        authorization: token
      }
    })
    dispatch(_updateQty(updatedItem))
  }
}

//////Reducer
export default function (state = {cart: [], qty: 0}, action) {
  switch (action.type) {
    case SET_CART:
      let qty = 0;
      for (let item in action.cart) {
        qty += action.cart[item].quantity;
      }
      return { cart: action.cart, qty };
    case ADD_ITEM: 
    {
      let cart = [action.item, ...state.cart];
      let qty = 0;
      for (let item in cart) {
        qty += cart[item].quantity;
      }
      return {cart, qty}
    } 
    case REMOVE_ITEM:
      return [...state.filter(item => item.id !== action.item.id)]
    default:
      return state;
  }
}
