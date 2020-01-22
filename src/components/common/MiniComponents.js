import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { themeColors } from './ColorMap';

export const ValueUnit = ({ value, unit, valueSize = 28 }) => (
  <Text style={{ fontSize: valueSize, color: 'white' }}>{value}
    {unit && <Text style={{ fontSize: 15 }}> {unit}</Text>}
  </Text>
)

export const HorisontalField = ({ title, value, unit, lastItem, valueSize }) => (
  <View style={[styles.horisontalField, !lastItem && { borderRightWidth: 1 }]}>
    <Text>{title}</Text>
    <ValueUnit value={value} unit={unit} valueSize={valueSize} />
  </View>
);

const styles = StyleSheet.create({
  horisontalField: {
    alignItems: 'center',
    borderColor: themeColors.offBlack,
    flex: 1
  },
})