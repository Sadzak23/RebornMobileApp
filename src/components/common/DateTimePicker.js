import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View } from 'react-native';
import { ButtonText } from './Buttons';

export const DatePicker = ({ timeStamp, btnText, setDate, btnStyle }) => {
  const [show, setShow] = useState(false)
  return (
    <View>
      <ButtonText
        text={btnText}
        textStyle
        blankStyle
        style={btnStyle}
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