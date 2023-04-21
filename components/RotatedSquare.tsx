import { View, StyleSheet } from 'react-native'

interface Props {
    children: React.ReactNode
}

export default function RotatedSquare({ children }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.children}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '45deg' }],
    },
    children: {
        transform: [{ rotate: '-45deg' }],
    },
})
