import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert, ToastAndroid } from "react-native"

import LoadingOverlay from "../component/LoadingOverlay";
import ModalLoading from "../component/ModalLoading";
import Authentication from "../component/authentication/Authentication";
import {AuthLogin} from "../util/ExecuteAuthentication"


import {AuthProcess} from "../util/AuthenticationProcess";
import { useNavigation } from "@react-navigation/native";

import Toast from 'react-native-toast-message'


function Login (){

    const navigation = useNavigation();

    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [token, setToken] = useState();
    const [toastMessage, setToastMessage] = useState();

    const authCtx = useContext(AuthProcess);

    const statusAlert = (value) => {
          if(value == 1){
            Toast.show({
              type:'success',
              position:'bottom',
              text1: 'Success!',
              text2: "Login Successfully",
              visibilityTime: 2000
            })
          }else {
            Toast.show({
              type:'error',
              position:'bottom',
              text1: 'Error!',
              text2: "Login Failed",
              visibilityTime: 2000
            })
          }
    }

    async function signInHandler({ userId, userPw}) {
      // console.log(userId, userPw, "token")
        setIsAuthenticating(true);
        try{
            const token = await AuthLogin(userId, userPw);
            setToken(token)
            setIsAuthenticating(false);
            if(Object.keys(token).length > 0){
              if(token.message === 'success!'){
                statusAlert(1)
              } else {
                statusAlert(0)
              }            
            }
            else {
              statusAlert(0)
            }
            authCtx.authenticate(token)
          }
        catch(error){
          ToastAndroid.show("Error to connect API", ToastAndroid.SHORT)
        setIsAuthenticating(false);
        }
      }
      
      return (
        isAuthenticating ? (
          <LoadingOverlay message="Sign in ..." />
          // <ModalLoading message="Sign in" />
        ) : (
          <>
          <Authentication onAuthenticate={signInHandler} />
        
          <Toast />
        </>      
        )
         
      )
}


export default Login;

const styles = StyleSheet.create({
  
})

