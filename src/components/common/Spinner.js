import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const Spinner = ({ size='large', color, marginVertical, backgroundColor='#3f4c5c' }) => {
  const style = {
    spinnerStyle: {
      //backgroundColor: backgroundColor,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: marginVertical,
    }
  }
  return (
    <View style={style.spinnerStyle}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};