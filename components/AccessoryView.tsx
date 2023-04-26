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
    const { getAccessory, updateAccessory } = useRoom()
    const accessory = getAccessory(roomId, accessoryId)
    const toogleAccessory = () => {
        const updatedAccessory = {
            ...accessory,
            isOn: !accessory?.isOn
        } as Accessory
        
        updateAccessory(roomId, updatedAccessory)
    }

    return (
        <View style={styles.container}>
            <View style={styles.accessoryInfo}>
                <View style={styles.accessory}>
                    {
                        accessory?.isOn ? (
                            <Image style={{ width: 140, height: 170 }}
                                source={require(`../assets/images/bulb-on.png`)} />
                        ) : (
                            <Image style={{ width: 140, height: 170 }}
                                source={require(`../assets/images/bulb-off.png`)} />
                        )

                    }
                    <Switch
                        style={styles.switch}
                        value={accessory?.isOn}
                        onValueChange={toogleAccessory}
                         />
                </View>
                <Text style={styles.title}>{accessory?.name}</Text>
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
    accessory: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    switch:{
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
        marginTop: 20,
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