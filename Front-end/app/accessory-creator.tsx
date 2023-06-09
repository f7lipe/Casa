import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native'
import { Text, View } from '../components/Themed'
import { useRoom } from '../hooks/useRoom'
import { useLocalSearchParams, useRouter } from "expo-router"
import { BarCodeScanner, BarCodeScannedCallback, BarCodeEvent } from 'expo-barcode-scanner';
import uuid from 'react-native-uuid'
import Icon from '../components/Icon';

interface QRCodeData {
  portNumber: number
  name: string
  type: RgbLedAccessory | GateAccessory | OutletAccessory
}


function AccessoryCreator() {
  const { roomId } = useLocalSearchParams() as { roomId: string }
  const { addAccessory } = useRoom()
  const router = useRouter()

  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  function createAccessoryFromQRCode(qrCodeData: QRCodeData, roomId: string): Accessory {
    const { portNumber, name, type } = qrCodeData;

    switch (type) {
      case 'BulbAccessory':
        return {
          id: uuid.v4(),
          roomId,
          port: portNumber,
          name,
          icon: 'bulb',
          isOn: false,
          type
        }
      case 'SmartTvAccessory':
        return {
          id: uuid.v4(),
          roomId,
          port: portNumber,
          name,
          icon: 'tv',
          isOn: false,
          type
        }
      case 'GateAccessory':
        return {
          id: uuid.v4(),
          roomId,
          port: portNumber,
          name,
          icon: 'gate',
          isOn: false,
          type
        }
      case 'OutletAccessory':
        return {
          id: uuid.v4(),
          roomId,
          port: portNumber,
          name,
          icon: 'outlet-off',
          isOn: false,
          type
        }
      case 'AcAccessory':
        return {
          id: uuid.v4(),
          roomId,
          port: portNumber,
          name,
          icon: 'ac',
          isOn: false,
          type
        }
      default:
        throw new Error(`Invalid accessory type: ${type}`);
    }
  }

  const handleBarCodeScanned: BarCodeScannedCallback = (data: BarCodeEvent) => {
    setScanned(true)
    const qrCodeData = JSON.parse(data.data) as QRCodeData
    const newAccessory = createAccessoryFromQRCode(qrCodeData, roomId)
    addAccessory(roomId, newAccessory)
    router.back()
  }


  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject} />
      <View style={styles.instructions}>
        <Icon name="QrCodeScan" size={100} color='white' />
        <Text style={styles.instructionsTitle}>Escaneie um código de Acessório</Text>
        <Text style={styles.intructionsText}>Procure um código QR no acessório, embalagem ou instruções e posicione-o na moldura da câmera nesta tela.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  centerText: {
    textAlign: 'left',
  },
  addButton: {
    backgroundColor: '#000000',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  picker: {
    width: 150,
    height: 150,
    borderRadius: 50,
    backgroundColor: '#c7c7c765',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  instructions: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'transparent',
  },
  instructionsTitle: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'left',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  intructionsText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'left',
    backgroundColor: 'transparent',
  }

})

export default AccessoryCreator