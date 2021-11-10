import Axios from 'axios';

////// Action Types
const SET_CART = 'SET_CART';

////// Action Creators
export const setCart = (cart) => ({type: SET_CART, cart});

////// Async Creators
export const fetchCart = (arr) => {
    return async (dispatch) => {
        // Create new object with flowerId's as KEYS and the quantity of that flower as VALUES
        const uniqueFlowers = {};
        arr.map(function (item) { uniqueFlowers[item] = (uniqueFlowers[item] || 0) + 1 })

        // Create cart array containing objects with a flower KEY storing the flower object returned by Axios and a qty KEY holding the previously defined qty VALUE.
        const cart = [];
        for (let key in uniqueFlowers) {
            const {data: flower} = await Axios.get(`/api/plants/${key}`);  // ! plants => flowers eventually !
            cart.push({flower, qty: uniqueFlowers[key]})
        }
        dispatch(setCart(cart));
    }
}

//////Reducer
export default function (state = [], action) {
    switch(action.type) {
      case SET_CART :
        return action.cart;
      default :
        return state;
    }
  }