import React from 'react';
import { View, Text } from 'react-native';
import { ValueUnit } from '../../common';

export const BmiCalculator = ({ height, weight }) => {
  const bmi = weight / Math.pow((height / 100), 2)
  const bmiRound = Math.round(bmi * 10) / 10
  return (
    <View style={{ marginVertical: 20 }}>
      {height && weight ? <ValueUnit value={bmiRound} unit='kg/m2' /> : <Text>Please enter height & weight</Text>}
    </View>
  )
};
