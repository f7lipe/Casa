import { StyleSheet } from 'react-native'
import { View, Text } from '../../components/Themed'
import { IconName } from '../../@types/icon'
import Icon from '../../components/Icon'

interface Props {
    roomIcon: string | undefined
}

export default function EmptyRoom({roomIcon}: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.icons}>
                <Icon 
                    name={roomIcon as IconName} 
                    size={172} 
                    color='gray'/>
            </View>
            <View style={styles.info}>
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
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        backgroundColor: 'transparent',
    },
    subtitle: {
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    info: {
        fontSize: 18,
        marginTop: 20,
        backgroundColor: 'transparent',
    },
    icons: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24,
        backgroundColor: 'transparent',
    },
})