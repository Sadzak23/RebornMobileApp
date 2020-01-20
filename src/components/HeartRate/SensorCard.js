import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { themeColors, ButtonIconText } from '../common';

export const SensorCard = ({ device, connect, disconnect }) => {
  const [isConnected, setIsConnected] = useState(false)
  const onStatusChange = async () => {
    if (isConnected) {
      await disconnect(device);
      setIsConnected(false)
    } else {
      await connect(device);
      setIsConnected(true)
    }
  }
  return (
    <ButtonIconText
      blankStyle
      style={[styles.btn, isConnected && styles.connected]}
      text={device.name}
      icon={isConnected ? 'bluetooth-connect' : 'bluetooth-off'}
      onPress={onStatusChange}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: themeColors.offWhite,
    padding: 5,
    width: '100%'
  },
  connected: {
    backgroundColor: themeColors.theme2,
    elevation: 10,
  }
})