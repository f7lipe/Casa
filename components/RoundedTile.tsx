import { StyleSheet } from "react-native"
import { View } from "./Themed"

interface Props {
    children: React.ReactNode
}

export default function RoundedTile({ children }: Props) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        padding: 10,
        margin: 16,
        borderRadius: 15,
        backgroundColor: "#b5b5b53f",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
})