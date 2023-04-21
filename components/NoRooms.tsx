import { StyleSheet } from 'react-native'
import { View, Text } from './Themed'
import Add from '../assets/images/add.svg'
import Bulb from '../assets/images/bulb.svg'
import Laundry from '../assets/images/laundry.svg'
import Garage from '../assets/images/garage.svg'
import Bath from '../assets/images/bath.svg'
import RotatedSquare from './RotatedSquare'

const icons = {
    bulb: Bulb,
    garage: Garage,
    laundry: Laundry,
    bath: Bath,
    add: Add,
}

export default function NoRooms() {
    return (
        <View style={styles.container}>
            <View style={styles.icons}>
                {
                    Object.entries(icons).map(([key, Icon]) => (
                        <RotatedSquare
                            key={key}
                            children={<Icon width="30px" height="30px" />}
                        />
                    ))
                }
            </View>
            <View>
                <Text style={styles.title}>Este é o app Casa.</Text>
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
        fontWeight: 200,
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