import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { ButtonIcon, ButtonIconText } from './Buttons';
import { themeColors } from './ColorMap';

export const Footer = () => {
  const history = useHistory();
  return (
    <View style={footerStyles.container}>
      <ButtonIcon
        onPress={() => history.push('/')}
        icon='home'
        iconType='material'
        iconStyle={footerStyles.icon}
      />
      <ButtonIcon
        onPress={() => history.push('/workouts')}
        icon='ios-fitness'
        iconType='ion'
        iconStyle={footerStyles.icon}
      />
      <ButtonIcon
        onPress={() => history.push('/play')}
        icon='ios-pulse'
        iconType='ion'
        iconStyle={footerStyles.icon}
      />
      <ButtonIcon
        onPress={() => history.push('/calorie-calculator')}
        icon='calculator'
        iconStyle={footerStyles.icon}
      />
      <ButtonIcon
        onPress={() => history.push('/profile')}
        icon='ios-person'
        iconType='ion'
        iconStyle={footerStyles.icon}
      />
    </View>
  )
};

const footerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: themeColors.themePrimary,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    width: '100%',
    elevation: 20,
  },
  icon: {
    marginHorizontal: 15,
  }
});

export const ConfirmFooter = ({ onConfirm, confirmText, confirmIcon, confirmIconType, confirmIconSize, hideConfirm, cancelText = 'Cancel', cancelIcon = 'arrow-left-bold', cancelIconType, onCancel, style, disableConfirm }) => {
  const history = useHistory();
  return (
    <View style={[confirmFooterStyles.container, style]}>
      <ButtonIconText
        blankStyle
        style={{ ...confirmFooterStyles.button, marginRight: 4 }}
        onPress={onCancel ? onCancel : history.goBack}
        text={cancelText}
        icon={cancelIcon}
        iconType={cancelIconType}
        iconStyle={{ marginRight: 5 }}
      />
      {!hideConfirm &&
        <ButtonIconText
          disabled={disableConfirm}
          blankStyle
          style={confirmFooterStyles.button}
          onPress={onConfirm}
          text={confirmText} icon={confirmIcon} iconType={confirmIconType} iconSize={confirmIconSize} iconStyle={{ marginRight: 5 }}
        />}
    </View>
  )
}
const confirmFooterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: themeColors.themePrimary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    
  }
})