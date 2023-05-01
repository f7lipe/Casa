import { StyleSheet } from "react-native"
import { Text, View } from "./Themed"
import Svg, { RadialGradient, Stop, Circle } from 'react-native-svg';


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
            <Svg height="100%" width="100%">
                <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <Stop offset="0" stopColor="#3c3c3c" stopOpacity="1" />
                    <Stop offset="1" stopColor="#161616" stopOpacity="1" />
                </RadialGradient>
                <Circle cx="50%" cy="50%" r="50%" fill="url(#grad)" />
            </Svg>
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