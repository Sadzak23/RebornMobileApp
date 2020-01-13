import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const Spinner = ({ size='large', color, marginVertical }) => {
  const style = {
    spinnerStyle: {
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