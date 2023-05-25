import { View, Text } from "./Themed"
import { StyleSheet, TouchableOpacity } from "react-native"

interface Props {
    onUpPress: () => void
    onDownPress: () => void
    title?: string
    icons?: {
        up: JSX.Element
        down: JSX.Element
    }
}

export const BifunctionalButton = ({
    onUpPress,
    onDownPress,
    title,
    icons,
}: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onUpPress} >
                <View style={styles.button}>
                    {icons?.up || 'Up'}
                </View>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
             onPress={onDownPress}>
            <View
                style={styles.button}>
                {icons?.down || 'Down'}
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 30,
        padding: 10,
        width: 80,
        height: 200,
    },
    button: {
        width: 20,
        height: 20,
        backgroundColor: 'transparent',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: 'black'
    }
})
