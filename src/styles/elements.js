import { StyleSheet } from 'react-native';
import { themeColors } from '../components/common';

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

export const modalStyles = StyleSheet.create({
  modal: {
    backgroundColor: themeColors.theme2,
    borderRadius: 30,
    marginVertical: 20,
  },
  container: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: themeColors.offWhite,
  },
  input: {
    ...inputStyles.input,
    elevation: 20,
    backgroundColor: themeColors.theme2
  },
  confirmBtn: {
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: themeColors.offWhite,
    paddingVertical: 3,
  }
})
