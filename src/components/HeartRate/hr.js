import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import KeepAwake from 'react-native-keep-awake';
import { connect } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { ButtonIcon, themeColors, formatDateEU } from '../common';
import { atob } from '../../functions/Base64';
import { SensorCard } from './SensorCard';
import { HRCard } from './HRCard';

export class HeartRate extends React.Component {
  constructor(props) {
    KeepAwake.activate()
    super(props);
    // this.manager = new BleManager();
    this.state = {
      manager: new BleManager(),
      devices: this.props.sensors,
      connected: '',
      bpm: 0,
      status: '',
      error: '',
    }
  };
  // onSetDevices = (devices) => this.setState({ devices })
  // data = {
  //   labels: [],
  //   data: []
  // }
  data = []

  connectDevice = (device) => {
    const hrService = device.serviceUUIDs.find(d => d.includes('180d'))
    device.connect()
      .then((device) => {
        this.setState({ status: 'Device connected', connected: device })
        return device.discoverAllServicesAndCharacteristics()
      })
      .then((device) => {
        return device.characteristicsForService(hrService)
      })
      .then((chars) => {
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
              bpm = parseInt(array[1].toString(10));
            }
            else {
              var array16 = new Uint16Array(array.subarray(1, 3));
              bpm = parseInt(array16[0].toString(10));
            }
            // console.log('format', valueFormat);
            // console.log(device.name)
            this.data.push(bpm)
            console.log(this.data)
            this.setState({ bpm })
          }
          else this.setState({ status: 'Device disconnected, no data' })
        }));
      })
      .catch((error) => {
        this.setState(error);
      });
  }
  disconnectDevice = (device) => {
    device.cancelConnection()
    this.setState({ status: 'Device disconnected', bpm: '' })
  }
  onBLEManager = () => {
    this.state.manager ?
      this.setState({ manager: '' }) && this.state.manager.destroy()
      :
      this.setState({ manager: new BleManager() })
  }
  onAddHRM = () => {
    this.props.history.push({
      pathname: '/search-hrm',
      state: {
        manager: this.state.manager,
        devices: this.state.devices
      }
    })
  }
  componentWillUnmount() {
    !!this.state.connected && this.disconnectDevice(this.state.connected)
  }
  render() {
    return (
      <View style={{ width: this.props.fullWidth }}>
        <ScrollView contentContainerStyle={{ width: '100%', paddingHorizontal: 30 }}>
          <View style={styles.iconBtnContainer}>
            <ButtonIcon style={styles.iconBtn} onPress={this.onBLEManager}
              icon={this.state.manager ? 'bluetooth' : 'bluetooth-off'}
            />
            <ButtonIcon style={styles.iconBtn} onPress={this.onAddHRM} icon='plus' />
          </View>
          <Text style={{ textAlign: 'center' }}>{this.state.status}</Text>
          <Text style={{ color: 'red' }}>{this.state.error}</Text>
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
          <HRCard bpm={this.state.bpm} kCal={350} age={32} user='Alex' />
          {this.data.length > 0 &&
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                <Text style={styles.text}>Min: {Math.min(...this.data)}</Text>
                <Text style={styles.text}>Avg: {Math.round(this.data.reduce((a, b) => a + b) / this.data.length)}</Text>
                <Text style={styles.text}>Max: {Math.max(...this.data)}</Text>
              </View>
              <LineChart
                data={{ datasets: [{ data: this.data }] }}
                bezier withDots={false} withInnerLines={false}
                width={this.props.fullWidth - 60} height={150}
                yAxisSuffix={"bpm"}
                chartConfig={{
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: { borderRadius: 16 },
                }}
                style={{ marginVertical: 10, borderRadius: 16, width: '100%' }}
              />
            </View>
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  },
  text: {
    textAlign: 'center',
    color: themeColors.offWhite,
    fontSize: 25,
    fontWeight: 'bold',
  }
})

const mapStateToProps = (state) => ({
  sensors: state.sensors
});

export default connect(mapStateToProps)(HeartRate);