import React, { useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from '../../components/Themed'
import AppIntroduction from '../../layouts/Room/AppIntroduction'
import { IconName } from '../../@types/icon'
import { useRoom } from '../../hooks/useRoom'
import { RoomItem } from '../../layouts/Room'
import { useRouter, Link } from 'expo-router'
import { useBLE } from '../../hooks/useBLE'
import DeviceModal from '../../layouts/Device'
import Icon from '../../components/Icon'


export default function RoomListScreen(): React.ReactElement {
  const { rooms } = useRoom()
  const router = useRouter()

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
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };


  const renderRoomItem = ({ item }: { item: Room }): React.ReactElement => (
    <TouchableOpacity
      onPress={() => router.push(`/room/${item.id}`)}>
      <RoomItem
        name={item.name}
        icon={item.icon as IconName}
        id={item.id.toString()} />
    </TouchableOpacity>
  )
  const renderEmptyList = (): React.ReactElement => <AppIntroduction />

  const renderRoomList = (): React.ReactElement => (
    <FlatList
      contentContainerStyle={styles.roomList}
      data={rooms}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderRoomItem}
      numColumns={2}
    />
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      {
        !connectedDevice &&
        <TouchableOpacity
          onPress={connectedDevice ? disconnectFromDevice : openModal}
          style={styles.connectionButton}
        >
          <Icon
            name={connectedDevice ? 'Connected' : 'Disconnected'}
            size={35}
            color={connectedDevice ? 'green' : 'red'} />
        </TouchableOpacity>
      }
      <View style={styles.container}>
        <View style={styles.main}>
          {rooms.length === 0 ? renderEmptyList() : renderRoomList()}
        </View>
        <Link href="/room-creator" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Adicionar cômodo</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  roomList: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffd94e',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
  },
  connectionButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#232323',
  },
})
