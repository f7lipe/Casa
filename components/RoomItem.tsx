import { Link } from "expo-router"
import { StyleSheet } from "react-native"
import { View, Text } from "./Themed"
import Add from '../assets/images/add.svg'
import Bath from '../assets/images/bath.svg'
import Bed from '../assets/images/bed.svg'
import Garage from '../assets/images/garage.svg'
import Kitchen from '../assets/images/kitchen.svg'
import LivingRoom from '../assets/images/living-room.svg'
import Office from '../assets/images/office.svg'
import Other from '../assets/images/other.svg'

const ICON_SIZE = 70

const icons = {
    add: <Add width={ICON_SIZE} height={ICON_SIZE} />,
    bath: <Bath width={ICON_SIZE} height={ICON_SIZE} />,
    bed: <Bed width={ICON_SIZE} height={ICON_SIZE} />,
    garage: <Garage width={ICON_SIZE} height={ICON_SIZE} />,
    kitchen: <Kitchen width={ICON_SIZE} height={ICON_SIZE} />,
    livingRoom: <LivingRoom width={ICON_SIZE} height={ICON_SIZE} />,
    office: <Office width={ICON_SIZE} height={ICON_SIZE} />,
    other: <Other width={ICON_SIZE} height={ICON_SIZE} />,
}

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
                    {
                        icons[icon]
                    }
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
        backgroundColor: "#d2c8c869",
        borderRadius: 8,
        margin: 16,
    },

    icon: {
        width: 70,
        height: 70,
        backgroundColor: "transparent"
    },

    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    }
})

