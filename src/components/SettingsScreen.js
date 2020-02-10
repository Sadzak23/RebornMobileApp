import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { ButtonSettings, listStyles, FlatListSeparator } from './common';
import Sound from 'react-native-sound';
import Beep from '../sounds/beep.mp3'
import { useHistory } from 'react-router-native';

export const SettingsScreen = ({ onLogout }) => {
  const history = useHistory();
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
    onPress: () => history.push('/user-form'),
    text: 'Edit user',
    icon: 'user-edit',
    iconType: 'fa5',
  }, {
    onPress: () => history.push('/search-hrm'),
    text: 'Pair sensor',
    icon: 'bluetooth',
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
    <FlatList
      style={listStyles.list}
      keyExtractor={item => item.text}
      data={settingsList}
      renderItem={({ item }) =>
        <View style={listStyles.listItem}>
          <ButtonSettings
            onPress={item.onPress}
            text={item.text}
            toggle={item.toggle}
            toggleOn={item.toggleOn}
            icon={item.icon}
            iconSize={23}
            iconType={item.iconType}
            iconStyle={{ width: 40 }}
          />
        </View>
      }
      ItemSeparatorComponent={() => <FlatListSeparator />}
    />
  )
};