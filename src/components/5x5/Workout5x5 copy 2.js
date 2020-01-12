import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { useHistory, BackButton } from 'react-router-native';
import { ButtonIconText, themeColors, ConfirmFooter, add0, formatSeconds } from '../common';
import { shortBeep, longBeep } from '../../sounds/sounds';
import { componentStyle } from '../../styles';

export const Workout5x5 = ({ location }) => {
  const workout = location.state.workouts.strongLifts;
  const [type, setType] = useState(workout.trainingType)
  const [exercise1, setExercise1] = useState({ set1: 0, set2: 0, set3: 0, set4: 0, set5: 0, done: "" })
  const [exercise2, setExercise2] = useState({ set1: 0, set2: 0, set3: 0, set4: 0, set5: 0, done: "" })
  const [exercise3, setExercise3] = useState({ set1: 0, set2: 0, set3: 0, set4: 0, set5: 0, done: "" })
  const [interval, setInterval] = useState(null)
  const [seconds, setSeconds] = useState(90)
  // const history = useHistory();

  useEffect(() => {
    console.log(1)
  }, [])
  const tick = () => {
    setSeconds(seconds - 1)
    if (seconds <= 0) {
      clearInterval(interval)
      longBeep.play();
    }
    // Play sound on 10,3,2,1
    (seconds === 10 || seconds === 3 || seconds === 2 || seconds === 1) && shortBeep.play();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar hidden animated />
      <Text style={componentStyle.title}>Strong Lifts</Text>
      <View style={styles.workoutContainer}>
        <ButtonIconText text='click' onPress={tick} />
      </View>
      <ConfirmFooter
        confirmText='Save Workout'
        confirmIcon='save'
        confirmIconType='fa5'
        confirmIconSize={23}
        onConfirm={() => { }}
        disableConfirm={true}
      />
      <BackButton />
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: themeColors.body,
    width: '100%',
    height: '100%'
  },
  workoutContainer: {
    flex: 1,
    paddingHorizontal: 10,
  }
});