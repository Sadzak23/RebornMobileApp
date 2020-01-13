import { StyleSheet } from 'react-native';
import { themeColors } from '../components/common/ColorMap';

export const inputStyles = StyleSheet.create({
  input: {
    fontSize: 16,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
    borderColor: themeColors.offWhite,
    height: 50,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    textAlign: 'right',
    fontSize: 20,
    width: 60
  },
})

