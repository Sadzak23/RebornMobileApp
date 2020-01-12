import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { useHistory, BackButton } from 'react-router-native';
import { ButtonIconText, themeColors, ConfirmFooter } from '../common';
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
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar hidden animated />
      <View style={styles.contentContainer}>
        <Text style={componentStyle.title}>Strong Lifts</Text>
        <ButtonIconText
          blankStyle
          style={styles.editBtn}
          onPress={() => history.push({ pathname: 'weights-form5x5', state: user })}
          text='Edit Weights' icon='wpforms' iconType='fa5' iconStyle={{ marginRight: 5 }} />
        {values &&
          <View style={styles.valueContainer}>
            <Text style={[componentStyle.subtitle, { marginBottom: 10 }]}>Current weights:</Text>
            {values.map(e => <Text key={e.name}>{e.name}: <Text style={styles.value}>{e.value}</Text>kg</Text>)}
          </View>
        }
      </View>
      <ConfirmFooter
        confirmText='Start Workout'
        confirmIcon='dumbbell'
        confirmIconType='fa5'
        confirmIconSize={18}
        onConfirm={() => history.push({
          pathname: 'workout-5x5',
          state: user
        })}
        disableConfirm={!values}
      />
      <BackButton />
    </ScrollView>
  )
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  editBtn: {
    backgroundColor: themeColors.themeColor,
    padding: 15,
  },
  valueContainer: {
    alignItems: 'center',
    backgroundColor: themeColors.theme2,
    borderWidth: 2,
    borderColor: themeColors.offWhite,
    borderRadius: 20,
    elevation: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 15,
  },
  value: {
    color: themeColors.offWhite,
    fontWeight: 'bold',
    fontSize: 18,
  }
});