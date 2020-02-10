import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { addSensor } from '../../redux/actions/bluetooth';
import { themeColors, Spinner, Icon, FlatListSeparator, fullWidth } from '../common';

export class SearchBLE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      addingDevice: false,
      error: '',
    }
  }
  componentDidMount() {
    this.onStartScan();
  }
  componentWillUnmount() {
    this.onStopScan();
  }
  onStartScan = () => {
    this.props.bluetooth.manager.startDeviceScan(null, null, (error, device) => {
      if (error) this.setState({ error })
      if (!!device.serviceUUIDs &&
        !!device.serviceUUIDs.find(d => d.includes('180d')) &&  //Check if device is HR sensor
        !this.state.devices.find(d => d.id == device.id)) {  //Check if device is not already added
        this.setState({ devices: [...this.state.devices, device] })
      }
    })
  };
  onStopScan = () => {
    this.props.bluetooth.manager.stopDeviceScan();
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
        <View style={styles.scanning}>
          <ActivityIndicator />
          <Text>  Scanning...</Text>
        </View>
        {this.state.addingDevice ?
          <Spinner /> :
          <FlatList
            style={styles.list}
            data={this.state.devices}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <FlatListSeparator />}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.listItem}
                onPress={() => this.onAddDevice(item)}
              >
                <Icon icon='bluetooth' style={styles.icon} />
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', width: '100%', },
  scanning: { flexDirection: 'row', marginVertical: 15, },
  list: { borderWidth: 1, borderColor: themeColors.offWhite, borderRadius: 20, },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: fullWidth - 30,
  },
  itemText: { color: themeColors.offWhite, fontSize: 20, fontWeight: 'bold', },
  icon: { fontSize: 23, marginLeft: 10, marginRight: 15, },
})

const mapStateToProps = (state) => ({
  bluetooth: state.bluetooth
});
const mapDispatchToProps = (dispatch) => ({
  addSensor: (sensor) => dispatch(addSensor(sensor))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBLE)