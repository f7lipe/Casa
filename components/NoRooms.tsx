import { StyleSheet } from 'react-native'
import { View, Text } from './Themed'
import Icon from './Icon'
import RotatedSquare from './RotatedSquare'

const icons = {
    bulb: "Bulb",
    garage: "GarageDoor",
    laundry: "Laundry",
    bath: "Bath",
    add: "Add",
}

export default function NoRooms() {
    return (
        <View style={styles.container}>
            <View style={styles.icons}>
                {
                    Object.entries(icons).map(([key, value]) => (
                        <RotatedSquare
                            key={key}
                            children={<Icon name={value} size={32} />}
                        />
                    ))
                }
            </View>
            <View>
                <Text style={styles.title}>Este é o app Casa</Text>
                <Text style={styles.subtitle}>Você pode adicionar cômodos e controlar os acessórios da sua casa como se fose seu controle remoto.</Text>
                <Text style={styles.info}>Para começar, toque no botão abaixo</Text>
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
    info:{
        fontSize: 18,

        marginTop: 20,
    },
    icons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24,
    },
})