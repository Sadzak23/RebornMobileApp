import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Provider } from 'react-redux';
import configureStore from './redux/store/reduxStore';
import { setUser } from './redux/actions/user';
import { Spinner, resizeGooglePhoto } from './components/common';
import LoginScreen from './components/Login/LoginScreen';
import AppRouter from './routers/AppRouter';
import { onSignOut, configureGoogleSignIn } from './components/Login/GoogleLogin';

const store = configureStore()
let provider
const App = () => {
  const [loggedIn, setLoggedIn] = useState(null)
  useEffect(() => {
    configureGoogleSignIn();
    auth().onAuthStateChanged((userData) => {
      if (userData) {
        const userRef = database().ref(`users/${userData.uid}`)
        provider = userData.providerData[0].providerId
        const setUserData = async () => {
          const user = await userRef.once('value')
          if (user.val()) store.dispatch(setUser(user.val()))
          else {
            const newUser = {
              userName: userData.displayName,
              email: userData.email,
              photoURL: userData.photoURL ? resizeGooglePhoto(userData.photoURL, 250) : '',
              id: userData.uid,
              birthdate: '',
              firstName: '',
              gender: '',
              height: '',
              lastName: '',
              weight: '',
              workouts: {
                history: ''
              }
            };
            database().ref(`users/${userData.uid}`).update(newUser)
              .then(() => {
                store.dispatch(setUser(newUser))
              })
          }
        }
        setUserData()
        setLoggedIn(true)
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const renderContent = () => {
    switch (loggedIn) {
      case true:
        return (
          <Provider store={store}>
            <AppRouter onLogout={onLogout} />
          </Provider>
        )
      case false:
        return <LoginScreen loading={loggedIn} setLoading={setLoggedIn} />
      default:
        return <Spinner />
    }
  }
  return renderContent()
}

const onLogout = () => {
  auth().signOut();
  provider === 'google.com' && onSignOut();
}
export default App;