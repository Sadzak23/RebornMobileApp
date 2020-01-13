export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        userName: action.userName,
        email: action.email,
        photoURL: action.photoURL,
        id: action.id,
        birthdate: action.birthdate,
        firstName: action.firstName,
        gender: action.gender,
        height: action.height,
        lastName: action.lastName,
        weight: action.weight,
        workouts: action.workouts
      };
    case 'SET/EDIT/SAVE_WORKOUT_5X5':
      return {
        ...action.user,
        workouts: {
          ...action.user.workouts,
          strongLifts: {
            ...action.user.workouts.strongLifts,
            ...action.data,
          },
        }
      };
    case 'ADD_WORKOUT_5X5':
      return {
        ...action.user,
        workouts: {
          ...action.user.workouts,
          strongLifts: {
            ...action.user.workouts.strongLifts,
            ...action.data.strongLifts
          },
          history: {
            ...action.user.workouts.history,
            ...action.data.history
          }
        }
      }
    case 'Logout':
      return {};
    default:
      return state;
  }
}