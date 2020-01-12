import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useHistory, BackButton } from 'react-router-native';
import { themeColors, Icon } from './common';
import { componentStyle } from '../styles';
import circuit from '../images/workouts/circuit.jpg';
import strongLifts from '../images/workouts/strongLifts.jpg';
import hrWorkout from '../images/workouts/hrWorkout.jpg';

export const WorkoutsScreen = () => {
  const history = useHistory();
  const workoutsList = [{
    link: '/timers-list',
    text: 'Timers',
    icon: 'stopwatch',
    iconType: 'fa5',
    image: circuit,
    color: themeColors.theme2
  }, {
    link: '/dashboard-5x5',
    text: 'Strong Lifts',
    icon: 'dumbbell',
    iconType: 'fa5',
    image: strongLifts,
    color: '#000'
  }, {
    //link: '',
    text: 'HR Based Workout',
    icon: 'heartbeat',
    iconType: 'fa5',
    image: hrWorkout,
    color: '#e17d2d'
  }];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={componentStyle.title}>Select Workout</Text>
      {workoutsList.map(e => (
        <TouchableOpacity onPress={() => history.push(e.link)} key={e.text} style={styles.workoutCard}>
          <View style={{ ...styles.nameContainer, backgroundColor: e.color, }}>
            <Icon icon={e.icon} type={e.iconType} size={45} />
            <Text style={styles.workoutName}>{e.text}</Text>
          </View>
          <Image style={styles.cardImg} source={e.image} />
        </TouchableOpacity>
      ))}
      <BackButton />
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
    width: '100%',
  },
  workoutCard: {
    flexDirection: 'row',
    marginBottom: 5,
    width: '100%',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutName: {
    color: themeColors.transparentWhite,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cardImg: { width: 200, height: 150 }
})