import { useCallback, useState } from 'react'
import { StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import { Text, View } from '../components/Themed';
import NoRooms from '../components/NoRooms';

interface Room {
  name: string
  icon: string
  id: string
  accessories?: Acessory[]
}

interface Acessory {
  name: string
  icon: string
  id: string
  isOn: boolean
}

export default function Page() {
  const [rooms, setRooms] = useState<Room[]>([])
  const addRoom = useCallback((name: string, icon: string) => {
    console.log(name, icon)
    setRooms((prev) => [
      ...prev,
      {
        name,
        icon,
        id: Math.random().toString(),
      },
    ])
  }, [])

  const handleAddRoom = () => {
    addRoom('Sala', 'tv')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.main}>
          {
            !rooms.length  && (
              <NoRooms />
            )
          }
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddRoom}>
          <Text style={styles.buttonText}>Adicionar cômodo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    justifyContent: "space-between"
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
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
    position: 'absolute',
    bottom: 0
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#232323',
  },
})
