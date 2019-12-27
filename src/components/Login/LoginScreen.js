import React from 'react';
import { View, Image, StyleSheet, Dimensions, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import logo from '../../images/logo.png';
import backgroundImg from '../../images/backgroundImg.jpg';
import { onSignIn } from './GoogleLogin';
import { ButtonIconText, themeColors } from '../common';
//import LoginForm from './LoginForm';

const LoginScreen = ({ setLoading }) => {
  return (
    <ImageBackground source={backgroundImg} style={styles.background}>
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior='padding'
        >
          <View style={{ paddingTop: '20%' }}>
            <Image source={logo} style={styles.logo} />
            {/*
            <LoginForm />
          */}
            <View style={styles.googleContainer}>
              <ButtonIconText
                onPress={() => onSignIn(setLoading)}
                icon='google'
                iconSize={20}
                iconStyle={styles.googleIcon}
                text='Sign in with Google'
                style={styles.googleBtn}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHT,
  },
  logo: {
    alignSelf: 'center',
  },
  googleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  googleBtn: {
    backgroundColor: themeColors.themeColor,
    //borderWidth: 3,
  },
  googleIcon: {
    marginRight: 15
  }
});

export default LoginScreen;