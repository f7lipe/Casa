import { useState, useEffect } from "react"
import { Image } from "expo-image"

interface Props {
    accessoryName: string
    size: number
    isOn: boolean
}

export default function AccessoryImage({ accessoryName, size, isOn }: Props) {
    const [accessoryImage, setAccessoryImage] = useState<{
        [key: string]: any
    }>({})

    const IMAGES = {
        BULB_OFF: require("../assets/images/bulb-off.png"),
        BULB_ON: require("../assets/images/bulb-on.png"),
        TV_OFF: require("../assets/images/tv-off.png"),
        TV_ON: require("../assets/images/tv-on.png"),
        GATE_OPEN: require("../assets/images/gate-open.png"),
        GATE_CLOSED: require("../assets/images/gate-closed.png"),
        AC_ON: require("../assets/images/ac-on.png"),
        AC_OFF: require("../assets/images/ac-off.png")
    }

    useEffect(() => {
        const images = {
            bulb: isOn ? IMAGES.BULB_ON : IMAGES.BULB_OFF,
            tv: isOn ? IMAGES.TV_ON : IMAGES.TV_OFF,
            gate: isOn ? IMAGES.GATE_OPEN : IMAGES.GATE_CLOSED,
            ac: isOn ? IMAGES.AC_ON : IMAGES.AC_OFF
        }
        setAccessoryImage(images)
    }, [isOn])

    return (
        <Image 
            style={{ width: size, height: size }} 
            source={accessoryImage[accessoryName]} />
    )
}