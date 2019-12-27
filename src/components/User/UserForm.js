import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import database from '@react-native-firebase/database';
import { useHistory } from 'react-router-native';
import { LoginInput, themeColors, ButtonIcon, DatePicker, formatDateEU } from '../common';
import { setUser } from '../../redux/actions/user';
import { connect } from 'react-redux';

export const UserForm = ({ location, setUser }) => {
  const user = location.state
  const [userName, setUserName] = useState(user ? user.userName : '')
  const [firstName, setFirstName] = useState(user ? user.firstName : '')
  const [lastName, setLastName] = useState(user ? user.lastName : '')
  const [gender, setGender] = useState(user ? user.gender : '')
  const [birthdate, setBirthdate] = useState(user.birthdate ? user.birthdate : '')
  const [height, setHeight] = useState(user ? user.height : '')
  const [weight, setWeight] = useState(user ? user.weight : '')

  const [error, setError] = useState('')
  const history = useHistory()

  const onSubmit = async () => {
    await database().ref(`users/${user.id}`).update({
      userName, firstName, lastName, gender, birthdate, height, weight,
      email: user.email,
      photoUrl: user.photoUrl,
      activeUser: false,
      workouts: {
        history: ''
      }
    });
    setUser({ ...user, userName, firstName, lastName, gender, birthdate, height, weight })
    history.goBack();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.error}>{error}</Text>
      <LoginInput
        iconName='ios-person'
        iconType='ion'
        onChange={e => { setUserName(e); setError('') }}
        value={userName}
        placeholder='First Name'
        returnKeyType='next'
      />
      <LoginInput
        iconName='ios-person'
        iconType='ion'
        onChange={e => { setFirstName(e); setError('') }}
        value={firstName}
        placeholder='First Name'
        returnKeyType='next'
      />
      <LoginInput
        iconName='ios-person'
        iconType='ion'
        onChange={e => { setLastName(e); setError('') }}
        value={lastName}
        placeholder='Last Name'
        returnKeyType='done'
      />
      <Text style={{ textAlign: 'center' }}>Set Birthdate</Text>
      <DatePicker
        timeStamp={birthdate ? birthdate : 631148400000}
        setDate={setBirthdate}
        btnText={formatDateEU(birthdate ? birthdate : 631148400000)}
      />
      <LoginInput
        iconName='altimeter'
        onChange={e => { setHeight(e); setError('') }}
        value={height}
        placeholder='Height'
        returnKeyType='done'
      />
      <LoginInput
        iconName='scale-bathroom'
        onChange={e => { setWeight(e); setError('') }}
        value={weight}
        placeholder='Weight'
        returnKeyType='done'
      />
      <View style={styles.dualContainer}>
        <ButtonIcon icon='male' iconType='fa'
          style={[styles.genderBtn, gender === 'male' && styles.genderActive]}
          onPress={() => setGender('male')}
        />
        <ButtonIcon icon='female' iconType='fa'
          style={[styles.genderBtn, gender === 'female' && styles.genderActive]}
          onPress={() => setGender('female')}
        />
      </View>
      <ButtonIcon icon='user-check' iconType='fa5'
        style={{ ...styles.genderBtn, backgroundColor: themeColors.themeColor }}
        onPress={onSubmit}
      />
    </View>
  );
};

const fullWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: fullWidth,
    paddingBottom: '30%',
    paddingHorizontal: 50,
  },
  input: {
    backgroundColor: themeColors.transparentWhite,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 25,
    marginBottom: 20
  },
  birthdate: {
    color: themeColors.offWhite
  },
  dualContainer: {
    flexDirection: 'row',
  },
  genderBtn: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: themeColors.offWhite,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 20,
    alignItems: 'center',
    flex: 1,
  },
  genderActive: {
    backgroundColor: 'blue'
  },

  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
})

export default connect(undefined, mapDispatchToProps)(UserForm)