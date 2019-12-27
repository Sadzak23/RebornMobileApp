export const createUserErrorReader = (e) => {
  switch (e.code) {
    case 'auth/weak-password':
      return 'Weak password'
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please Sign in'
    case 'auth/invalid-email':
      return 'Invalid email!'
    default:
      return 'User create failed!'
  }
}

export const loginErrorReader = (e) => {
  switch (e.code) {
    case 'auth/wrong-password':
      return 'Incorrect password'
    case 'auth/user-not-found':
      return 'User not found! New user? Please Register'
    case 'auth/invalid-email':
      return 'Email is not correctly formatted!'
    default:
      return 'Incorrect email or password!'
  }
}