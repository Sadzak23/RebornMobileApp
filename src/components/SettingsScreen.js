import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from './common';
import { onLogout } from '../App';
import Sound from 'react-native-sound';
import Beep from '../sounds/beep.mp3'

export const SettingsScreen = ({ }) => {
  const [DarkMode, setDarkMode] = useState(true)
  const onDarkModeToggle = () => {
    setDarkMode(!DarkMode);
    // themeColors = DarkMode ? {
    //   header: '#1d2733',
    //   // change app background color at: android/app/src/main/res/values/colors.xml
    //   body: '#3f4c5c',
    //   offWhite: '#f0f0f0',
    //   transparentWhite: 'rgba(255, 255, 255, 0.7)',
    //   transparentBlack: 'rgba(0, 0, 0, 0.7)',
    // } :
    // {
    //   header: '#1d2733',
    //   // change app background color at: android/app/src/main/res/values/colors.xml
    //   body: '#fff',
    //   offWhite: '#f0f0f0',
    //   transparentWhite: 'rgba(255, 255, 255, 0.7)',
    //   transparentBlack: 'rgba(0, 0, 0, 0.7)',
    // }
  }

  const beep = new Sound(Beep, Sound.MAIN_BUNDLE)
  const onSoundPlay = () => {
    beep.play()
  }

  const settingsList = [{
    onPress: onDarkModeToggle,
    text: 'Dark mode',
    toggle: true,
    toggleOn: DarkMode,
    icon: 'theme-light-dark',
  }, {
    onPress: () => alert('Alert'),
    text: 'Alert',
    icon: 'bell',
  }, {
    onPress: onSoundPlay,
    text: 'Sound',
    icon: 'bell',
  }, {
    onPress: onLogout,
    text: 'Sign out',
    icon: 'logout',
  }];
  return (
    <View>
      <Text style={styles.title}>Settings</Text>
      <List list={settingsList} listType='settingsItem' />
    </View>
  )
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  }
});
