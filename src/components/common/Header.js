import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useHistory } from 'react-router-native';
import { ButtonIcon } from './Buttons';
import { themeColors } from './ColorMap';

export const Header = ({ noBack, title }) => {
  const history = useHistory();
  return (
    <View style={styles.container}>
      <View style={{ width: 30 }}>
        {!noBack &&
          <ButtonIcon onPress={() => history.goBack()} icon='arrow-left' />
        }
      </View>
      <Text style={styles.title}>{title}</Text>
      <ButtonIcon onPress={() => history.push('/settings')} icon='settings'
        style={{ width: 30 }} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: themeColors.themePrimary,
    height: 60,
    width: '100%',
    elevation: 10,
  },
  title: {
    fontSize: 25,
    color: themeColors.offWhite,
    fontWeight: 'bold'
  }
});