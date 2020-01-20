import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { ButtonText, ButtonIcon, themeColors } from '../common';
import { atob } from './Base64';
import { SensorCard } from './SensorCard';
import KeepAwake from 'react-native-keep-awake';
import { SearchBLE } from './SearchBLE';

export class HeartRate extends React.Component {
  constructor() {
    KeepAwake.activate()
    super();
    // this.manager = new BleManager();
    this.state = {
      manager: new BleManager(),
      devices: [],
      value: '',
      status: '',
      error: '',
    }
  };

  onStartScan = () => {
    this.setState({ status: 'Scanning...' })
    this.state.manager.startDeviceScan(null, null, (error, device) => {
      if (error) this.setState({ error })
      if (!!device.serviceUUIDs &&  //Check if device is HR sensor
        !!device.serviceUUIDs.find(d => d.includes('180d')) &&  //Check if device is not already added
        !this.state.devices.find(d => d.id == device.id)) {
        this.setState({
          devices: [...this.state.devices, device]
        })
        console.log(this.state.devices)
      }
    })
  };
  onStopScan = () => {
    this.state.manager.stopDeviceScan();
    this.setState({ status: 'Scan complete' })
  }
  onSetDevices = (devices) => this.setState({ devices })

  connectDevice = (device) => {
    const hrService = device.serviceUUIDs.find(d => d.includes('180d'))
    device.connect()
      .then((device) => {
        this.setState({ status: 'Device connected' })
        return device.discoverAllServicesAndCharacteristics()
      })
      .then((device) => {
        return device.characteristicsForService(hrService)
      })
      .then((chars) => {
        console.log('chars: ', chars)
        chars[0].monitor(((err, data) => {
          if (!!data) {
            var dataB = atob(data.value)
            var rawLength = dataB.length;
            var array = new Uint8Array(new ArrayBuffer(rawLength));
            for (var i = 0; i < rawLength; i++) {
              array[i] = dataB.charCodeAt(i);
            }
            const valueFormat = (array[0] >> 0) & 0b01;
            var bpm;
            if (valueFormat == 0) {
              bpm = array[1].toString(10);
            }
            else {
              var array16 = new Uint16Array(array.subarray(1, 3));
              bpm = array16[0].toString(10);
            }
            // console.log('format', valueFormat);
            // console.log(bpm)
            this.setState({ value: bpm })
          }
        }));
      })
      .catch((error) => {
        this.setState(error);
      });
  }
  disconnectDevice = (device) => {
  device.cancelConnection()
  this.setState({status: 'Device disconnected'})
  }
  onBLEManager = () => {
    this.state.manager ?
      this.setState({ manager: '' }) && this.state.manager.destroy()
      :
      this.setState({ manager: new BleManager() })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ width: '100%' }}>
          <View style={styles.iconBtnContainer}>
            <ButtonIcon style={styles.iconBtn} icon={this.state.manager ? 'bluetooth' : 'bluetooth-off'}
              onPress={this.onBLEManager}
            />
          </View>
          <View style={{ padding: 10 }}>
            <SearchBLE
              onStartScan={this.onStartScan}
              onStopScan={this.onStopScan}
              setDevices={this.onSetDevices}
              status={this.state.status}
              noManager={!this.state.manager}
            />

          </View>
          <Text style={{ textAlign: 'center' }}>{this.state.status}</Text>
          <Text style={{ color: 'red' }}>{this.state.error}</Text>
          <Text style={styles.value}>{this.state.value}</Text>
          {
            this.state.devices && this.state.devices.map(device =>
              <SensorCard
                device={device}
                connect={this.connectDevice}
                disconnect={this.disconnectDevice}
                key={device.id}
              />
            )
          }
        </ScrollView>
      </View>
    )
  }
  // <ButtonText style={styles.btn} text='Clear' onPress={() => this.setState({ devices: [] })} />
  //         <View style={{ flexDirection: 'row' }}>
  //           <ButtonText disabled={!this.state.manager} style={styles.btn}
  //             text='Find New Device' onPress={this.onSearchDevices} />
  //           <ButtonText disabled={!this.state.manager} style={styles.btn}
  //             text='Stop' onPress={this.onStopScan} />
  //         </View>
}

const styles = StyleSheet.create({
  value: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    color: themeColors.offWhite,
  },
  btn: {
    marginTop: 20,
    width: 200,
  },
  iconBtnContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  iconBtn: {
    backgroundColor: themeColors.theme2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 50,
    width: 50,
  }
})