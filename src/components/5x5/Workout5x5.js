import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useHistory, BackButton } from 'react-router-native';
import { ButtonIconText } from '../common';
import { themeColors } from '../common/ColorMap';

export const Workout5x5 = () => {
  const history = useHistory();
  return (
    <View style={styles.constuctor}>
      <StatusBar hidden animated />
      <Text style={styles.text}>Strong Lifts</Text>
      <BackButton />
      <ButtonIconText
        style={{ marginBottom: 20 }}
        onPress={() => { }}
        text="Strong Lifts" icon='dumbbell' iconType='fa5' size={22} iconStyle={{ marginRight: 5 }} />
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