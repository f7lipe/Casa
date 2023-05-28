import { useState } from "react"
import { Text, View } from "../../../components/Themed"
import { StyleSheet, TouchableOpacity } from "react-native"
import { BifunctionalButton } from "../../../components/BifunctionalButton"
import { ClickWheel } from "../../../components/ClickWheel"
import { useRoom } from "../../../hooks/useRoom"
import {useBLE} from "../../../hooks/useBLE"
import Icon from "../../../components/Icon"

interface Props {
    accessoryId: string | number[]
    roomId: string | number[]
}

const CHANNEL_ICONS = {
    up: <Icon name="ChevronUp" size={32} color="gray" />,
    down: <Icon name="ChevronDown" size={32} color="gray" />
}

const VOLUME_ICONS = {
    up: <Icon name="Add" size={32} color="gray" />,
    down: <Icon name="Minus" size={32} color="gray" />
}

const CLICK_WHEEL_ICONS = {
    left: <Icon name="Dot" size={5} color="gray" />,
    right: <Icon name="Dot" size={5} color="gray" />,
    up: <Icon name="Dot" size={5} color="gray" />,
    down: <Icon name="Dot" size={5} color="gray" />,
}

export const RemoteControl = ({ roomId, accessoryId }: Props) => {

    const { getAccessory, updateAccessory } = useRoom()
    const accessory = getAccessory(roomId, accessoryId)

    const [volume, setVolume] = useState<number>(10)
    const [channel, setChannel] = useState<number>(1)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const isOn = accessory?.isOn
    const { toggleAccessoryState } = useBLE()

    const toggleAccessory = async() => {
        const updatedAccessory = {
            ...accessory,
            isOn: !accessory?.isOn,
        } as Accessory
        updateAccessory(roomId, updatedAccessory)
        await toggleAccessoryState(2, accessory?.isOn ? 0 : 1)
    }

    const toggleVolumeUp = () => {
        if (volume < 15) {
            setVolume(volume + 5)
        }
    }

    const toggleVolumeDown = () => {
        if (volume > 0) {
            setVolume(volume - 5)
        }
    }

    const toggleMute = () => {
        setVolume(volume === 0 ? 32 : 0)
    }

    const toggleChannelUp = () => {
        setChannel(channel + 1)
    }

    const toggleChannelDown = () => {
        if (channel > 0) {
            setChannel(channel - 1)
        }
    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const toggleChanneList = () => {
        console.log("Channel list")
    }

    const toggleMenu = () => { }

    const virtualAssistant = () => { }

    const speakerIcon = () => {
        switch (volume) {
            case 0:
                return "SpeakerMuted"
            case 5:
                return "SpeakerSoundMin"
            case 10:
                return "SpeakerSound"
            case 15:
                return "SpeakerSoundMax"
            default:
                return "SpeakerSound"
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.topControls}>
                <View style={styles.horizontalControls}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleMute}>
                        <Icon
                            name={speakerIcon()}
                            size={32}
                            color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleAccessory}>
                        <Icon
                            name={isOn ? 'PowerOn' : 'PowerOff'}
                            size={72}
                            color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleChanneList}>
                        <Icon
                            name="StarList"
                            size={32}
                            color="white" />
                    </TouchableOpacity>
                </View>

                <View
                    style={styles.directionalControls}>

                    <BifunctionalButton
                        title="Vol"
                        icons={VOLUME_ICONS}
                        onUpPress={toggleVolumeUp}
                        onDownPress={toggleVolumeDown}
                    />
                    <BifunctionalButton
                        title="CH"
                        icons={CHANNEL_ICONS}
                        onUpPress={toggleChannelUp}
                        onDownPress={toggleChannelDown}
                    />
                </View>

                <View
                    style={styles.horizontalControls}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleMenu}>
                        <Text style={{ color: "white" }}>
                            MENU
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={virtualAssistant}>
                        <Icon
                            name="Mic"
                            size={52}
                            color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={togglePlay}>
                        <Icon
                            name="PlayPause"
                            size={32}
                            color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomControls}>
                <ClickWheel
                    icons={CLICK_WHEEL_ICONS}
                    onLeftPress={() => console.log("Left press")}
                    onRightPress={() => console.log("Right press")}
                    onUpPress={() => console.log("Up press")}
                    onDownPress={() => console.log("Down press")}
                    onCenterPress={() => console.log("Center press")}
                    onClockWiseWheelTurn={() => console.log("Clockwise turn")}
                    onCounterClockWiseWheelTurn={() => console.log("Counter clockwise turn")} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        padding: 20,
        backgroundColor: "transparent",
    },
    topControls: {
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "transparent",
    },
    horizontalControls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        marginTop: 20,
        marginBottom: 20,
    },
    directionalControls: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "transparent",
    },
    bottomControls: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111111",
        borderRadius: 50,
        width: 70,
        height: 70,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "black",
    },
})
