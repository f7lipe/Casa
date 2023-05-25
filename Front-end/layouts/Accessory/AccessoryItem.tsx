import { StyleSheet } from "react-native"
import { View, Text } from "../../components/Themed"
import AccessoryImage from "../../components/AccessoryImage"
import RoundedTile from "../../components/RoundedTile"

interface Props {
    isOn: boolean
    name: string
    icon: string
}

export function AccesoryItem({ name, icon, isOn }: Props) {
    return (
        <RoundedTile>
            <View style={styles.icon}>
                <AccessoryImage 
                    accessoryName={icon} 
                    isOn={isOn} 
                    size={100} />
            </View>
            <Text 
                style={styles.name}>{name}</Text>
        </RoundedTile>
    )
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: "transparent"
    },
    name: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: "bold",
    }
})

