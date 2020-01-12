import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useHistory } from 'react-router-native';
import { ButtonIcon, themeColors, Icon, getAge, ValueUnit } from './common';
import avatarMale from '../images/Avatar/male.png'
import { BmiCalculator } from './Calculators/BMI/BmiCalculator';
import { buttonStyles } from '../styles/buttons';

export const ProfileScreen = ({ user, fullWidth }) => {
  const history = useHistory();
  return (
    <View>
      <ButtonIcon icon='user-edit' iconType='fa5' style={buttonStyles.floatingBtn}
        onPress={() => history.push({ pathname: '/user-form', state: user })} />
      <ScrollView>
        <View style={{...styles.container, width: '100%'}}>
          <View style={{...styles.nameContainer, width: fullWidth}}>
            <View style={styles.avatarContainer}>
              <Image source={user.photoURL ? { uri: user.photoURL } : avatarMale} style={styles.avatar} />
            </View>
            <Text style={styles.userName}>{user.userName}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>

          <View style={styles.newCont}>
            <View style={{ ...styles.newItem, borderRightWidth: 1 }}>
              <Text>Height</Text>
              <ValueUnit value={user.height} unit='cm' />
            </View>
            <View style={{ ...styles.newItem, borderRightWidth: 1 }}>
              <Text>Age</Text>
              <ValueUnit value={getAge(user.birthdate)} />
            </View>
            <View style={styles.newItem}>
              <Text>Weight</Text>
              <ValueUnit value={user.weight} unit='kg' />
            </View>
          </View>

          <View style={[styles.itemsContainer, styles.heightWeight]}>
            <View style={{ alignItems: 'center' }}>
              <Icon icon='altimeter' />
              <Text style={styles.value}>{user.height}cm</Text>
            </View>
            <View style={styles.gender}>
              <Icon icon={user.gender == 'male' ? 'male' : 'female'} type='fa' color={themeColors.offWhite} />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon icon='scale-bathroom' />
              <Text style={styles.value}>{user.weight}kg</Text>
            </View>
          </View>
          <BmiCalculator height={user.height} weight={user.weight} />
        </View>
      </ScrollView>
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 40,
  },
  avatarContainer: {
    borderWidth: 3,
    borderColor: themeColors.offWhite,
    borderRadius: 100,
    elevation: 20,
    marginTop: 20,
    padding: 4,
  },
  avatar: {
    borderRadius: 100,
    height: 150,
    width: 150,
  },
  nameContainer: {
    backgroundColor: themeColors.themeColor,
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 50,
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: themeColors.offWhite,
  },
  email: {
    fontSize: 16,
  },
  newCont: {
    backgroundColor: themeColors.theme2,
    borderWidth: 1,
    borderColor: themeColors.offBlack,
    borderRadius: 10,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginTop: -50,
    marginBottom: 10,
    width: '100%',
  },
  newItem: {
    alignItems: 'center',
    borderColor: themeColors.offBlack,
    flex: 1
  },
  itemsContainer: {
    borderColor: themeColors.themeColor,
    borderTopWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  heightWeight: {
    borderBottomWidth: 2,
    justifyContent: 'space-around',
  },
  gender: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors.themeColor,
    borderRadius: 50,
    height: 60,
    width: 60,
  },
  value: {
    fontSize: 25,
    color: themeColors.offWhite
  },
});

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(ProfileScreen);