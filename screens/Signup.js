import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import  Toast  from 'react-native-toast-message';
import { createUser } from '../util/ExecuteAuthentication';
import { useNavigation } from '@react-navigation/native';

function Signup() {

    const navigation = useNavigation()

    const [formData, setFormData] = useState({
        email: '',
        username:'',
        password: '',
        passwordConfirmation: '',
        clientId: '',
        clientSecret: '',
        appId: '',
        deviceId: '',
        deviceName: '',
        registrationLabel:'existingDevice',
        registrationType:''
    });

    const handleChange = (field, value) => {
        setFormData(prevState => ({ ...prevState, [field]: value }));
    };

    const handleSubmit = () => {
        // handle registration logic here
        if(formData.registrationLabel == 'existingDevice'){
            formData.registrationType = 1
            formData.email = formData.email
            formData.username = formData.username,
            formData.password = formData.password,
            formData.passwordConfirmation = formData.passwordConfirmation
            if(formData.password !== formData.passwordConfirmation){
                Toast.show({
                    type:'error',
                    position:'bottom',
                    text1: 'Error!',
                    text2: "Password is not matched",
                    visibilityTime: 2000
                  })
                  return;
            }
            formData.clientId = null,
            formData.clientSecret = null,
            formData.appId = null,
            formData.deviceId = null,
            formData.deviceName = null
        }else {
            formData.registrationType = 0
            formData.registrationType = 1
            formData.email = formData.email
            formData.username = formData.username,
            formData.password = formData.password,
            formData.passwordConfirmation = formData.passwordConfirmation
            if(formData.password !== formData.passwordConfirmation){
                Toast.show({
                    type:'error',
                    position:'bottom',
                    text1: 'Error!',
                    text2: "Password is not matched",
                    visibilityTime: 2000
                  })
                  return;
            }
            formData.clientId = formData.clientId,
            formData.clientSecret = formData.clientSecret,
            formData.appId = formData.appId,
            formData.deviceId = formData.deviceId,
            formData.deviceName = formData.deviceName
        }

        createUser(formData)
        .then(response => {
            Toast.show({
                type:'success',
                position:'bottom',
                text1: 'Success!',
                text2: response.message,
                visibilityTime: 2000
              })
        })
        .catch(error => {
            Toast.show({
                type:'error',
                position:'bottom',
                text1: 'Error!',
                text2: error,
                visibilityTime: 2000
              })
        })
    };

    return (
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.header}>Register</Text>

              {/* Dropdown List */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>Registration Type:</Text>
                <Picker
                    selectedValue={formData.registrationLabel}
                    onValueChange={value => handleChange('registrationLabel', value)}
                    style={styles.dropdownPicker}
                >
                    <Picker.Item label="Register with existing device" value="existingDevice" />
                    <Picker.Item label="Register with new device" value="newDevice" />
                </Picker>
            </View>

            {formData.registrationLabel === 'newDevice' && (
                <>
            <TextInput 
                style={styles.input}
                placeholder="Email"
                onChangeText={value => handleChange('email', value)}
                value={formData.email}
            />

            <TextInput 
                style={styles.input}
                placeholder="Username"
                onChangeText={value => handleChange('username', value)}
                value={formData.username}
            />

            <TextInput 
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={value => handleChange('password', value)}
                value={formData.password}
            />

            <TextInput 
                style={styles.input}
                placeholder="Password Confirmation"
                secureTextEntry
                onChangeText={value => handleChange('passwordConfirmation', value)}
                value={formData.passwordConfirmation}
            />

            <TextInput 
                style={styles.input}
                placeholder="Client ID"
                onChangeText={value => handleChange('clientId', value)}
                value={formData.clientId}
            />

            <TextInput 
                style={styles.input}
                placeholder="Client Secret"
                onChangeText={value => handleChange('clientSecret', value)}
                value={formData.clientSecret}
            />

            <TextInput 
                style={styles.input}
                placeholder="App ID"
                onChangeText={value => handleChange('appId', value)}
                value={formData.appId}
            />

            <TextInput 
                style={styles.input}
                placeholder="Device ID"
                onChangeText={value => handleChange('deviceId', value)}
                value={formData.deviceId}
            />

            <TextInput 
                style={styles.input}
                placeholder="Device Name"
                onChangeText={value => handleChange('deviceName', value)}
                value={formData.deviceName}
            />
            </>
            )}

            {formData.registrationLabel === 'existingDevice' && (
            <>
            <TextInput 
                style={styles.input}
                placeholder="Email"
                onChangeText={value => handleChange('email', value)}
                value={formData.email}
            />

            <TextInput 
                style={styles.input}
                placeholder="Username"
                onChangeText={value => handleChange('username', value)}
                value={formData.username}
            />

            <TextInput 
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={value => handleChange('password', value)}
                value={formData.password}
            />

            <TextInput 
                style={styles.input}
                placeholder="Password Confirmation"
                secureTextEntry
                onChangeText={value => handleChange('passwordConfirmation', value)}
                value={formData.passwordConfirmation}
            />
              </>  
            )}

            
        

            <Button title="Register" onPress={handleSubmit} />
            <Button style={{paddingTop:10}} title="Login" onPress={() => navigation.navigate('Login')} />
            </ScrollView>
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f7f7f7',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 18,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    }
});

export default Signup;
