import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { ButtonIcon } from './Buttons';
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
    position: 'absolute',
    bottom: 0,
    backgroundColor: themeColors.header,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    width: '100%',
    elevation: 1
  },
  icon: {
    marginHorizontal: 15,
  }
});