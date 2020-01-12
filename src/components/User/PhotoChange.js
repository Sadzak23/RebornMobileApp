import React from 'react';
import { Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import Modal, { ModalContent } from 'react-native-modals';
import { ButtonIconText, themeColors, resizeGooglePhoto } from '../common';

export const PhotoChange = ({ showModal, setShowModal, setPhoto }) => {
  const googlePhoto = auth().currentUser.photoURL
  return (
    <Modal visible={showModal} onTouchOutside={() => setShowModal(false)}>
      <ModalContent style={styles.modal}>
        <Text style={modalStyles.title}>Add new profile photo</Text>
        <ButtonIconText
          text='Take Photo'
          icon='add-a-photo' iconType='mi' iconStyle={modalStyles.icon}
          style={modalStyles.btn}
          onPress={() => ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true
          }).then(image => {
            const photo = `data:${image.mime};base64,${image.data}`
            setPhoto(photo)
            setShowModal(false)
          })}
        />
        <ButtonIconText
          text='Pick from Gallery'
          icon='photo' iconType='mi' iconStyle={modalStyles.icon}
          style={modalStyles.btn}
          onPress={() => ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true
          }).then(image => {
            const photo = `data:${image.mime};base64,${image.data}`
            setPhoto(photo)
            setShowModal(false)
          })}
        />
        {
          googlePhoto &&
          <ButtonIconText
            text='From Google'
            icon='google' iconType='fa5' iconSize={22} iconStyle={modalStyles.icon}
            style={modalStyles.btn}
            onPress={() => {
              const photo = resizeGooglePhoto(googlePhoto, 250)
              setPhoto(photo)
              setShowModal(false)
            }}
          />
        }
      </ModalContent>
    </Modal>
  )
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: themeColors.body,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
})
const modalStyles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  btn: {
    marginBottom: 10,
  },
  icon: {
    marginRight: 5
  }
})