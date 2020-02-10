import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, FlatList } from 'react-native';
import { useHistory, BackButton } from 'react-router-native';
import { ButtonIconText, themeColors, ConfirmFooter, ValueUnit, HorisontalField } from '../common';
import { componentStyle } from '../../styles';

export const Dashboard5x5 = ({ user }) => {
  const history = useHistory();
  const data = user.workouts.strongLifts
  const values = [
    { name: 'Squat', value: data.Squat },
    { name: 'Bench Press', value: data['Bench Press'] },
    { name: 'Barbell Row', value: data['Barbell Row'] },
    { name: 'Overhead Press', value: data['Overhead Press'] },
    { name: 'Deadlift', value: data.Deadlift },
  ]
  return (
    <View style={styles.container}>
      <StatusBar hidden animated />
      <View style={styles.header}>
        <Text style={componentStyle.title}>Strong Lifts</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={[styles.weightsContainer, { borderBottomWidth: 1 }]}>
          <HorisontalField title={values[0].name} value={values[0].value} unit='kg' borderColor='#888' />
          <HorisontalField title={values[1].name} value={values[1].value} unit='kg' borderColor='#888' />
          <HorisontalField title={values[2].name} value={values[2].value} unit='kg' lastItem />
        </View>
        <View style={styles.weightsContainer}>
          <HorisontalField title={values[3].name} value={values[3].value} unit='kg' borderColor='#888' />
          <HorisontalField title={values[4].name} value={values[4].value} unit='kg' lastItem />
        </View>
      </View>
      <ButtonIconText
        blankStyle style={styles.startBtn}
        text='Start Workout' textStyle={{ fontSize: 40 }}
        icon='dumbbell' iconType='fa5' iconStyle={{ marginRight: 10 }}
        onPress={() => history.push({ pathname: 'workout-5x5', state: user })}
      />
      <ConfirmFooter
        confirmText='Edit Weights' confirmIcon='wpforms' confirmIconType='fa5'
        onConfirm={() => history.push({ pathname: 'weights-form5x5', state: user })}
        disableConfirm={!values}
      />
      <BackButton />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    backgroundColor: themeColors.themePrimary,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 10,
  },
  startBtn: {
    backgroundColor: themeColors.themePrimary,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 4,
  },
  weightsContainer: {
    backgroundColor: themeColors.transparentBody,
    flexDirection: 'row',
    paddingVertical: 10,
    width: '100%',
    borderColor: '#888'
  },
});