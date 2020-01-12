import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TextInput, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { useHistory, BackButton } from 'react-router-native';
import database from '@react-native-firebase/database';
import Modal, { ModalContent, ScaleAnimation } from 'react-native-modals';
import Orientation from 'react-native-orientation-locker';
import backgroundImg from '../../images/female-5x5.jpg';
import { themeColors, ButtonText, ConfirmFooter } from '../common';
import { componentStyle, modalStyles } from '../../styles';
import { setEditData5x5 } from '../../redux/actions/user';

export const WeightsForm = ({ location, user=location.state, setEditData5x5 }) => {
  const userData = user.workouts.strongLifts;
  const [squat, setSquat] = useState(userData ? userData.Squat : '20')
  const [benchPress, setBenchPress] = useState(userData ? userData['Bench Press'] : '20')
  const [barbellRow, setBarbellRow] = useState(userData ? userData['Barbell Row'] : '20')
  const [overheadPress, setOverheadPress] = useState(userData ? userData['Overhead Press'] : '20')
  const [deadlift, setDeadlift] = useState(userData ? userData.Deadlift : '30')
  const [currentInput, setCurrentInput] = useState(0)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    }
  }, [])

  const history = useHistory();
  const getMaxWeight = (value) => Math.floor(value / 2.5) * 2.5  // Getting max value that is divisible by 2.5
  const get75ofMaxWeight = (value) => Math.round(value * 0.3) * 2.5  // Getting 75% of max value that is divisible by 2.5
  const exerciseCheck75 = (exercise, elseValue) => exercise ? get75ofMaxWeight(exercise) : elseValue

  const onInputPress = async (index) => {
    await setCurrentInput(index)
    setShowModal(true)
  }
  const onSave = async () => {
    const data = {
      trainingType: 'a',
      Squat: exerciseCheck75(squat, 20),
      'Bench Press': exerciseCheck75(benchPress, 20),
      'Barbell Row': exerciseCheck75(barbellRow, 20),
      'Overhead Press': exerciseCheck75(overheadPress, 20),
      Deadlift: exerciseCheck75(deadlift, 40)
    };
    await database().ref(`users/${user.id}/workouts/strongLifts`).update({ ...data })
    setEditData5x5(user, data);
  };

  const onEdit = async () => {
    const data = {
      Squat: getMaxWeight(squat),
      'Bench Press': getMaxWeight(benchPress),
      'Barbell Row': getMaxWeight(barbellRow),
      'Overhead Press': getMaxWeight(overheadPress),
      Deadlift: getMaxWeight(deadlift)
    };
    await database().ref(`users/${user.id}/workouts/strongLifts`).update({ ...data })
    setEditData5x5(user, data);
    history.goBack();
  };
  const exercisesInputs = [
    { name: 'Squat', value: squat, set: setSquat },
    { name: 'Bench Press', value: benchPress, set: setBenchPress },
    { name: 'Barbell Row', value: barbellRow, set: setBarbellRow },
    { name: 'Overhead Press', value: overheadPress, set: setOverheadPress },
    { name: 'Deadlift', value: deadlift, set: setDeadlift },
  ]
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden animated />
      <View style={styles.title}>
        <Text style={componentStyle.title}>Hello {user.firstName}</Text>
        <Text style={componentStyle.subtitle}>What is max weight you can lift 5 times?</Text>
        <Text>If you never tried an exercise, leave weight field blank</Text>
      </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              {exercisesInputs.map((e, index) =>
                <ButtonText
                  key={e.name}
                  blankStyle
                  style={styles.input}
                  text={`${e.name}: 5 x ${e.value}kg`}
                  onPress={() => onInputPress(index)}
                />
              )}
              <Modal visible={showModal}
                modalAnimation={new ScaleAnimation()}
                modalStyle={modalStyles.modal}
                onTouchOutside={() => setShowModal(false)}
                onHardwareBackPress={() => setShowModal(false)}
              >
                <ModalContent style={modalStyles.container}>
                  <Text style={modalStyles.title}>{exercisesInputs[currentInput].name}</Text>
                  <View style={modalStyles.input}>
                    <TextInput autoFocus autoCorrect={false} placeholder='0' selectTextOnFocus keyboardType='numeric'
                      onChangeText={(e) => {
                        if (!e || e.match(/^\d{1,3}([.]\d{0,1})?$/)) exercisesInputs[currentInput].set(e)
                      }}
                      style={{ textAlign: 'right', fontSize: 20, }}
                      value={String(exercisesInputs[currentInput].value)}
                      onSubmitEditing={() => setShowModal(false)}
                    />
                    <Text>kg</Text>
                  </View>
                </ModalContent>
              </Modal>
            </View>
            <BackButton />
          </View>
        </ScrollView>
        <ConfirmFooter
          onConfirm={userData ? onEdit : onSave}
          confirmText={userData ? 'Update' : 'Save'}
          confirmIcon={'content-save'}
          cancelText={'Go Back'}
        />
    </View>
  )
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    elevation: 10,
    flex: 1,
    padding: 10,
    marginBottom: 30
  },
  title: {
    backgroundColor: themeColors.theme2,
    alignItems: 'center',
    paddingBottom: 10
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.offWhite,
  },
  input: {
    backgroundColor: themeColors.transparentBlack,
    borderWidth: 2,
    borderColor: themeColors.offWhite,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 7,
    alignItems: 'center',
  },
});

const mapDispatchToProps = (dispatch) => ({
  setEditData5x5: (user, data) => dispatch(setEditData5x5(user, data))
})

export default connect(undefined, mapDispatchToProps)(WeightsForm);