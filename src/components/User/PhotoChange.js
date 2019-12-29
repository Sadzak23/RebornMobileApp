import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import { ButtonIconText, themeColors, resizeGooglePhoto } from '../common';

export const PhotoChange = ({ user, setUser, showModal, setShowModal, setPhoto }) => {
  const googlePhoto = auth().currentUser.photoURL
  return (
    <Modal
      visible={showModal}
      transparent
      animationType='fade'
      onRequestClose={() => setShowModal(false)}
    >
      <View style={modalStyles.background}>
        <View style={modalStyles.modal}>
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
              database().ref(`users/${user.id}`).update({ photoURL: photo })
                .then(() => {
                  setUser({ ...user, photoURL: photo })
                  !!setPhoto && setPhoto(photo)
                })
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
              database().ref(`users/${user.id}`).update({ photoURL: photo })
                .then(() => {
                  setUser({ ...user, photoURL: photo })
                  !!setPhoto && setPhoto(photo)
                })
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
                database().ref(`users/${user.id}`).update({ photoURL: photo })
                  .then(() => {
                    setUser({ ...user, photoURL: photo })
                    !!setPhoto && setPhoto(photo)
                  })
                setShowModal(false)
              }}
            />
          }
        </View>
      </View>
    </Modal>
  )
};

const modalStyles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    right: '10%',
    left: '10%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: themeColors.body,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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