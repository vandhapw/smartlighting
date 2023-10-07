import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// PushNotification.createChannel(
//     {
//       channelId: "default", // (required)
//       channelName: "Default", // (required)
//       channelDescription: "A default channel", // (optional) default: undefined.
//       playSound: true, // (optional) default: true
//       soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
//       importance: 4, // (optional) default: 4. Int value of the Android notification importance
//       vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//     },
//     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
//   );

// // Function to get and store the FCM token
// const getFCMToken = async () => {
//     try {
//       const token = await messaging().getToken();
//       if (token) {
//         console.log('FCM Token:', token);
//         // Here, you can save the token to a global state management solution like Redux, AsyncStorage, or context for later use.
//       } else {
//         console.log('No FCM token available.');
//       }
//     } catch (error) {
//       console.error('Error getting FCM token:', error);
//     }
//   };
  
// // Initialize Firebase Messaging
// messaging().registerDeviceForRemoteMessages();

// // Function to handle foreground messages
// messaging().onMessage(async remoteMessage => {
//   try {
//     console.log('Foreground Message Received:', JSON.stringify(remoteMessage));
//     if (Platform.OS === 'android' && remoteMessage.notification) {
//       const { title, body } = remoteMessage.notification;
//       if (title && body) {
//         PushNotification.localNotification({
//           channelId: 'default',
//           title,
//           message: body,
//           smallIcon: 'ic_launcher',
//         });
//       }
//     }
//   } catch (error) {
//     console.error('Error handling foreground message:', error);
//   }
// });

// // Function to handle background messages
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   try {
//     console.log('Background Message Received:', JSON.stringify(remoteMessage));
//     // Handle the background notification
//   } catch (error) {
//     console.error('Error handling background message:', error);
//   }
// });

// // Request permission and get the FCM token
// const setupMessaging = async () => {
//   try {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//       getFCMToken();
//     } else {
//       console.log('FCM authorization declined.');
//     }
//   } catch (error) {
//     console.error('Error setting up messaging:', error);
//   }
// };


// Register the app component
AppRegistry.registerComponent(appName, () => 
// {
//   setupMessaging();
//   return App;
// }
App
);
