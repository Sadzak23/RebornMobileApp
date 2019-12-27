export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        userName: action.userName,
        email: action.email,
        photoURL: action.photoURL,
        id: action.id,
        activeUser: false,
        birthdate: action.birthdate,
        firstName: action.firstName,
        gender: action.gender,
        height: action.height,
        index: action.index,
        lastName: action.lastName,
        weight: action.weight,
        workouts: action.workouts
      };
    case 'Logout':
      return {};
    default:
      return state;
  }
}