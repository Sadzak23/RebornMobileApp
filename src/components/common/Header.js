import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { ButtonIcon } from './Buttons';
import { themeColors } from './ColorMap';
import logo from '../../images/logo.png';

export const Header = () => {
  const history = useHistory();
  return (
    <View style={styles.container}>
      <ButtonIcon onPress={() => history.goBack()} icon='arrow-left-bold-circle-outline' />
      <Image source={logo} style={styles.logo} />
      <ButtonIcon onPress={() => history.push('/settings')} icon='settings' />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: themeColors.header,
    height: 60,
    width: '100%',
    elevation: 10,
  },
  textStyle: {
    fontSize: 20,
  },
  logo: {
    width: 85,
    height: 40,
  }
});