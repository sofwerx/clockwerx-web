import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import * as allReducers from './reducers/all.reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    
    combineReducers({
        ...allReducers,}
    // }),composeEnhancers(
    // applyMiddleware(logger),
));

export default store;