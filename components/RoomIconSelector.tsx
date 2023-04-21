import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import rooms from '../constants/rooms'




interface Props {
    setIcon: (icon: string) => void
    isVisible: (condition: boolean) => void
}

function RoomIconSelector({ setIcon, isVisible }: Props) {
    const handlePress = (icon: string) => {
        setIcon(icon)
        isVisible(false)
    }
    return (
        <View style={styles.container}>
            {rooms.map((room, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handlePress(room.icon)}
                    style={styles.button}
                >
                    <Image source={{uri: `../assets/${room.icon}.svg`}} style={styles.icon} />
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        width: 30,
        height: 30,
      },
})

export default RoomIconSelector