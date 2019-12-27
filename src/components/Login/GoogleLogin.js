import auth from '@react-native-firebase/auth';
import { GoogleSignin } from 'react-native-google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '16003841720-eodq3r6g60auqvedpk0t7g7pc4p1uhmt.apps.googleusercontent.com',
  });
};

export const onSignIn = async (setLoading) => {
  setLoading(null); // Set LoggedIn to null, and show Spinner
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { accessToken, idToken } = await GoogleSignin.signIn();
    await auth().signInWithCredential(
      auth.GoogleAuthProvider.credential(idToken, accessToken)
    );
  } catch (error) {
    setLoading(false)
    console.log('Message', error.message);
  }
};

export const onSignOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};
