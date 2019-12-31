import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from './common';
import { componentStyle } from '../styles';

export const WorkoutsScreen = () => {
  const workoutsList = [{
    link: '/timers-list',
    text: 'Timers',
    icon: 'stopwatch',
    iconType: 'fa5',
  }, {
    link: {
      pathname: '/workout-5x5',
      state: {
        a: 'asd'
      }
    },
    text: 'Strong Lifts',
    icon: 'dumbbell',
    iconType: 'fa5',
  }, {
    //link: '',
    text: 'HR Based Workout',
    icon: 'heartbeat',
    iconType: 'fa5',
  }];
  return (
    <View>
      <Text style={componentStyle.title}>Workouts List</Text>
      <List list={workoutsList} listType='iconTextBtn' />
    </View>
  )
};
