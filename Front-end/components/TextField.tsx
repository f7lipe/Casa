import { StyleSheet } from 'react-native'
import { TextInput, View } from './Themed'

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
        backgroundColor: "transparent",
        height: 60,
        padding: 10,
    },
    textInput: {
        height: 60,
        width: '100%',
        borderColor: 'lightgray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },  
})