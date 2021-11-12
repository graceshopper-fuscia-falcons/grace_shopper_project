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

export const addItem = (userId, plantId) => {
  return async (dispatch) => {
      const { data: addedItem } = await Axios.put(`/api/users/${userId}/current-order`, plantId)
      dispatch(_addItem(addedItem))
  }
}

export const removeItem = (userId, plantId) => {
  return async (dispatch) => {
      const { data: removedItem } = await Axios.delete(`/api/users/${userId}/current-order`, plantId)
      dispatch(_removeItem(removedItem))
  }
}

export const updateQty = (userId, plantId, newQty) => {
  return async (dispatch) => {
      const { data: updatedItem } = await Axios.put(`/api/users/${userId}/current-order/${plantId}`, newQty)
      dispatch(_updateQty(updatedItem))
  }
}

//////Reducer
export default function (state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_ITEM:
      return [...state, action.item]
    case REMOVE_ITEM:
      return [...state.filter(item => item.id !== action.item.id)]
    default:
      return state;
  }
}
