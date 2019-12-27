import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ButtonIcon } from './Buttons';
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
}) => {
  return (
    <View>
      <View style={styles.loginContainer}>
        <Icon icon={iconName} type={iconType} size={28} color={'rgba(0, 0, 0, 0.7)'} style={styles.icon} />
        <TextInput
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

export const DualSelector = ({ value1, value2, onPress }) => {
  const [status, setStatus] = useState(true)
  return (
    <View style={styles.dualSelectorContainer}>
      <Text style={styles.text}>{value1}</Text>
      <ButtonIcon
        onPress={() => {
          setStatus(!status)
          onPress
        }}
        icon={status ? 'toggle-switch-outline' : 'toggle-switch-off'}
        size={45}
        color={themeColors.transparentBlack}
        iconStyle={{ marginHorizontal: 10 }}
      />
      <Text style={styles.text}>{value2}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: themeColors.transparentWhite,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 25,
    marginBottom: 20,
  },
  dualSelectorContainer: {
    backgroundColor: themeColors.transparentWhite,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  text: {
    //color: '#fff',
    fontSize: 20
  },
});