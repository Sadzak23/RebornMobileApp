import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import logo from '../images/logo.png';
import { ButtonIconText, themeColors } from './common';
import { connect } from 'react-redux';

export const HomeScreen = ({ user }) => {
  return (
    <View>
      <Image source={logo} />
      <Text style={styles.text}>Welcome</Text>
      <Text style={styles.text}>{user.userName}</Text>
    </View>
  )
  //<ButtonIconText style={{ width: 300 }} text='Click' onPress={() => console.log(user)} />
};

const styles = StyleSheet.create({
  text: {
    color: themeColors.offWhite,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(HomeScreen);