import Axios from 'axios';

////// Action Types
const SET_PLANTS = 'SET_PLANTS';
const CREATE_PLANT = 'CREATE_PLANT';
const REMOVE_PLANT = 'REMOVE_PLANT';
const UPDATE_PLANT = 'UPUDATE_PLANT';

////// Action Creators
export const setPlants = (plants) => ({type: SET_PLANTS, plants});
export const _createPlant = (plant) => ({type: CREATE_PLANT, plant});
export const _removePlant = (plant) => ({type: REMOVE_PLANT, plant});
export const _updatePlant = (plant) => ({type: UPDATE_PLANT, plant});

////// Async Creators
export const fetchPlants = () => {
    return async (dispatch) => {
        const {data: plants} = await Axios.get('/api/plants');
        dispatch(setPlants(plants))
    }
}

export const createPlant = (plant, history) => {
    return async (dispatch) => {
        const {data: created} = await Axios.post('/api/plants', plant);
        dispatch(_createPlant(created));
        history.push('/');
    }
}

export const removePlant = (userId, history) => {
    return async (dispatch) => {
        const {data: removed} = await Axios.delete(`/api/plants/${id}`);
        dispatch(_removePlant(removed));
        history.push('/');
    }
}

export const updatePlant = (plant, history) => {
    return async (dispatch)  => {
        const {data: updated} = await Axios.put(`api/plants/${plant.id}`);
        dispatch(_updatePlant(updated))
        history.push('/')
    }
}

////// Reducer
export default function (state = [], action) {
    switch(action.type) {
        case SET_PLANTS:
            return action.plants;
        case CREATE_PLANT:
            return [...state, action.plant];
        case REMOVE_PLANT:
            return [...state.filter(plant => plant.id !== action.plant.id)];
        case UPDATE_PLANT:
            return state.map(plant => plant.id === action.plant.id ? action.plant : plant);
        default: 
            return state;
    }
}