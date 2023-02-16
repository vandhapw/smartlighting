import { View, Text, StyleSheet } from "react-native"

import { TextInput } from "react-native-paper";

const CustomInput =({value, keyboardType, placeholder, securityTextEntry, updateValue, label}) => {
    return(
        <View style={styles.container}>
            <TextInput 
            onChangeText={updateValue}
            // onUpdateValue={updateValue}
            placeholder={placeholder}
            // style={styles.input}
            secureTextEntry={securityTextEntry}
            value={value}
            keyboardType={keyboardType}
            // placeholderTextColor="#000" 
            label={label}
            >
                
            </TextInput>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        // borderColor: '#e8e8e8',
        // borderWidth: 1,
        // borderRadius: 5,

        paddingHorizontal: 10,
        paddingVertical: 5,

        marginVertical: 10,
    },
    // input: {
    //     color: 'black'
    // }
});

export default CustomInput;