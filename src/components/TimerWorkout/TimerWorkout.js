import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useHistory, BackButton } from 'react-router-native';
import { ButtonIconText } from '../common';
import { themeColors } from '../common/ColorMap';
import { TimersList } from './TimersList';

export const TimerWorkout = () => {
  const history = useHistory();
  return (
    <View style={styles.constuctor}>
      <Text style={styles.text}>Timers</Text>
      <BackButton />
      <ButtonIconText
        style={{ marginBottom: 20 }}
        onPress={() => { }}
        text="Timer" icon='timer' size={22} iconStyle={{ marginRight: 5 }} />
      <ButtonIconText
        onPress={() => history.goBack()}
        icon='arrow-left-bold'
        text='Go Back'
        size={22}
        iconStyle={{ marginRight: 5 }}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  constuctor: {
    alignItems: 'center',
    backgroundColor: themeColors.body,
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 45, 
    marginBottom: 20
  }
});