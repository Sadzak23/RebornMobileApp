import React from 'react';
import { View, Text, StyleSheet } from "react-native"
import { Icon, ValueUnit, timerColors, themeColors } from '../common';
import { percOfMax, maxHR, hrZone } from '../../functions/heartRateFormulas';

export const HRCard = ({ user, bpm, kCal, age }) => (
  <View style={{ backgroundColor: zoneColor[hrZone(bpm, maxHR(age))], borderRadius: 10 }}>
    {user && <Text style={styles.userName}>{user}</Text>}
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={styles.hrValueContainer}>
        <Icon icon='heartbeat' type='fa5' style={{ marginRight: 5 }} />
        <ValueUnit value={bpm ? bpm : 0} unit='bpm' valueSize={40} />
      </View>
      <View style={styles.hrValueContainer}>
        <Icon icon='fire' size={40} />
        <ValueUnit value={kCal} unit='kCal' valueSize={40} />
      </View>
    </View>
    {bpm ?
      <Text style={styles.hrPerc}>{percOfMax(bpm, maxHR(age))}%</Text> :
      <Text style={styles.message}>No heart rate detected</Text>
    }
  </View>
)

const zoneColor = {
  1: timerColors.Gray,
  2: timerColors.Blue,
  3: timerColors.Green,
  4: timerColors.Yellow,
  5: timerColors.Red
}

const styles = StyleSheet.create({
  hrValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 5,
  },
  hrPerc: {
    fontSize: 75,
    fontWeight: 'bold',
    textAlign: 'center',
    color: themeColors.offWhite,
    height: 100,
  },
  message: {
    color: themeColors.offWhite,
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 100,
  },
  userName: {
    // borderBottomWidth: 3,
    textAlign: 'center',
    color: themeColors.offWhite,
    fontSize: 30,
    fontWeight: 'bold',
  }
})