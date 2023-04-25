import { Link, useRouter } from 'expo-router';
import { StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import { Text, View } from '../../components/Themed';
import NoRooms from '../../components/NoRooms'
import { useRoom } from '../../hooks/useRoom'
import { RoomItem } from '../../components/RoomItem';


export default function Page() {
  const { rooms } = useRoom()
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.main}>
          {
            !rooms.length && (
              <NoRooms />
            )
          }
          {
            rooms.length > 0 && (
              <FlatList
              style={styles.flatList}
                data={rooms}
                key={2}
                numColumns={2}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>{
                       router.push(`/room/${item.id}`)
                    }}>
                      <RoomItem name={item.name} icon={item.icon} id={item.id} />
                    </TouchableOpacity>
                )}
              />
            )
          }
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
  flatList: {
    width: '100%',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
})
