import { StyleSheet } from 'react-native';
import { themeColors } from '../components/common';

export const componentStyle = StyleSheet.create({
  title: {
    color: themeColors.offWhite,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  subtitle: {
    color: themeColors.offWhite,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})