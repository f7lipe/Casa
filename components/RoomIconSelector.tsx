import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import rooms from '../constants/rooms'
import { WithLocalSvg } from 'react-native-svg'
import { Icon } from '../app/room-creator'
import Add from '../assets/images/add.svg'
import Bath from '../assets/images/bath.svg'
import Bed from '../assets/images/bed.svg'
import Garage from '../assets/images/garage.svg'
import Kitchen from '../assets/images/kitchen.svg'
import LivingRoom from '../assets/images/living-room.svg'
import Office from '../assets/images/office.svg'
import Other from '../assets/images/other.svg'

const ICON_SIZE = 35

const icons = {
    add: <Add width={ICON_SIZE} height={ICON_SIZE}/>,
    bath: <Bath width={ICON_SIZE} height={ICON_SIZE}/>,
    bed: <Bed width={ICON_SIZE} height={ICON_SIZE}/>,
    garage: <Garage width={ICON_SIZE} height={ICON_SIZE}/>,
    kitchen: <Kitchen width={ICON_SIZE} height={ICON_SIZE}/>,
    livingRoom: <LivingRoom width={ICON_SIZE} height={ICON_SIZE}/>,
    office: <Office width={ICON_SIZE} height={ICON_SIZE}/>,
    other: <Other width={ICON_SIZE} height={ICON_SIZE}/>,
}

interface Props {
    setIcon: (icon: Icon) => void
    isVisible: (condition: boolean) => void
}

function RoomIconSelector({ setIcon, isVisible }: Props) {
    const handlePress = (icon: Icon) => {
        setIcon(icon)
        isVisible(false)
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            {
                rooms.map((room, index) => {
                    const { icon } = room 
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handlePress(icon)}
                            style={styles.button}
                        >
                            {
                                icon && icons[icon]
                            }
                        </TouchableOpacity>
                    )
                })}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 10,

        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        width: 50,
        height: 50,
    },
})

export default RoomIconSelector