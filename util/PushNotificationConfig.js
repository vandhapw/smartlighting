import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";


const PushNotificationConfig = () => {
    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      }

      const getFCMToken = async () => {
          let fcmToken = await AsyncStorage.getItem(token)
          if (!fcmToken) {            
            try {
            const fcmToken = await messaging().getToken();
            if(fcmToken){
                console.log(fcmToken, "The new generated token")
                await AsyncStorage.setItem('fcm token', fcmToken)
            }
            }catch( error){
                console.log(error, "error raised in fcm TOken", error.message)
                
            }
      };
}
}

export default PushNotificationConfig