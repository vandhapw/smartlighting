import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Text,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import PushNotification from 'react-native-push-notification';
import { initializeApp } from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

import { useIsFocused } from '@react-navigation/native';
import { AuthProcess } from '../../../util/AuthenticationProcess';
import Header from './Header';
import RoomList from './RoomList';
import EnergyConsumption from './EnergyConsumption';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [styleSwitch, setStyleSwitch] = useState();
  const [location, setLocation] = useState(null);
  const [device, setDevice] = useState(Platform.OS);
  const [menu, setMenu] = useState('bulb');
  const [timer, setTimer] = useState(0);

  const isFocused = useIsFocused(true);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse');
        getLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    const getLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          AsyncStorage.setItem('@location', `(${latitude}, ${longitude})`)
        },
        error => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    const requestNotificationPermission = async () => {
      try {
        const permissionStatus = await messaging().requestPermission();
        console.log('Permission status:', permissionStatus);
      } catch (error) {
        console.error('Permission denied', error);
      }
    };

    // const setupMessaging = async () => {
    //   try {
    //     const permissionStatus = await messaging().requestPermission();
    //     console.log('Permission status:', permissionStatus);

    //     if (permissionStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    //       const token = await messaging().getToken();
    //       console.log('Token:', token);
    //     } else {
    //       console.log('Permission denied');
    //     }
    //   } catch (error) {
    //     console.error('Error setting up messaging:', error.message);
    //   }
    // };

    requestNotificationPermission();
    requestLocationPermission();
    // setupMessaging();

    // Handle incoming notifications when the app is in the foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Handle the received notification when the app is in the foreground
      // console.log('Notification received in the foreground:', remoteMessage);
    });

    // messaging().onNotification(notification => {
    //     console.log('Notification received!', notification)
    // });

    // messaging().onNotificationOpened(notificationOpen => {
    //     console.log('Notification Opened!' , notificationOpen);
    // });

    return () => {
      unsubscribe();
    };
  }, [isFocused]);

 // Function to handle foreground messages
messaging().onMessage(async remoteMessage => {
  try {
    // console.log('Foreground Message Received:', remoteMessage);
    if (Platform.OS === 'android') {
      const notification = remoteMessage.notification;
      if (notification) {
        const { title, body } = notification;
        if (title && body) {
          PushNotification.localNotification({
            channelId: 'default',
            title,
            message: body,
            smallIcon: 'ic_launcher',
          });
        }
      }
    }
  } catch (error) {
    console.error('Error handling foreground message:', error);
  }
});

// Function to handle background messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
  try {
    // console.log('Background Message Received:', remoteMessage);
    // Add your background handling logic here
  } catch (error) {
    console.error('Error handling background message:', error);
  }
});

// Initialize Firebase Messaging
messaging().registerDeviceForRemoteMessages();

// Request permission and get the FCM token
const setupMessaging = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      // getFCMToken();
    } else {
      console.log('FCM authorization declined.');
    }
  } catch (error) {
    console.error('Error setting up messaging:', error);
  }
};

   // Function to send a test notification
   const sendNotification = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Token:', token);

      const message = {
        notification: {
          title: 'Test Notification',
          body: 'This is a test notification from your app!',
        },
        token: token,
      };

      await messaging().sendMessage(message);
      console.log('Test notification sent successfully.');
      // Display a local notification using react-native-push-notification
      setupMessaging();
    } catch (error) {
      console.error('Error sending test notification:', error.message);
    }
  };
  

  const deviceData = { location, device, menu, timer };
  console.log('Home Screen ',deviceData);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <EnergyConsumption navigation={navigation} />
      <RoomList data={deviceData} navigation={navigation} />
      {/* <View>
        <TouchableOpacity onPress={() => sendNotification()}>
          <Text>Send Notification</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
});

export default HomeScreen;
