import { StyleSheet, Image } from "react-native"
import { View, Text } from "./Themed"

interface Props {
    isOn: boolean
    name: string
    icon: string
}

export function AccesoryItem({ name, icon, isOn }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
            {
                        isOn ? (
                            <Image style={{ width: 70, height: 100 }}
                                source={require(`../assets/images/bulb-on.png`)} />
                        ) : (
                            <Image style={{ width: 70, height: 100 }}
                                source={require(`../assets/images/bulb-off.png`)} />
                        )

                    }
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

