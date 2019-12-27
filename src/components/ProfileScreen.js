import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { useHistory } from 'react-router-native';
import { formatDateEU, ButtonIcon, themeColors } from './common';
import avatarMale from '../images/Avatar/male.png'

export const ProfileScreen = ({ user }) => {
  const history = useHistory();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image source={user.photoURL ? { uri: user.photoURL } : avatarMale} style={styles.avatar} />
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>{user.userName}</Text>
            <Text style={styles.userInfo}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userInfo}>Birthdate: {user.birthdate && formatDateEU(user.birthdate)}</Text>
          <Text style={styles.userInfo}>Height: {user.height}</Text>
          <Text style={styles.userInfo}>Weight: {user.weight}</Text>
          <Text style={styles.userInfo}>Gender: {user.gender}</Text>
        </View>
        <View style={styles.btnsContainer}>
          <ButtonIcon icon='user-edit' iconType='fa5' onPress={() => history.push({
            pathname: '/user-form',
            state: user
          })} />
        </View>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: Dimensions.get('window').width,
    paddingHorizontal: 40,
    height: 2500,
  },
  avatarContainer: {
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  nameContainer: {
    marginHorizontal: 10,
    //textAlign: 'center',
  },
  userInfo: {
    fontSize: 20,
    paddingVertical: 5,
  },
  btnsContainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-around',
    width: 300,
  },
  avatar: {
    height: 150,
    width: 150,
    borderWidth: 5,
    borderColor: themeColors.header,
    borderRadius: 100,
    marginTop: 20,
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(ProfileScreen);