import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { ButtonIconText, themeColors } from './';
import { ButtonText, ButtonSettings } from './Buttons';

export const List = ({ list, listType, iconSize = 23, iconStyle = styles.icon }) => {
  const history = useHistory();
  return (
    <View style={styles.container}>
      {
        list.map((item, index) => {
          switch (listType) {
            case 'iconTextBtn':
              return (
                <View key={item.text} style={styles.listItemContainer}>
                  <ButtonIconText
                    onPress={() => history.push(item.link)}
                    text={item.text}
                    icon={item.icon}
                    iconSize={iconSize}
                    iconType={item.iconType}
                    iconStyle={iconStyle}
                    blankStyle
                    style={styles.button}
                  />
                </View>
              )
            case 'settingsItem':
              return (
                <View key={item.text} style={styles.listItemContainer}>
                  <ButtonSettings
                    onPress={item.onPress}
                    text={item.text}
                    toggle={item.toggle}
                    toggleOn={item.toggleOn}
                    icon={item.icon}
                    iconSize={iconSize}
                    iconType={item.iconType}
                    iconStyle={{ marginRight: 10 }}
                  />
                </View>
              )
            default:
              return (
                <View key={item.text} style={styles.listItemContainer}>
                  <ButtonText
                    onPress={() => history.push(item.link)}
                    index={index}
                    text={item.text}
                    blankStyle
                    state={item.state}
                    style={styles.button}
                  />
                </View>
              )
          }
        })
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1.5,
    borderColor: themeColors.offWhite,
  },
  listItemContainer: {
    borderTopWidth: 1.5,
    borderColor: themeColors.offWhite,
    width: 300,
  },
  button: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
  },
  icon: {
    marginRight: 10,
    textAlign: 'center',
    width: 35,
  },
});
