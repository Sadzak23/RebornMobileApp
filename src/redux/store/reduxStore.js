import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/user';
import bluetoothReducer from '../reducers/bluetooth';

export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      bluetooth: bluetoothReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return store
};