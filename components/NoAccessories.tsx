import { StyleSheet } from 'react-native'
import { View, Text } from './Themed'
import Icon from './Icon'

interface Props {
    roomName: string
}

export default function NoAccessories({roomName}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.icons}>
                <Icon name={roomName} size={172} color='gray'/>
            </View>
            <View>
                <Text style={styles.title}>Cômodo vazio</Text>
                <Text style={styles.subtitle}>Aqui você poderá adicionar e controlar os acessórios deste cômodo.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
    },
    subtitle: {
        fontSize: 18,
    },
    info: {
        fontSize: 18,

        marginTop: 20,
    },
    icons: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24,
    },
})