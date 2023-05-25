import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { useColorScheme,  StyleSheet, Text, TouchableOpacity, View,  LogBox} from 'react-native'
import { RoomProvider } from '../contexts/RoomContext'
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import useBLE from '../hooks/useBLE'
import DeviceModal from '../layouts/Device'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(home)',
}

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
  } = useBLE()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const hideModal = () => {
    setIsModalVisible(false)
  }

  const openModal = async () => {
    scanForDevices()
    setIsModalVisible(true)
  }

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions()
    if (isPermissionsEnabled) {
      scanForPeripherals()
    }
  }



  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      <View style={styles.heartRateTitleWrapper}>
        {connectedDevice ? (
          <>
          <RootLayoutNav />
          </>
        ) : (
          <Text style={styles.heartRateTitleText}>
            Por Favor, Conecte o Dispositivo Bluetooth.
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? "Disconectar" : "Conectar"}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <>
      <RoomProvider>
        <BottomSheetModalProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen
                name="(home)/index"
                options={
                  {
                    title: "Casa",
                    headerLargeTitle: true,
                  }
                } />
              <Stack.Screen
                name="room/[id]"
                options={
                  {
                    title: "Cômodo",
                    headerLargeTitle: true,
                  }
                } />
              <Stack.Screen
                name="accessory-creator"
                options={
                  {
                    title: "Adicionar acessório",
                    presentation: 'modal',
                  }
                } />
              <Stack.Screen
                name="room-creator"
                options={
                  {
                    title: "Adicionar cômodo",
                    presentation: 'modal',
                    headerLargeTitle: true,
                  }
                } />
            </Stack>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </RoomProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: "#ff8801",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
})