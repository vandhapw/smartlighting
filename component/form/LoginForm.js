import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  //ScrollView,
  // Button,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  Pressable
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

//import screen
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

function LoginForm({onSubmit}) {
  const navigation = useNavigation();

  const [userId, setId] = useState('');
  const [userPw, setPassword] = useState('');

  function submitHandler() {
    onSubmit({
      userId: userId,
      userPw: userPw,
    });
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'userId':
        setId(enteredValue);
        break;
      case 'userPw':
        setPassword(enteredValue);
        break;
    }
  }

  const onSignInPressed = () => {
    console.warn('Login');
  };

  
  const alertButton = () => {
    Alert.alert('alert')
  };

  const onForgotPasswordPressed = () => {
    // console.log('Dont have any Pass');
    navigation.replace('ForgotPasswordScreen');
  };

  const onDontHaveAccount = () => {
    // console.log('Dont have any account');
    navigation.navigate('RegisterScreen');
  };

  // function check(){
  //     navigation.navigate('RegisterScreen');
  // }

  return (
    <View style={styles.root}>
      <CustomInput
        //   placeholder="input your ID"
        value={userId}
        updateValue={updateInputValueHandler.bind(this, 'userId')}
        label="Input your ID"
      />
      <CustomInput
        //   placeholder="input your password"
        value={userPw}
        securityTextEntry
        updateValue={updateInputValueHandler.bind(this, 'userPw')}
        label="Input your password"
      />
      {/* <Pressable onPress={() => onSignInPressed()}
        style={styles.buttonLogin}
      >
        <Text style={{fontWeight: 'bold',color: 'white'}}>Login</Text>
      </Pressable> */}
      {/* <Pressable onPress={submitHandler}
        style={styles.buttonLogin}
      >
        <Text style={{fontWeight: 'bold',color: 'white'}}>Login2</Text>
       </Pressable> */}
       {/* <View style={[{width:'95%'}]}> */}
       <Button 
       onPress={submitHandler}
       mode="contained"
       icon="login"
       width='95%'
       style={{borderRadius: 5, backgroundColor: '#513252', color: '#ffffff', alignItems: 'center',padding:5}}
       >        
         <Text style={{color:'#ffffff', width:'100%'}}>Login</Text>
       </Button>
      
      {/* </View> */}
  {/* <CustomButton text="Login" onPress={submitHandler} /> */}
      {/* <CustomButton
        onPress={() => navigation.navigate('ForgotPasswcordScreen')}
        text="Forgot Password"
        type="TERTIARY"
      /> */}

      {/* <CustomButton
          text="Don't have an account? Please create one"
          onPress={() => onDontHaveAccount()}
          type="TERTIARY"
        /> */}

      {/* <Pressable onPress={() => check()}>
                        <Text>Check Button</Text>
                    </Pressable> */}
    </View>
  );
}
export default LoginForm;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    color: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
    marginTop: -50,
  },

  buttonLogin: {
    width: '95%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#513252',
    position: 'relative',
    top:0,
    left:0,
    // elevation:3,
    // zIndex:3
    
  },
});
