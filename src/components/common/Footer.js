import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { ButtonIcon } from '../common';
import { themeColors } from './ColorMap';

export const Footer = () => {
  const history = useHistory();
  return (
    <View style={styles.container}>
      <ButtonIcon
        onPress={() => history.push('/')}
        icon='home'
        iconType='material'
        iconStyle={styles.icon}
      />
      <ButtonIcon
        onPress={() => history.push('/workouts')}
        icon='ios-fitness'
        iconType='ion'
        iconStyle={styles.icon}
      />
      <ButtonIcon
        onPress={() => history.push('/play')}
        icon='ios-pulse'
        iconType='ion'
        iconStyle={styles.icon}
      />
      <ButtonIcon
        onPress={() => history.push('/profile')}
        icon='ios-person'
        iconType='ion'
        iconStyle={styles.icon}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.header,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 50,
    width: '100%',
  },
  icon: {
    marginHorizontal: 15,
  }
});