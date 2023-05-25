import { StyleSheet } from "react-native"
import { View } from "./Themed"
import ClickWheelIcon from "../assets/icons/click-wheel.svg"


interface Props {
    onLeftPress: () => void
    onRightPress: () => void
    onUpPress: () => void
    onDownPress: () => void
    onCenterPress: () => void
    onClockWiseWheelTurn: () => void
    onCounterClockWiseWheelTurn: () => void
    icons?: {
        left?: JSX.Element
        right?: JSX.Element
        up?: JSX.Element
        down?: JSX.Element
        center?: JSX.Element
    }
}

export const ClickWheel = ({
    onLeftPress,
    onRightPress,
    onUpPress,
    onDownPress,
    onCenterPress,
    onClockWiseWheelTurn,
    onCounterClockWiseWheelTurn,
    icons,
}: Props) => {
    return (
        <View style={styles.clickWheel}>
            <ClickWheelIcon />
        </View>

    )
}

const styles = StyleSheet.create({
    clickWheel: {
        width: 200,
        height: 200,
        backgroundColor: "transparent",
    },
})