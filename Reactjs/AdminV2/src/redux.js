// import { logger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createStateSyncMiddleware } from 'redux-state-sync';
import { compose, createStore, applyMiddleware } from 'redux';

import actionTypes from './store/actions/actionTypes';
import createRootReducer from './store/reducers/rootReducer';

const environment = process.env.NODE_ENV || 'development';
let isDevelopment = environment === 'development';

// hide redux logs
isDevelopment = false;

export const history = createBrowserHistory({
  basename: process.env.REACT_APP_ROUTER_BASE_NAME,
});

const reduxStateSyncConfig = {
  whitelist: [actionTypes.APP_START_UP_COMPLETE, actionTypes.CHANGE_LANGUAGE],
};

const rootReducer = createRootReducer(history);
const middleware = [
  routerMiddleware(history),
  thunkMiddleware,
  createStateSyncMiddleware(reduxStateSyncConfig),
];
// if (isDevelopment) middleware.push(logger);

const composeEnhancers =
  isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const reduxStore = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export const { dispatch } = reduxStore;

export const persistor = persistStore(reduxStore);

export default reduxStore;
