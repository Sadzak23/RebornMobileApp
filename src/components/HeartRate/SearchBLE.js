import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { themeColors, ButtonSpinner } from '../common';

export const SearchBLE = ({ onStartScan, onStopScan, setDevices, noManager }) => {
  const [scanning, setScanning] = useState(false)
  const onScan = () => {
    onStartScan();
    setScanning(true);
  }
  const onStop = () => {
    onStopScan();
    setScanning(false);
  }
  return (
    <View style={styles.container}>
      <ButtonSpinner disabled={noManager}
        spinner={scanning}
        text={scanning ? 'Stop Scanning' : 'Find New Devices'}
        color={themeColors.offWhite}
        icon='briefcase-search-outline'
        style={{ height: 50 }}
        onPress={scanning ? onStop : onScan}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', },
})