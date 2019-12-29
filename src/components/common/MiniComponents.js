import React from 'react';
import { View, Text } from 'react-native';

export const ValueUnit = ({ value, unit }) => (
  <View style={{ flexDirection: 'row' }}>
    <Text style={{ fontSize: 30, color: 'white' }}>{value}</Text>
    <Text style={{ fontSize: 15, lineHeight: 50 }}>{unit}</Text>
  </View>
)