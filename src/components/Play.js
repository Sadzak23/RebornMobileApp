import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import logo from '../images/logo.png';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { ButtonIconText } from './common';

export const Play = ({ user }) => {
  const [avatar, setAvatar] = useState('')
  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  return (
    <ScrollView>

      <Image source={logo} />
      <Text style={styles.text}>Welcome</Text>
      <Text style={styles.text}>{user.userName}</Text>
      <ButtonIconText style={{ width: 300 }} text='Click'
        onPress={() => ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
            setAvatar(source)
          }
        })}
      />
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(Play);