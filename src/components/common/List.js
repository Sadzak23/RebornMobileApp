import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useHistory } from 'react-router-native';
import { themeColors } from './ColorMap';
import { ButtonText, ButtonIconText, ButtonSettings } from './Buttons';
import Icon from './Icon';

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
                    iconStyle={{ width: 40 }}
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

export const ListItem = ({
  iconName,
  iconType,
  iconSize = 25,
  label,
  labelStyle,
  lastInput,
  style,
  children,
}, ) => (
    <View style={[listItemStyle.container, lastInput && { borderBottomWidth: 2 }, style]}>
      <View style={listItemStyle.labelContainer}>
        {!!iconName &&
          <Icon
            style={listItemStyle.icon}
            icon={iconName}
            type={iconType}
            size={iconSize}
          />
        }
        <Text style={[listItemStyle.label, labelStyle]}>{label}</Text>
      </View>
      {children}
    </View>
  )

const listItemStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  border: {
    borderColor: themeColors.theme2,
    borderTopWidth: 2,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
    width: 40,
  },
  label: {
    fontSize: 16,
  },
})

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
