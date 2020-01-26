import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/user';
import sensorsReducer from '../reducers/sensors';

export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      sensors: sensorsReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return store
};