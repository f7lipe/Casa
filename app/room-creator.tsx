import { useState } from 'react'
import { StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Text, View } from '../components/Themed'
import TextField from "../components/TextField"
import RoomIconSelector from "../components/RoomIconSelector"
import Add from '../assets/images/add.svg'
import Bath from '../assets/images/bath.svg'
import Bed from '../assets/images/bed.svg'
import Garage from '../assets/images/garage.svg'
import Kitchen from '../assets/images/kitchen.svg'
import LivingRoom from '../assets/images/living-room.svg'
import Office from '../assets/images/office.svg'
import Other from '../assets/images/other.svg'
import { useRoom } from '../hooks/useRoom'
import { Link } from 'expo-router'

const ICON_SIZE = 70

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

export type Icon = keyof typeof icons

function RoomCreator() {
    const [name, setName] = useState<string>('')
    const [icon, setIcon] = useState<Icon>('add')
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const { setRoom } = useRoom()

    const addRoom = (name: string, icon: string) => { 
        const room = {
            id: Math.random().toString(36).substring(2, 9),
            name,
            icon,
        } as Room
        setRoom(room)
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.picker}
            >

              {
                icon && icons[icon] 
              }

            </TouchableOpacity>

            {
                isModalVisible ? (
                    <RoomIconSelector
                        setIcon={setIcon}
                        isVisible={setModalVisible} />
                ) : (
                    <>
                        <TextField
                            placeholder="Nome do cômodo"
                            value={name}
                            onChangeText={setName}
                        />
                    <Link href="/" asChild>
                    <TouchableOpacity
                            disabled={name.length === 0}
                            onPress={() => addRoom(name, icon)}
                            style={styles.addButton}
                        >
                            <Text style={styles.buttonText}>Adicionar</Text>
                        </TouchableOpacity>
                    </Link>
                    </>
                )
            }


        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    centerText: {
        textAlign: 'left',
    },
    addButton: {
        backgroundColor: '#000000',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: '#fff',
    },
    picker: {
        width: 150,
        height: 150,
        borderRadius: 50,
        backgroundColor: '#c7c7c765',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    }
})

export default RoomCreator