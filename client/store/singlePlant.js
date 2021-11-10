import Axios from 'axios';

////// Action Types
const SET_PLANT = 'SET_PLANT'

////// Action Creators
export const setPlant = (plant) => ({type: SET_PLANT, plant})

////// Async Creators
export const fetchPlant = (plantId) => {
    return async (dispatch) => {
        const {data: plant} = await Axios.get(`/api/plants/${plantId}`);
        dispatch(setPlant(plant));
    }
}

//////Reducer
export default function (state = {}, action) {
    switch(action.type) {
      case SET_PLANT :
        return action.plant;
      default :
        return state;
    }
  }