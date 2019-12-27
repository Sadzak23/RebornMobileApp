export const setUser = ({
  id, userName, email, photoURL, birthdate, firstName, lastName,
  gender, height, weight, index, workouts
}) => ({
  type: 'SET_USER',
  id, userName, email, photoURL, birthdate, firstName, lastName,
  gender, height, weight, index, workouts
})

export const logout = () => ({
  type: 'LOGOUT'
});