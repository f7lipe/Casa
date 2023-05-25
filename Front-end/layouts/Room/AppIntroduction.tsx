import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from '../../components/Themed'
import { IconName } from '../../@types/icon'
import Icon from '../../components/Icon'
import RotatedSquare from '../../components/RotatedSquare'

const icons = {
    bulb: "Bulb",
    garage: "Doorway",
    laundry: "Outlet",
    bath: "Ac",
    add: "Add",
}

export default function AppIntroduction() {
    return (
        <View 
            style={styles.container}>
            <View 
                style={styles.icons}>
                {
                    Object.entries(icons).map(([key, value]) => (
                        <RotatedSquare
                            key={key}
                            children={<Icon name={value as IconName} size={32} />}
                        />
                    ))
                }
            </View>
            <View>
                <Text style={styles.title}>Bem-vindo ao App Casa</Text>
                <Text style={styles.subtitle}>Com este aplicativo, você pode adicionar cômodos e controlar os acessórios da sua casa como se fosse um controle remoto inteligente.</Text>
                <Text style={styles.info}>Toque no botão abaixo para começar.</Text>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24,
    },
})