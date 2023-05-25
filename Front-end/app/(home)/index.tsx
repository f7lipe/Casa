import React, { useEffect } from 'react'
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from '../../components/Themed'
import AppIntroduction from '../../layouts/Room/AppIntroduction'
import { IconName } from '../../../@types/icon'
import { useRoom } from '../../hooks/useRoom'
import { RoomItem } from '../../layouts/Room'
import { useRouter, Link } from 'expo-router'

export default function RoomListScreen(): React.ReactElement {
  const { rooms } = useRoom()
  const router = useRouter()

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
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#232323',
  },
})
