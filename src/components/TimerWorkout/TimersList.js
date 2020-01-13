import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BackButton } from 'react-router-native';
import { timers } from '../../data';
import { List } from '../common';
import { componentStyle } from '../../styles';

export const TimersList = () => {
  let timersList = [];
  timers.map(timer => timersList.push({
    link: {
      pathname: `/workout-timer/${timer.id}`,
      state: timer
    },
    text: timer.name,
    state: {
      name: timer.name,
      index: timer.index,
      intervals: timer.intervals,
      roundRestMin: timer.roundRestMin,
      roundRestSec: timer.roundRestSec,
      rounds: timer.rounds,
      warmupTime: timer.warmupTime,
    }
  }));

  return (
    <View>
      <Text style={componentStyle.title}>Timers</Text>
      <List list={timersList} />
      <BackButton />
    </View>
  )
};

// const styles = StyleSheet.create({
  
// });

