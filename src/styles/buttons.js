import { StyleSheet } from 'react-native';
import { themeColors } from '../components/common';

const btnStyle = {  
  borderRadius: 50,
  alignItems: 'center',
  justifyContent: 'center',
  margin: 20,
  height: 70,
  width: 70,
}

export const buttonStyles = StyleSheet.create({
  iconBtn: {
    ...btnStyle,
    backgroundColor: themeColors.theme2,
    margin: 20,
  },
  floatingBtn: {
    ...btnStyle,
    backgroundColor: themeColors.theme2,
    position: 'absolute',
    bottom: 10,
    right: 0,
    elevation: 5,
    zIndex: 1
  }
})