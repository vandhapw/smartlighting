import { useState } from 'react';
import { Alert, StyleSheet, View, ScrollView, ImageBackground, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';



import LoginForm from '../form/LoginForm';

function Authentication({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    userId: false,
    userPw: false,
  });

  function submitHandler(credentials) {
    let { userId, userPw} = credentials;

    userId = userId.trim();
    userPw = userPw.trim();

    onAuthenticate({ userId, userPw});
  }

  

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#ffffff'}}
      showsVerticalScrollIndicator={false}>
        <ImageBackground
            source={require('../../assets/images/background2.jpg')}
            style={{height:Dimensions.get('window').height / 2.5,}}
        >
           <View style={styles.brandView}>
          <Icon 
              name="login"
              style={{color: '#ffffff', fontSize: 100}}

            />
             <Text style={styles.brandText}>Smart Lighting</Text>
   
        </View>
        </ImageBackground>
       
    <View style={styles.bottomView}>
     
      <View style={{padding: 20}}>
      {/* <Icon 
      name="login"
      style={{fontSize: 100, color:'#4C0033', paddingTop: 30 }}
      /> */}
          <Text style={{color:'#243A73', fontSize: 34, fontWeight: 'bold'}}>Welcome</Text>
          <Text style={{fontSize: 14, color: '42032C'}}>Please Sign In to Continue</Text>
      </View>
    </View>
    <View style={{padding:20}}>
    <LoginForm
        onSubmit={submitHandler}
        // credentialsInvalid={credentialsInvalid}
      /> 
    </View>
    
    
     
    </ScrollView>
  );
}

export default Authentication;

const styles = StyleSheet.create({
  bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    alignItems: 'center'
  },
  brandView: {
   flex: 1,
   justifyContent:'center',
   alignItems: 'center',
  },

  brandText: {
    color: '#ffffff',
    fontSize: 35,
    fontWeight:'bold',
    textTransform :'uppercase',
    
  }
});
