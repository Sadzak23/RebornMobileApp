import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Modal, { ModalContent, ScaleAnimation } from 'react-native-modals';
import { themeColors } from './ColorMap';
import { ButtonText } from './Buttons';
import { inputStyles } from '../../styles/elements';
import { Spinner } from './Spinner';

export const ModalConfirm = ({ visible, setVisible, title, subtitle, onConfirm, confirmText = 'Save', cancelText = 'Cancel', isLoading, width }) => (
  <Modal visible={visible}
    modalAnimation={new ScaleAnimation()}
    modalStyle={modalStyles.modal}
    onTouchOutside={() => setVisible(false)}
    onHardwareBackPress={() => setVisible(false)}
  >
    <ModalContent style={[modalStyles.container, {width}]}>
      <Text style={modalStyles.title}>{title}</Text>
      {subtitle && <Text style={modalStyles.subtitle}>{subtitle}</Text>}
      {isLoading ?
        <Spinner marginVertical={30} color={themeColors.offWhite} /> :
        <View style={modalStyles.btnsContainer}>
          <ButtonText blankStyle style={modalStyles.btn}
            text={cancelText} onPress={() => setVisible(false)}
          />
          <ButtonText blankStyle style={modalStyles.btn}
            text={confirmText} onPress={onConfirm}
          />
        </View>
      }
    </ModalContent>
  </Modal>
);

export const modalStyles = StyleSheet.create({
  modal: {
    backgroundColor: themeColors.theme2,
    borderRadius: 30,
    marginVertical: 20,
    maxWidth: '90%',
  },
  container: {
    paddingVertical: 15,
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 23,
    color: themeColors.offWhite,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: themeColors.offWhite,
  },
  input: {
    ...inputStyles.input,
    elevation: 20,
    backgroundColor: themeColors.theme2
  },
  btnsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '100%',
    height: 40,
  },
  btn: {
    backgroundColor: themeColors.themeColor,
    borderRadius: 30,
    elevation: 5,
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: themeColors.offWhite,
    paddingVertical: 3,
  }
})