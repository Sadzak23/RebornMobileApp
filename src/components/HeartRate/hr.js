import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { ButtonText } from '../src/components/common';

export const Play = () => {
  const [devices, setDevices] = useState([])
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const manager = new BleManager();

  // const prefixUUID = "f000aa"
  // const suffixUUID = "-0451-4000-b000-000000000000"
  // const serviceUUID = (num) => {
  //   return prefixUUID + num + "0" + suffixUUID
  // }
  // const notifyUUID = (num) => {
  //   return prefixUUID + num + "1" + suffixUUID
  // }
  // const writeUUID = (num) => {
  //   return prefixUUID + num + "2" + suffixUUID
  // }

  useEffect(() => {
    const subscription = manager.onStateChange((state) => console.log(state));
  }, [])

  const onStopScan = () => {
    manager.stopDeviceScan();
    setStatus('finished')
  }

  // const setupNotifications = async (device) => {
  //   // const a = await getServicesAndCharacteristicsForDevice(device)
  //   // console.log(a);
  //   console.log(device);
  //   const service = '00001800-0000-1000-8000-00805f9b34fb'
  //   const characteristicW = writeUUID(0)
  //   const characteristicN = notifyUUID(0)

  //   const characteristic = await device.writeCharacteristicWithResponseForService(
  //     service, '00002a00-0000-1000-8000-00805f9b34fb', "AQ==" /* 0x01 in hex */
  //   )

  //   device.monitorCharacteristicForService(service, '00002a01-0000-1000-8000-00805f9b34fb', (error, characteristic) => {
  //     if (error) {
  //       setError(error.message)
  //       return
  //     }
  //     updateValue(characteristic.value);
  //     console.log('connected');
  //   })
  // }
  // const getServicesAndCharacteristicsForDevice = async (device) => {
  //   var servicesMap = {}
  //   var services = await device.services()
  //   for (let service of services) {
  //     var characteristicsMap = {}
  //     var characteristics = await service.characteristics()

  //     for (let characteristic of characteristics) {
  //       characteristicsMap[characteristic.uuid] = {
  //         uuid: characteristic.uuid,
  //         isReadable: characteristic.isReadable,
  //         isWritableWithResponse: characteristic.isWritableWithResponse,
  //         isWritableWithoutResponse: characteristic.isWritableWithoutResponse,
  //         isNotifiable: characteristic.isNotifiable,
  //         isNotifying: characteristic.isNotifying,
  //         value: characteristic.value
  //       }
  //     }

  //     servicesMap[service.uuid] = {
  //       uuid: service.uuid,
  //       isPrimary: service.isPrimary,
  //       characteristicsCount: characteristics.length,
  //       characteristics: characteristicsMap
  //     }
  //   }
  //   return servicesMap
  // }

  const scanAndConnect = () => {
    setStatus('scanning');
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) setError(error)
      if (device) {
        setStatus('Connecting...')
        console.log(device)
        setDevices([...devices, device])
        // Stop scanning as it's not necessary if you are scanning for one device.
        onStopScan();

        // Proceed with connection.
        device.connect()
          .then((device) => {
            setStatus('Discovering services and characteristics')
            console.log('ch: ', device.discoverAllServicesAndCharacteristics())
            return device.discoverAllServicesAndCharacteristics()
          })
          .then((device) => {
            return device.characteristicsForService('0000180d-0000-1000-8000-00805f9b34fb')
            // setStatus('Setting notifications')
            // return setupNotifications(device)
          })
          .then((chars) => {
            console.log('chars: ', chars)
            chars[0].monitor(((err, data) => {
              console.log('data: ', data ? data : err)
            }));
          })
          .catch((error) => {
            console.log('error u nizu :(', error);
            // Handle errors
        });
        // .then(() => setStatus('Listening...'))
        // .catch((error) => {
        //   console.log(error);
        //   // Handle errors
        // });
      }
    });
  }

  return (
    <View>
      <Text>Play</Text>
      <ButtonText style={{ width: 200 }} text='Clear' onPress={() => setDevices([])} />
      <ButtonText style={{ width: 200, marginTop: 20 }} text='Stop' onPress={onStopScan} />
      <ButtonText style={{ width: 200, marginTop: 20 }} text='Connect' onPress={scanAndConnect} />
      <Text style={{ fontSize: 30 }}>{value}</Text>
      <Text>{status}</Text>
      <Text style={{ color: 'red' }}>{error}</Text>
      {
        devices && devices.map(e => (
          <View style={styles.btContainer} key={e.id}>
            <Text>{e.name}</Text>
            <Text>{e.id}</Text>
            <ButtonText text='connect' onPress={() => {
              //console.log(e);
              setupNotifications(e)
            }}
            />
          </View>
        )
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  btContainer: {
    backgroundColor: "#321",
    padding: 10,
    marginVertical: 15,
  }
})

export default Play