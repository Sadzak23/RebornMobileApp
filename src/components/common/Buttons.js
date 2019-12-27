import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Icon, themeColors } from './';

export const ButtonIcon = ({ onPress, icon, iconType, size = 28, color, iconStyle, style = styles.buttonIcon }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon icon={icon} type={iconType} size={size} color={color} style={iconStyle} />
    </TouchableOpacity>
  )
};

export const ButtonText = ({ onPress, blankStyle, style, text, textStyle, index }) => {
  const buttonStyle = {
    ...(!blankStyle && styles.button),
    ...style
  }
  const buttonText = { ...styles.buttonText, ...textStyle }
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {!!(index + 1) && <Text style={{ ...buttonText, ...styles.index }}>{index + 1}.</Text>}
      <Text style={buttonText}>{text}</Text>
    </TouchableOpacity>
  )
};

export const ButtonIconText = ({ onPress, blankStyle, style, text, textStyle, icon, iconType, iconSize = 28, iconStyle }) => {
  const buttonStyle = {
    ...(!blankStyle && styles.button),
    ...style
  };
  const textStyles = {
    ...styles.buttonText,
    ...textStyle
  }
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <View style={styles.content}>
        <Icon icon={icon} type={iconType} size={iconSize} style={iconStyle} />
        <Text style={textStyles}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const ButtonSettings = ({ onPress, text, icon, iconType, iconSize = 28, iconStyle, toggle, toggleOn }) => {
  return (
    <TouchableOpacity style={styles.settingsBtn} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        {!!icon && <Icon icon={icon} type={iconType} size={iconSize} style={iconStyle} />}
        <Text style={styles.buttonText}>{text}</Text>
      </View>
      {!!toggle && <Icon icon={toggleOn ? 'toggle-on' : 'toggle-off'} type='fa' size={23} color={toggleOn ? 'lightgreen' : themeColors.offWhite} />}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1d2733',
    borderRadius: 15,
    overflow: 'hidden',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    fontSize: 18
  },
  content: {
    flexDirection: 'row',
  },
  buttonText: { fontSize: 18, fontWeight: 'bold' },
  buttonIcon: { justifyContent: 'space-around', alignItems: 'center' },
  index: {
    fontStyle: 'italic',
    marginRight: 8
  },
  settingsBtn: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    width: 300,
  }
})