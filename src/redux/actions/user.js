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

//////////////////////////////// Strong Lifts ///////////////////////////////////

// SET/EDIT/SAVE_WORKOUT_5X5
export const setEditData5x5 = (user, data) => ({
  type: 'SET/EDIT/SAVE_WORKOUT_5X5',
  user,
  data
});

export const addWorkout5x5 = (user, data) => ({
  type: 'ADD_WORKOUT_5X5',
  user,
  data
});