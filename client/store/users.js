import Axios from 'axios';

////// Action Types
const SET_USERS = 'SET_USERS';
const CREATE_USER = 'CREATE_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';

////// Action Creators
export const setUsers = (users) => ({type: SET_USERS, users});
export const _createUser = (user) => ({type: CREATE_USER, user});
export const _removeUser = (user) => ({type: REMOVE_USER, user});
export const _updateUser = (user) => ({type: UPDATE_USER, user});

////// Async Creators
export const fetchUsers = () => {
    return async (dispatch) => {
        const {data: users} = await Axios.get('/api/users');
        dispatch(setUsers(users))
    }
}

export const createUser = (user, history) => {
    return async (dispatch) => {
        const {data: created} = await Axios.post('/api/users', user);
        dispatch(_createUser(created));
        history.push('/');
    }
}

export const removeUser = (userId, history) => {
    return async (dispatch) => {
        const {data: removed} = await Axios.delete(`/api/users/${userId}`);
        dispatch(_removeUser(removed));
        history.push('/');
    }
}

export const updateUser = (user, history) => {
    return async (dispatch)  => {
        const {data: updated} = await Axios.put(`api/users/${user.id}`);
        dispatch(_updateUser(updated))
        history.push('/')
    }
}

////// Reducer
export default function (state = [], action) {
    switch(action.type) {
        case SET_USERS:
            return action.users;
        case CREATE_USER:
            return [...state, action.user];
        case REMOVE_USER:
            return [...state.filter(user => user.id !== action.user.id)];
        case UPDATE_USER:
            return state.map(user => user.id === action.user.id ? action.user : user);
        default: 
            return state;
    }
}