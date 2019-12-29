import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import database from '@react-native-firebase/database';
import { useHistory, BackButton } from 'react-router-native';
import ImagePicker from 'react-native-image-crop-picker';
import { themeColors, ButtonIcon, DatePicker, formatDateEU, ListItem, Icon } from '../common';
import { setUser } from '../../redux/actions/user';
import { connect } from 'react-redux';
import { PhotoChange } from './PhotoChange';

export const UserForm = ({ location, setUser }) => {
  const user = location.state
  const history = useHistory()
  const [showModal, setShowModal] = useState(false)
  const [userName, setUserName] = useState(user ? user.userName : '')
  const [firstName, setFirstName] = useState(user ? user.firstName : '')
  const [lastName, setLastName] = useState(user ? user.lastName : '')
  const [gender, setGender] = useState(user ? user.gender : '')
  const [birthdate, setBirthdate] = useState(user.birthdate ? user.birthdate : '')
  const [height, setHeight] = useState(user ? user.height : '')
  const [weight, setWeight] = useState(user ? user.weight : '')
  const [photo, setPhoto] = useState(user ? user.photoURL : '')

  const [error, setError] = useState('')

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
    <ScrollView>
      <View style={styles.container}>
        <PhotoChange user={user} setUser={setUser} showModal={showModal} setShowModal={setShowModal} setPhoto={setPhoto} />
        {!!error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Image source={photo ? { uri: photo } : avatarMale} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <ListItem iconName='ios-person' iconType='ion' label='Nickname' children={
            <TextInput autoCorrect={false} style={styles.input}
              onChangeText={(e) => setUserName(e)}
              value={userName}
              placeholder='Anonimous'
            />}
          />
          <ListItem label='First Name' iconName='ios-person' iconType='ion' children={
            <TextInput autoCorrect={false} style={styles.input}
              onChangeText={(e) => setFirstName(e)}
              value={firstName}
              placeholder='Anonimous'
            />}
          />
          <ListItem label='Last Name' iconName='ios-person' iconType='ion' children={
            <TextInput autoCorrect={false} style={styles.input}
              onChangeText={(e) => setLastName(e)}
              value={lastName}
              placeholder='Anonimous'
            />}
          />
          <ListItem label='Birthdate' iconName='birthday-cake' iconType='fa' iconSize={22} children={
            <DatePicker
              timeStamp={birthdate ? birthdate : 631148400000}
              setDate={setBirthdate}
              btnText={formatDateEU(birthdate ? birthdate : 631148400000)}
              btnStyle={styles.input}
            />}
          />
          <ListItem label='Height' iconName='altimeter' children={
            <View style={{ ...styles.input, flexDirection: 'row' }}>
              <TextInput autoCorrect={false} style={styles.inputLabel}
                onChangeText={(e) => setHeight(e)}
                value={height}
                placeholder='0'
              />
              <Text>cm</Text>
            </View>
          }
          />
          <ListItem label='Weight' iconName='scale-bathroom' children={
            <View style={{ ...styles.input, flexDirection: 'row' }}>
              <TextInput autoCorrect={false} style={styles.inputLabel}
                onChangeText={(e) => setWeight(e)}
                value={weight}
                placeholder='0'
              />
              <Text>cm</Text>
            </View>
          } />
          <ListItem label='Gender' lastInput
            iconName={gender === 'male' ? 'male' : 'female'}
            iconType='fa'
            children={
              <TouchableOpacity
                style={{ ...styles.input, flexDirection: 'row', borderWidth: 0 }}
                onPress={() => setGender(gender === 'male' ? 'female' : 'male')}
              >
                <Text style={styles.text}>Male</Text>
                <Icon style={{ marginHorizontal: 5 }}
                  icon={gender === 'female' ? 'toggle-switch-outline' : 'toggle-switch-off'}
                  size={45}
                />
                <Text style={styles.text}>Female</Text>
              </TouchableOpacity>
            }
          />
        </View>
        <ButtonIcon icon='user-check' iconType='fa5'
          style={styles.submitBtn}
          onPress={onSubmit}
        />
      </View>
      <BackButton />
    </ScrollView>
  );
};

const fullWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: fullWidth,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  formContainer: {
    marginVertical: 20,
    width: '100%'
  },
  input: {
    fontSize: 16,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
    borderColor: themeColors.offWhite,
    height: 50,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    textAlign: 'right',
    fontSize: 20,
    width: 50
  },
  submitBtn: {
    backgroundColor: themeColors.themeColor,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: themeColors.offWhite,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 20,
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  avatar: {
    height: 150,
    width: 150,
    borderWidth: 5,
    borderColor: themeColors.header,
    borderRadius: 100,
    marginTop: 20,
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