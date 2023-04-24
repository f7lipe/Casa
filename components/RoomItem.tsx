import { Link } from "expo-router"
import { StyleSheet } from "react-native"
import { View, Text } from "./Themed"
import Icon from "./Icon"

interface Props {
    id: string
    name: string
    icon: string
}

export function RoomItem({ name, icon, id }: Props) {
    return (
        <Link href={`/room/${id}`} asChild>
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Icon name={icon} size={50}/>
                </View>
                <Text style={styles.name}>{name}</Text>
            </View>
        </Link>
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
        marginTop: 20,
        fontWeight: "bold",
        color: "#000",
    }
})

