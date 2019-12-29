import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { themeColors } from './ColorMap';
import Icon from './Icon';

export const LoginInput = ({
  iconName,
  iconType,
  onChange,
  value,
  placeholder,
  password,
  secured,
  onTogglePasswordVisibility,
  returnKeyType,
  onSubmitEditing,
  autoFocus,
  autoCompleteType,
}) => {
  return (
    <View>
      <View style={styles.loginContainer}>
        <Icon icon={iconName} type={iconType} size={28} color={'rgba(0, 0, 0, 0.7)'} style={styles.icon} />
        <TextInput
          autoFocus={autoFocus}
          autoCompleteType={autoCompleteType}
          style={styles.input}
          autoCorrect={false}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={themeColors.transparentBlack}
          secureTextEntry={secured}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />
        {
          password &&
          <TouchableOpacity onPress={onTogglePasswordVisibility}>
            <Icon
              name={secured ? 'ios-eye' : 'ios-eye-off'}
              size={28}
              color={themeColors.transparentBlack}
              style={styles.icon}
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: themeColors.transparentWhite,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 25,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    marginVertical: 10,
    color: themeColors.transparentBlack,
  },
  icon: {
    marginHorizontal: 15,
  },
});