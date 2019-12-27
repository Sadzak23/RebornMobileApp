import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BackButton } from 'react-router-native';
import { timers } from '../../data';
import { List } from '../common';

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
    <View style={styles.constuctor}>
      <View style={{ width: 300 }}>
        <Text style={styles.title}>Timers</Text>
        <List list={timersList} />
      </View>
      <BackButton />
    </View>
  )
};

const styles = StyleSheet.create({
  constuctor: {
    alignItems: 'center',
    flex: 1,
    width: 300
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  }
});

