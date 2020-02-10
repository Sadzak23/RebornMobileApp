export const sensorActionTypes = {
  addSensor: 'ADD_SENSOR',
}
export const addSensor = (data) => ({
  type: sensorActionTypes.addSensor,
  data
});