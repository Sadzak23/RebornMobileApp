import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { ButtonText, Spinner, LoginInput, themeColors } from '../common';
import { createUserErrorReader, loginErrorReader } from './LoginErrors';

const LoginForm = () => {
  const [email, setEmail] = useState('a@a.com')
  const [password, setPassword] = useState('asd123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [secured, setSecured] = useState(true)
  const [newUser, setNewUser] = useState(false)

  const onLogin = () => {
    setError('')
    setLoading(true)
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((e) => {
        setError(loginErrorReader(e))
        setLoading(false)
      })
  };
  const onCreateAcount = () => {
    setError('')
    setLoading(true)
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((e) => {
        setError(createUserErrorReader(e))
        setLoading(false)
      })
  };

  return loading ?
    <Spinner color={themeColors.transparentWhite} backgroundColor={null} />
    :
    (
      <View style={styles.loginForm}>
        <Text style={styles.error}>{error}</Text>
        <LoginInput
          autoFocus
          autoCompleteType='email'
          iconName='ios-person'
          iconType='ion'
          onChange={e => { setEmail(e); setError('') }}
          value={email}
          auto
          placeholder='User / Email'
          returnKeyType='done'
        />
        <LoginInput
        autoCompleteType='password'
          iconName='ios-lock'
          iconType='ion'
          onChange={e => { setPassword(e); setError('') }}
          value={password}
          placeholder='Password'
          secured={secured}
          password
          onTogglePasswordVisibility={() => setSecured(!secured)}
          returnKeyType='send'
          onSubmitEditing={newUser ? onCreateAcount : onLogin}
        />
        {
          newUser ?
            <ButtonText onPress={onCreateAcount} style={{ marginBottom: 15 }} text='Register' /> :
            <ButtonText onPress={onLogin} style={{ marginBottom: 15 }} text='Login' />
        }
        <ButtonText
          onPress={() => setNewUser(!newUser)}
          blankStyle
          text={newUser ? 'Already a member? Click here!' : 'New user? Register Now'}
          textStyle={{ textAlign: 'center' }}
        />
      </View>
    );
};

const fullWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  loginForm: {
    width: fullWidth - 100,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default LoginForm;