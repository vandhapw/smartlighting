/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

import NavigationMenu from './navigation/AppNavigator';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { Permission, Alert } from 'react-native';
import Toast from 'react-native-toast-message';



const App = () => {

  // Define custom styles for toast notifications
const customToastStyles = {
  // You can customize various style properties here
  success: {
    backgroundColor: 'green',
    width: 300,  // Adjust the width as needed
    // Add other style properties as needed
  },
};

// Set the custom styles for toast notifications
// Toast.setConfig({
//   customStyles: {
//     success: customToastStyles.success,
//     // Define styles for other types (error, info, etc.) if needed
//   },
// });

  useEffect(() => {
    pushNotification();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const title = remoteMessage.notification.title 
      const body = remoteMessage.notification.body 
      Toast.show({
        type:'success',
        position: 'bottom',
        text1: title,
        text2: body,
        visibilityTime: 12000, 
        customStyles: {
          successToast: {
            backgroundColor: 'green',
            width: 300,  // Adjust the width as needed
            // Add other style properties as needed
          },}
      })
      // Alert.alert('A new FCM Message arrived!', JSON.stringify(remoteMessage))
    })

    return unsubscribe;
  },[]);

  async function pushNotification(){
    let fcmToken = await messaging().getToken();
    if(fcmToken){
      console.log('token ', fcmToken)
    }
  }

  return (   
          <NavigationMenu />
     
  );
};



export default App;
