import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ImageBackground, BackHandler } from 'react-native';
import logo from '../../images/logo.png';
import backgroundImg from '../../images/backgroundImg.jpg';
import LoginForm from './LoginForm';
import { onSignIn } from './GoogleLogin';
import { ButtonIconText, themeColors, fullWidth, fullHeignt } from '../common';

const LoginScreen = ({ setLoading }) => {
  const [emailLogin, setEmailLogin] = useState(false)
  const Screen1 = () => (
    <View style={styles.container1}>
      <Image source={logo} style={styles.logo} />
      <ButtonIconText
        onPress={() => setEmailLogin(true)}
        icon='email'
        iconSize={20}
        iconStyle={styles.googleIcon}
        style={styles.btn}
        text='Sign in with Email'
      />
      <ButtonIconText
        onPress={() => onSignIn(setLoading)}
        icon='google'
        iconSize={20}
        iconStyle={styles.googleIcon}
        style={styles.btn}
        text='Sign in with Google'
      />
    </View>
  );
  const Screen2 = () => (
    <View style={styles.container2}>
      <LoginForm />
      <ButtonIconText
        onPress={() => setEmailLogin(false)}
        iconSize={20}
        iconStyle={styles.googleIcon}
        style={{ marginTop: 20 }}
        text='Cancel'
      />
    </View>
  );
  const onBackPress = () => {
    setEmailLogin(false)
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
    }
  }, []);

  return (
    <ImageBackground source={backgroundImg} style={styles.background}>
      <View>
        {!emailLogin ? <Screen1 /> : <Screen2 />}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: fullWidth,
    height: fullHeignt,
    position: 'absolute',
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: fullHeignt / 2,
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
    height: fullHeignt / 1.5,
  },
  logo: {
    marginTop: 50,
    alignSelf: 'center',
  },
  btn: {
    backgroundColor: themeColors.themePrimary,
    justifyContent: 'center',
    marginBottom: 15,
    width: 300
  },
  googleIcon: {
    marginRight: 15
  }
});

export default LoginScreen;