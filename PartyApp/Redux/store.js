

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import ticketsItems from './Reducers/ticketsItem'

const reducers = combineReducers({
    ticketsItems: ticketsItems
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;