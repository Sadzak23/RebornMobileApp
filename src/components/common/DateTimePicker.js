import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, StyleSheet } from 'react-native';
import { ButtonIconText } from './Buttons';
import { themeColors } from './ColorMap';

export const DatePicker = ({ timeStamp, btnText, setDate }) => {
  //const [date, setDate] = useState(timeStamp)
  const [show, setShow] = useState(false)
  return (
    <View>
      <ButtonIconText
        icon='calendar'
        iconType='fa'
        iconSize={20}
        iconStyle={styles.btnIcon}
        text={btnText} 
        textStyle={{color: themeColors.transparentBlack}}
        blankStyle
        style={styles.button} 
        onPress={() => setShow(true)}
      />
      {show &&
        <DateTimePicker
          value={new Date(timeStamp)}
          display='spinner'
          onChange={(e, date) => {
            setShow(false)
            date && setDate(Date.parse(date))
          }}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: themeColors.transparentWhite,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 25,
    marginBottom: 20,
  },
  btnIcon: {
    marginHorizontal: 15,
    color: themeColors.transparentBlack,
    
  }
})