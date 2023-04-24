import {
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    FlatList
} from 'react-native'
import { Text, View } from './Themed'
import categories from '../constants/room-category-icons'
import Icon from './Icon'

interface Props {
    setIcon: (icon: string) => void
    isVisible: (condition: boolean) => void
}

function RoomIconSelector({ setIcon, isVisible }: Props) {
    const handlePress = (icon: string) => {
        setIcon(icon)
        isVisible(false)
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            {

                <FlatList
                    data={categories}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => {
                        const { title, icons } = item
                        return (
                            <>
                                <Text style={styles.title}>{title}</Text>
                                <View
                                    style={styles.containerIcons}
                                >
                                    {
                                        icons.map((icon, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={styles.button}
                                                onPress={() => handlePress(icon)}
                                            >
                                                <Icon
                                                    name={icon}
                                                />
                                            </TouchableOpacity>
                                        ))
                                    }

                                </View>
                            </>
                        )
                    }}
                />
            }
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
    containerIcons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
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