import { useState } from "react"
import { Text, View } from "../../../components/Themed"
import { StyleSheet, TouchableOpacity } from "react-native"
import { BifunctionalButton } from "../../../components/BifunctionalButton"
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

export const AcControl = ({ roomId, accessoryId }: Props) => {

    const { getAccessory, updateAccessory } = useRoom()
    const accessory = getAccessory(roomId, accessoryId)

    const [volume, setVolume] = useState<number>(23)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const isOn = accessory?.isOn
    const { toggleAccessoryState } = useBLE()

    const toggleAccessory = async() => {
        const updatedAccessory = {
            ...accessory,
            isOn: !accessory?.isOn,
        } as Accessory
        updateAccessory(roomId, updatedAccessory)
        await toggleAccessoryState(accessory?.port || 0 , accessory?.isOn ? 0 : 1)
    }

    const toggleVolumeUp = () => {
        if (volume < 30) {
            setVolume(volume + 1)
        }
    }

    const toggleVolumeDown = () => {
        if (volume > 5) {
            setVolume(volume-1)
        }
    }

    const toggleMute = () => {
        setVolume(volume === 0 ? 32 : 0)
    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }


    const toggleMenu = () => { }

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

            <Text style={styles.title}>{`${volume} ºC`}</Text>

            <View style={styles.topControls}>
                <View style={styles.verticalControls}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleMute}>
                        <Icon
                            name={'Timer'}
                            size={32}
                            color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.powerButton}
                        onPress={toggleAccessory}>
                        <Icon
                            name={isOn ? 'PowerOn' : 'PowerOff'}
                            size={72}
                            color="red" />
                    </TouchableOpacity>
                </View>

                <View
                    style={styles.directionalControls}>

                    <BifunctionalButton
                        title="ºC"
                        icons={VOLUME_ICONS}
                        onUpPress={toggleVolumeUp}
                        onDownPress={toggleVolumeDown}
                    />

                </View>

                <View
                    style={styles.verticalControls}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleMenu}>
                        <Icon name="Fan" size={32} color="white"/>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.button}
                        onPress={togglePlay}>
                        <Icon
                            name="SnowFlake"
                            size={32}
                            color="green" />
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",

        backgroundColor: "transparent",
    },
    topControls: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "transparent",
    },
    verticalControls: {
        flexDirection: "column",
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
        width: 60,
        height: 60,
    },
    powerButton:{
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: 70,
        height: 70,
    }, 
    title: {
        fontSize: 80,
        marginBottom: 0,
        color: "black",
        textAlign: "center"
    },
})
