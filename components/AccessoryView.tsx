import { useState } from "react"
import { useRoom } from "../hooks/useRoom"
import {
    StyleSheet,
    Switch,
    Image
} from 'react-native'
import { View, Text } from "../components/Themed"

interface Props {
    accessoryId: string
    roomId: string
}

export function AccessoryView({ accessoryId, roomId }: Props) {
    const { getAccessory } = useRoom()
    const accessory = getAccessory(roomId, accessoryId)
    
    return (
        <View style={styles.container}>
            <View style={styles.accessoryInfo}>
                <View>
                    <Image style={{ width: 150, height: 180 }}
                        source={require(`../assets/images/bulb-off.png`)} />
                    <Switch
                        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                        value={accessory?.isOn}
                         />
                </View>
                <Text>{accessory?.name}</Text>
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    accessoryInfo: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#000',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
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


export default AccessoryView