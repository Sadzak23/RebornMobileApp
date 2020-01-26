import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addSensor } from '../../redux/actions/sensors';
import { themeColors, ButtonSpinner, Spinner, ButtonIconText } from '../common';

export class SearchBLE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: this.props.location ? this.props.location.state.manager : '',
      devices: [],
      searching: false,
      addingDevice: false,
      error: '',
    }
  }

  onStartScan = () => {
    this.setState({ searching: true })
    this.state.manager.startDeviceScan(null, null, (error, device) => {
      if (error) this.setState({ error })
      if (!!device.serviceUUIDs &&
        !!device.serviceUUIDs.find(d => d.includes('180d')) &&  //Check if device is HR sensor
        !this.state.devices.find(d => d.id == device.id)) {  //Check if device is not already added
        this.setState({
          devices: [...this.state.devices, device]
        })
      }
    })
  };
  onStopScan = () => {
    this.state.manager.stopDeviceScan();
    this.setState({ searching: false })
  }

  onAddDevice = async (device) => {
    this.onStopScan()
    this.setState({ addingDevice: true })
    await this.props.addSensor(device)
    this.props.history.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <ButtonSpinner
          // disabled={!this.manager}
          spinner={this.state.searching}
          text={this.state.searching ? 'Stop Searching' : 'Find New Devices'}
          color={themeColors.offWhite}
          icon='briefcase-search-outline'
          style={{ height: 50 }}
          onPress={this.state.searching ? this.onStopScan : this.onStartScan}
        />
        {this.state.addingDevice ?
          <Spinner /> :
          this.state.devices && this.state.devices.map(device =>
            <ButtonIconText
              onPress={() => this.onAddDevice(device)}
              key={device.id}
              text={device.name}
              icon='plus-circle'
            />
          )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})

const mapDispatchToProps = (dispatch) => ({
  addSensor: (sensor) => dispatch(addSensor(sensor))
})
export default connect(undefined, mapDispatchToProps)(SearchBLE)