import { sensorActionTypes } from "../actions/bluetooth";
import { BleManager } from 'react-native-ble-plx';

const defaultState = {
  sensor: {},
  manager: new BleManager()
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case sensorActionTypes.addSensor:
      return {
        ...state,
        sensor: action.data
      };
    default:
      return state;
  }
}