import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Icon } from './Icon';
import { themeColors } from './ColorMap';

export const ButtonIcon = ({ onPress, icon, iconType, size = 28, color, iconStyle, style = styles.buttonIcon, disabled }) => {
  const buttonStyle = [style, disabled && styles.disabled]
  return (
    <TouchableOpacity disabled={disabled} style={buttonStyle} onPress={onPress}>
      <Icon icon={icon} type={iconType} size={size} color={color} style={iconStyle} />
    </TouchableOpacity>
  )
};

export const ButtonText = ({ onPress, blankStyle, style, text, textStyle, index, disabled }) => {
  const buttonStyle = [(!blankStyle && styles.button), disabled && styles.disabled, style]
  return (
    <TouchableOpacity disabled={disabled} style={buttonStyle} onPress={onPress}>
      {!!(index + 1) && <Text style={[styles.buttonText, styles.index]}>{index + 1}.</Text>}
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
};

export const ButtonIconText = ({ onPress, blankStyle, style, text, textStyle, icon, iconType, iconSize = 28, iconStyle, disabled }) => {
  const buttonStyle = [(!blankStyle && styles.button), style, disabled && styles.disabled]
  const iconStyles = [styles.icon, iconStyle, disabled && styles.disabledText]
  return (
    <TouchableOpacity disabled={disabled}
      style={buttonStyle}
      onPress={onPress}>
      <View style={styles.content}>
        <Icon icon={icon} type={iconType} size={iconSize} style={iconStyles} />
        <Text style={[styles.buttonText, textStyle, disabled && styles.disabledText]}>{text}</Text>
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

export const ButtonSpinner = ({ onPress, spinner, color, blankStyle, style, text, textStyle, icon, iconType, iconSize = 28, iconStyle, disabled }) => {
  const textColor = color ? color : styles.buttonText.color
  const buttonStyle = [(!blankStyle && styles.button), style, disabled && styles.disabled]
  const iconStyles = [styles.icon, iconStyle, disabled && styles.disabledText]
  const textStyles = [styles.buttonText, {color: textColor}, textStyle, disabled && styles.disabledText]
  return (
    <TouchableOpacity disabled={disabled} style={buttonStyle} onPress={onPress}>
      <View style={styles.content}>
        {spinner ?
          <ActivityIndicator style={{marginRight: 5}} color={textColor} /> :
          <Icon icon={icon} type={iconType} size={iconSize} color={textColor} style={iconStyles} />
        }
        <Text style={textStyles}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: themeColors.themeColor,
    borderRadius: 15,
    overflow: 'hidden',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 10
  },
  disabled: { backgroundColor: 'rgba(21, 115, 150, 0.5)', },
  disabledText: { color: 'rgba(255, 255, 255, 0.5)' },
  content: { flexDirection: 'row' },
  buttonText: { fontSize: 18, textAlignVertical: 'center', fontWeight: 'bold', color: themeColors.offWhite },
  icon: { alignSelf: 'center', marginRight: 5, },
  buttonIcon: { justifyContent: 'center', alignItems: 'center' },
  index: { fontStyle: 'italic', marginRight: 8 },
  settingsBtn: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    width: 300,
  }
})