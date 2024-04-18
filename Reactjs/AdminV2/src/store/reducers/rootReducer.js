import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { connectRouter } from 'connected-react-router';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import appReducer from './appReducer';
import userReducer from './userReducer';
import adminReducer from './adminReducer';

const persistCommonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: 'user',
  whitelist: ['isLoggedIn', 'userInfo'],
};

const appPersistConfig = {
  ...persistCommonConfig,
  key: 'app',
  whilelist: ['langguage'],
};

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer,
  });
