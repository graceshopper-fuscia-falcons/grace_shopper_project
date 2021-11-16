import Axios from 'axios';
import ls from 'local-storage'

////// Action Types
const SET_CART = 'SET_CART';
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_QTY = 'UPDATE_QTY';
const CHECKOUT = 'CHECKOUT';

////// Action Creators
export const setCart = (cart) => ({ type: SET_CART, cart });
export const _addItem = (item) => ({ type: ADD_ITEM, item });
export const _removeItem = (item) => ({ type: REMOVE_ITEM, item });
export const _updateQty = (item) => ({ type: UPDATE_QTY, item });
export const _checkout = () => ({ type: CHECKOUT });

////// Async Creators
export const fetchLocalCart = () => {
  return async (dispatch) => {
    dispatch(setCart(ls.get('cart').cart));
  }
}

export const addLocalItem = (plant) => {
  return async (dispatch) => {
    dispatch(_addItem(plant))
  }
}

export const removeLocalItem = (plant) => {
  return async (dispatch) => {
    dispatch(_removeItem(plant))
  }
}

export const updateLocalQty = (plant) => {
  return async (dispatch) => {
    dispatch(_updateQty(plant))
  }
}

export const checkoutLocal = () => {
  return async (dispatch) => {
    dispatch(_checkout())
  }
}

//////Reducer
export default function (state = { cart: [], qty: 0 }, action) {
  switch (action.type) {
    case SET_CART:
      {
        let qty = 0;
        for (let item in action.cart) {
          qty += action.cart[item].quantity;
        }
        return { cart: action.cart, qty };
      }
    case ADD_ITEM:
      {
        let cart = [...state.cart]
        cart = [...cart.map(item => item.plantId !== action.item.id ? item : {...item, quantity: this.quantity += action.item.quantity})]

        let qty = 0;
        for (let item in cart) {
          qty += cart[item].quantity;
        }
        
        return { cart, qty }
      }
    case REMOVE_ITEM:
      {
        let cart = [...state.cart.filter(item => item.id !== action.item.id)];
        let qty = 0;
        for (let item in cart) {
          qty += cart[item].quantity;
        }
        return { cart, qty }
      }
    case UPDATE_QTY:
      {
        let cart = [...state.cart.map(item => item.id === action.item.id ? action.item : item)]
        let qty = 0;
        for (let item in cart) {
          qty += cart[item].quantity;
        }
        return { cart, qty }
      }
    case CHECKOUT:
      {
        return { cart: [], qty: 0 }
      }
    default:
      return state;
  }
}
