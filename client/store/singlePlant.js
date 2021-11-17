import Axios from 'axios';

////// Action Types
const SET_PLANT = 'SET_PLANT'
const CLEAR = 'CLEAR'

////// Action Creators
export const setPlant = (plant) => ({type: SET_PLANT, plant})
export const _clearPlant = () => ({type: CLEAR})

////// Async Creators
export const fetchPlant = (plantId) => {
  
    return async (dispatch) => {
        const {data: plant} = await Axios.get(`/api/plants/${plantId}`);
        dispatch(setPlant(plant));
    }
}

export const clearPlant = () => {
  return async (dispatch) => {
    dispatch(_clearPlant())
  }
}

//////Reducer
export default function (state = {}, action) {
    switch(action.type) {
      case SET_PLANT :
        return action.plant;
      case CLEAR:
        return {}
      default :
        return state;
    }
  }