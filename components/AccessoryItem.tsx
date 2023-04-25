import { StyleSheet } from "react-native"
import { View, Text } from "./Themed"
import Icon from "./Icon"
import { Image } from 'react-native';

interface Props {
    id: string
    name: string
    icon: string
}

export function AccesoryItem({ name, icon, id }: Props) {
    return (
            <View style={styles.container}>
                <View style={styles.icon}>
                     <Image style={{ width: 70, height: 100 }}
                            source={require('../assets/images/bulb-off.png')} />
                </View>
                <Text style={styles.name}>{name}</Text>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 150,
        padding: 10,
        backgroundColor: "#edeaea69",
        borderRadius: 8,
        margin: 16,
    },

    icon: {
        backgroundColor: "transparent"
    },

    name: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: "bold",
        color: "#000",
    }
})

