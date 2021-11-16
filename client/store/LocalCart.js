import Axios from 'axios';
import ls from 'local-storage'

////// Action Types
const SET_LOCAL_CART = 'SET_LOCAL_CART';
const ADD_LOCAL_ITEM = "ADD_LOCAL_ITEM";
const REMOVE_LOCAL_ITEM = 'REMOVE_LOCAL_ITEM';
const UPDATE_LOCAL_QTY = 'UPDATE_LOCAL_QTY';
const CHECKOUT_LOCAL = 'CHECKOUT_LOCAL';

////// Action Creators
export const setLocalCart = (cart) => ({ type: SET_LOCAL_CART, cart });
export const _addLocalItem = (item) => ({ type: ADD_LOCAL_ITEM, item });
export const _removeLocalItem = (item) => ({ type: REMOVE_LOCAL_ITEM, item });
export const _updateLocalQty = (item) => ({ type: UPDATE_LOCAL_QTY, item });
export const _checkoutLocal = () => ({ type: CHECKOUT_LOCAL });

////// Async Creators
export const fetchLocalCart = () => {
  return async (dispatch) => {
    dispatch(setLocalCart(ls.get('cart').cart));
  }
}

export const addLocalItem = (plant) => {
  return async (dispatch) => {
    dispatch(_addLocalItem(plant))
  }
}

export const removeLocalItem = (plant) => {
  return async (dispatch) => {
    dispatch(_removeLocalItem(plant))
  }
}

export const updateLocalQty = (plant) => {
  return async (dispatch) => {
    dispatch(_updateLocalQty(plant))
  }
}

export const checkoutLocal = () => {
  return async (dispatch) => {
    dispatch(_checkoutLocal())
  }
}

//////Reducer
export default function (state = { cart: [], qty: 0 }, action) {
  switch (action.type) {
    case SET_LOCAL_CART:
      {
        let qty = 0;
        for (let item in action.cart) {
          qty += action.cart[item].quantity;
        }
        return { cart: action.cart, qty };
      }
    case ADD_LOCAL_ITEM:
      {
        let cart = [...state.cart]
        cart = [...cart.map(item => item.plantId !== action.item.id ? item : {...item, quantity: this.quantity += action.item.quantity})]

        let qty = 0;
        for (let item in cart) {
          qty += cart[item].quantity;
        }
        
        return { cart, qty }
      }
    case REMOVE_LOCAL_ITEM:
      {
        let cart = [...state.cart.filter(item => item.id !== action.item.id)];
        let qty = 0;
        for (let item in cart) {
          qty += cart[item].quantity;
        }
        return { cart, qty }
      }
    case UPDATE_LOCAL_QTY:
      {
        let cart = [...state.cart.map(item => item.id === action.item.id ? action.item : item)]
        let qty = 0;
        for (let item in cart) {
          qty += cart[item].quantity;
        }
        return { cart, qty }
      }
    case CHECKOUT_LOCAL:
      {
        return { cart: [], qty: 0 }
      }
    default:
      return state;
  }
}
