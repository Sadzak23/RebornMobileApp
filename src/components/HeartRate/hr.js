import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import { connect } from 'react-redux';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { themeColors, ButtonIconText, timerColors, fullWidth } from '../common';
import { atob, calculateHrZones, caloriesPerMin } from '../../functions';
import { HRCard } from './HRCard';
import { SimpleTimer } from '../TimerWorkout/SimpleTimer';

export class HeartRate extends React.Component {
  constructor(props) {
    super(props);
    this.manager = this.props.bluetooth.manager
    this.sensor = this.props.bluetooth.sensor
    this.state = {
      connected: false,
      char: null,
      bpm: 0,
      calories: 0,
      status: '',
      zones: null
    }
    KeepAwake.activate()
  };
  timer = React.createRef()
  data = []
  
  isConnected = () => this.sensor.isConnected().then(res => {
    this.setState({ connected: res })
    console.log(this.state.connected)
  })

  onButton = () => {
    !!this.sensor.id ? this.connectDevice() : this.props.history.push('/search-hrm')
  };
  onStopListening = () => {
    this.manager.cancelTransaction('monitorHR')
    console.log('stop monitoring')
    this.timer.current.stop();
  }
  onStartListening = () => {
    this.setState({ bpm: 0 })
    this.state.char.monitor((err, data) => {
      if (!err) {
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
          (bpm > 0) && this.data.push(bpm)
          console.log(this.data)
          this.setState({ 
            bpm,
            calories: Math.round(caloriesPerMin({
              age: 32,
              weight: 73,
              hr: Math.round(this.data.reduce((a, b) => a + b) / this.data.length),
              gender: 'female',
              duration: this.timer.current.state.time
            })*10) / 10,
            zones: calculateHrZones(this.data)
          })
        }
      }
      else this.setState({ status: 'Device disconnected', bpm: 0 })
    }, 'monitorHR');
    this.timer.current.runStopTimer()
  }
  connectDevice = () => {
    if (this.state.status === 'Device connected') {
      this.disconnectDevice()
    } else {
      const hrService = this.sensor.serviceUUIDs.find(d => d.includes('180d'))
      this.setState({ status: 'Connecting...' })
      this.sensor.connect()
        .then((sensor) => {
          return sensor.discoverAllServicesAndCharacteristics()
        })
        .then((sensor) => {
          return sensor.characteristicsForService(hrService)
        })
        .then((chars) => {
          this.setState({
            status: 'Device connected',
            char: chars[0]
          })
          this.onStartListening(chars[0])
        })
        .catch((error) => {
          this.setState({ status: 'Device was not found' });
          console.log(error)
        });
    }
  }
  disconnectDevice = () => {
    this.onStopListening();
    this.sensor.cancelConnection()
    this.timer.current.stop();
    this.setState({ status: 'Device disconnected', bpm: 0 })
  }
  runTimer = () => this.timer.current.runStopTimer()
  onTimerFinish = () => {
    console.log('done')
    this.timer.current.setTime(4)
  }
  componentWillUnmount() {
    this.state.status === 'Device connected' && this.disconnectDevice()
  }
  render() {
    return (
      <View style={{ width: this.props.fullWidth }}>
        <SimpleTimer ref={this.timer} time={8} onFinish={this.onTimerFinish} size={30} />
        <ButtonIconText onPress={this.runTimer} icon='play-pause' text='timer' />
        <ScrollView contentContainerStyle={{ width: '100%', paddingHorizontal: 30, paddingBottom: 300 }}>
          <Text style={{ textAlign: 'center' }}>
            {!!this.sensor.name ? `Connected sensor: ${this.sensor.name}` : 'No connected sensor'}
          </Text>
          <ButtonIconText style={styles.iconBtn} icon='link-variant'
            text={!this.sensor.id ? 'Pair New Sensor' : 'Connect sensor'}
            onPress={this.onButton}
          />
          <ButtonIconText style={styles.iconBtn} text={'Listen'} onPress={this.onStartListening} disabled={this.state.status !== 'Device connected'} />
          <ButtonIconText style={styles.iconBtn} text={'Test'} onPress={() => this.setState({ zones: calculateHrZones(this.data) })} />

          <Text style={{ textAlign: 'center' }}>{this.state.status}</Text>
          <Text style={{ color: 'red' }}>{this.state.error}</Text>
          <HRCard bpm={this.state.bpm} kCal={this.state.calories} age={32} />
          {this.data.length > 0 &&
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                <Text style={styles.text}>Min: {Math.min(...this.data)}</Text>
                <Text style={styles.text}>Avg: {Math.round(this.data.reduce((a, b) => a + b) / this.data.length)}</Text>
                <Text style={styles.text}>Max: {Math.max(...this.data)}</Text>
              </View>
              <ScrollView horizontal>
                <LineChart
                  data={{ datasets: [{ data: this.data }] }}
                  bezier withDots={false} withInnerLines={false}
                  height={150} width={this.props.fullWidth - 60}
                  yAxisSuffix={"bpm"}
                  chartConfig={chartConfig}
                  style={styles.chart}
                />
              </ScrollView>
            </View>
          }
          {
            this.state.zones &&
            <PieChart
              data={[{
                name: 'Zone 1',
                color: timerColors.Gray,
                number: this.state.zones[0],
                legendFontColor: "#fff",
                legendFontSize: 15
              }, {
                name: 'Zone 2',
                color: timerColors.Blue,
                number: this.state.zones[1],
                legendFontColor: "#fff",
                legendFontSize: 15
              }, {
                name: 'Zone 3',
                color: timerColors.Green,
                number: this.state.zones[2],
                legendFontColor: "#fff",
                legendFontSize: 15
              }, {
                name: 'Zone 4',
                color: timerColors.Yellow,
                number: this.state.zones[3],
                legendFontColor: "#fff",
                legendFontSize: 15
              }, {
                name: 'Zone 5',
                color: timerColors.Red,
                number: this.state.zones[4],
                legendFontColor: "#fff",
                legendFontSize: 15
              },
              ]}
              width={fullWidth - 10}
              height={200}
              chartConfig={chartConfig}
              accessor='number'
              backgroundColor="transparent"
            />
          }
        </ScrollView>
      </View>
    )
  }
}

const chartConfig = {
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: { borderRadius: 16 },
}

const styles = StyleSheet.create({
  iconBtn: {
    marginTop: 20,
    backgroundColor: themeColors.themePrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 50,
  },
  text: {
    textAlign: 'center',
    color: themeColors.offWhite,
    fontSize: 25,
    fontWeight: 'bold',
  },
  chart: { marginVertical: 10, borderRadius: 16, width: '100%' }
})

const mapStateToProps = (state) => ({
  bluetooth: state.bluetooth
});
// const mapDispatchToProps = (dispatch) => ({
//   createManager: () => dispatch(createManager()),
//   destroyManager: () => dispatch(destroyManager())
// })

export default connect(mapStateToProps)(HeartRate);