import React, { useState, useRef } from 'react'
import {
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Text } from '../components/Themed'
import { useRoom } from '../hooks/useRoom'
import { useRouter } from 'expo-router'
import TextField from "../components/TextField"
import { RoomIconSelector } from '../layouts/Room'
import Icon from '../components/Icon'
import { IconName } from '../../@types/icon'
import uuid from 'react-native-uuid'

export default function RoomCreator() {
    const [name, setName] = useState('')
    const [icon, setIcon] = useState('Add')
    const [isSelectingIcon, setIsSelectingIcon] = useState(false)
    const { setRoom } = useRoom()
    const buttonRef = useRef(null)

    const router = useRouter()

    const addRoom = (id: string | number[], name: string, icon: string) => {
        const room: Room = {
            id,
            name,
            icon,
        }
        setRoom(room)
    }

    const handleAddRoom = () => {
        const roomId = uuid.v4()
        if (name.length > 0) {
            addRoom(roomId,name, icon)
            router.back()
            router.push(`/room/${roomId}`)
        }
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior="padding">
            <TouchableOpacity
                onPress={() => setIsSelectingIcon(true)}
                ref={buttonRef}
                style={styles.picker}
            >
                <Icon name={icon as IconName} size={70} />
            </TouchableOpacity>

            {isSelectingIcon ? (
                <RoomIconSelector 
                    setIcon={setIcon} 
                    isVisible={setIsSelectingIcon} />
            ) : (
                <>
                    <TextField
                        placeholder="Nome do cômodo"
                        value={name}
                        onChangeText={setName}
                    />

                    <TouchableOpacity
                        disabled={name.length === 0}
                        onPress={handleAddRoom}
                        style={[styles.button, name.length === 0 && styles.disabledButton]}
                    >
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>

                </>

            )}
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
    disabledButton: {
        opacity: 0.4,
    },
    button: {
        width: '95%',
        height: 50,
        backgroundColor: '#ffd94e',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 24,
        marginTop: 24,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#232323',
    },
    picker: {
        width: 150,
        height: 150,
        borderRadius: 200,
        backgroundColor: '#c7c7c765',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    }
})
