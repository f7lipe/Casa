/* eslint-disable no-bitwise */
import { useMemo, useState, createContext } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";

import * as ExpoDevice from "expo-device";

import base64 from "react-native-base64";

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const CHARACTERISTIC_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

interface BluetoothLowEnergyApi {
    requestPermissions(): Promise<boolean>;
    scanForPeripherals(): void;
    connectToDevice: (deviceId: Device) => Promise<void>;
    disconnectFromDevice: () => void;
    connectedDevice: Device | null;
    allDevices: Device[];
    toggleAccessoryState: (pin: number, state: number) => Promise<void> 
}

export const BLEContext = createContext({} as BluetoothLowEnergyApi)

interface BLEProviderProps {
    children: React.ReactNode
}

export function BLEProvider({children}:BLEProviderProps){

    const bleManager = useMemo(() => new BleManager(), []);
    const [allDevices, setAllDevices] = useState<Device[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
    const [heartRate, setHeartRate] = useState<number>(0);
  
    const requestAndroid31Permissions = async () => {
      const bluetoothScanPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: "Location Permission",
          message: "Bluetooth Low Energy requires Location",
          buttonPositive: "OK",
        }
      );
      const bluetoothConnectPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: "Location Permission",
          message: "Bluetooth Low Energy requires Location",
          buttonPositive: "OK",
        }
      );
      const fineLocationPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Bluetooth Low Energy requires Location",
          buttonPositive: "OK",
        }
      );
  
      return (
        bluetoothScanPermission === "granted" &&
        bluetoothConnectPermission === "granted" &&
        fineLocationPermission === "granted"
      );
    };
  
    const requestPermissions = async () => {
      if (Platform.OS === "android") {
        if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Permission",
              message: "Bluetooth Low Energy requires Location",
              buttonPositive: "OK",
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const isAndroid31PermissionsGranted =
            await requestAndroid31Permissions();
  
          return isAndroid31PermissionsGranted;
        }
      } else {
        return true;
      }
    };
  
    const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
      devices.findIndex((device) => nextDevice.id === device.id) > -1;
  
    const scanForPeripherals = () =>
      bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log(error);
        }
        if (device && device.name?.includes("ESP")) {
          setAllDevices((prevState: Device[]) => {
            if (!isDuplicteDevice(prevState, device)) {
              return [...prevState, device];
            }
            return prevState;
          });
        }
      });
  
    const connectToDevice = async (device: Device) => {
      console.info("CONNECTING TO ", device.name)
      try {
        const deviceConnection = await bleManager.connectToDevice(device.id);
        setConnectedDevice(deviceConnection);
        await deviceConnection.discoverAllServicesAndCharacteristics();
        bleManager.stopDeviceScan();
        startStreamingData(deviceConnection);
        console.info("SUCCESS CONNECTED TO ", deviceConnection.name)
      } catch (e) {
        console.log("FAILED TO CONNECT", e);
      }
    };
  
    const disconnectFromDevice = () => {
      if (connectedDevice) {
        bleManager.cancelDeviceConnection(connectedDevice.id);
        setConnectedDevice(null);
        setHeartRate(0);
      }
    };
  
    const onHeartRateUpdate = (
      error: BleError | null,
      characteristic: Characteristic | null
    ) => {
      if (error) {
        console.log(error);
        return -1;
      } else if (!characteristic?.value) {
        console.log("No Data was recieved");
        return -1;
      }
  
      const rawData = base64.decode(characteristic.value);
      let innerHeartRate: number = -1;
  
      const firstBitValue: number = Number(rawData) & 0x01;
  
      if (firstBitValue === 0) {
        innerHeartRate = rawData[1].charCodeAt(0);
      } else {
        innerHeartRate =
          Number(rawData[1].charCodeAt(0) << 8) +
          Number(rawData[2].charCodeAt(2));
      }
  
      setHeartRate(innerHeartRate);
    };
  
    const startStreamingData = async (device: Device) => {
      if (device) {
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          CHARACTERISTIC_UUID,
          onHeartRateUpdate
        );
      } else {
        console.log("No Device Connected");
      }
    };
  
    const toggleAccessoryState = async (pin: number, state: number) => {
      if (!connectedDevice) {
      console.log('Nenhum dispositivo conectado');
      return;
      }
      
  
  
      const data = `{pin: ${pin}, state: ${state}}`
      console.log(data)
      try {
      if (!connectedDevice.isConnected){
          await connectedDevice.connect()
      } else {
      await connectedDevice.writeCharacteristicWithResponseForService(
          SERVICE_UUID,
          CHARACTERISTIC_UUID,
          base64.encode(data)
      );
      }
      console.log('Comando enviado com sucesso');
      } catch (error) {
      console.log('Erro ao enviar o comando:', error);
      }
  };

    return(
        <BLEContext.Provider value={
            {
                scanForPeripherals,
                requestPermissions,
                connectToDevice,
                allDevices,
                connectedDevice,
                disconnectFromDevice,
                toggleAccessoryState,
            }
        }>
            {children}
        </BLEContext.Provider>
    )

}