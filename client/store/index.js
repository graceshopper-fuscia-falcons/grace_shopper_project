import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import plantsReducer from './plants'
import usersReducer from './users'
import singlePlantReducer from './singlePlant'
import singleUserReducer from './singleUser'
import cartReducer from './cart'
import localCartReducer from './LocalCart'

const reducer = combineReducers({ 
  auth,
  plantsReducer,
  usersReducer,
  singlePlantReducer,
  singleUserReducer,
  cartReducer,
  localCartReducer
 })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
