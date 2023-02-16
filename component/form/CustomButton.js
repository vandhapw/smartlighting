import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo'

const CustomButton = ({onPress, text, type="PRIMARY", bgColor, fgColor, icon}) => {
    return (
        <Pressable 
        onPress={onPress} 
        style={
            [styles.container, 
            styles[`container_${type}`],
            bgColor ? {backgroundColor: bgColor}: {},
            ]}
        >
            {/* <TouchableOpacity> */}
            
            <Text 
            style={
                [styles.text, 
                styles[`text_${type}`],
                fgColor ? {color:fgColor} : {},
                ]}>
                <Entypo name={icon} /> {text}                
            </Text>
            {/* </TouchableOpacity> */}
            
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {

        width: '100%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5

    },

    container_PRIMARY: {
        backgroundColor: '#513252',
    },
    container_SECONDARY: {
        // borderColor: '#3B71F3',
        borderWidth: 2,
    },

    container_TERTIARY: {},
    text: {
        fontWeight: 'bold',
        color: 'white'
    },
    text_TERTIARY: {
        color: 'gray'
    },
    text_SECONDARY: {
        color: '#3B71F3',
    }
});

export default CustomButton;