import { TextInput, View, StyleSheet } from 'react-native'

interface Props {
    placeholder: string
    value: string
    onChangeText: (text: string) => void
}

function TextField({ placeholder, value, onChangeText }: Props) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

export default TextField;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        padding: 10,
    },
    textInput: {
        height: 60,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },  
})