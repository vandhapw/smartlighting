import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView,DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
// import HumidityChart from '../screens/sidebar/HumidityChart';
import Control from '../screens/sidebar/Control';
import LightingScreen from '../screens/lighting/LightingScreen';
// import BulbRoom from '../screens/lighting/BulbRoom';
import BulbRoom from '../screens/lighting/lightBulb/BulbRoom';
// import ContextState like session
import AuthenticationProcess, {AuthProcess} from '../util/AuthenticationProcess';

import HomeScreen from '../screens/lighting/home/HomeScreen';
import TimeSetting from '../screens/lighting/timesetting/TimeSetting';
import LightUsage from '../screens/lighting/usage/LightUsage';
import HistoryUser from '../screens/lighting/history/HistoryUser';
import  Icon  from 'react-native-vector-icons/FontAwesome';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function DefineNavigator() {
  return (
      <Stack.Navigator>
          <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                  tabBarIcon: () => (
                      <Entypo
                          name="login"
                          size={30}
                          color
                      />
                  ),
                  // headerTitle: () => (
                  //     ""
                  // ),
                  headerShown: false
              }}
          />
      </Stack.Navigator>
  )
}

function RoomNavigator() {
  return (
      <Stack.Navigator>
          <Stack.Screen
              name="BulbRoom"
              component={BulbRoom}
              options={{
                  tabBarIcon: () => (
                      <Entypo
                          name="signup"
                          size={30}
                          color
                      />
                  ),
                  // headerTitle: () => (
                  //     ""
                  // ),
                  headerShown: false
              }}
          />
      </Stack.Navigator>
  )
}

function BottomTabs({navigation}){
  return (
    <Tabs.Navigator>
      <Tabs.Screen name='Home Screen' component={HomeScreen} 
        options={{headerShown:false,
        tabBarIcon:({}) => (
          <Icon name='home' size={25} />
        )
      }} />
      <Tabs.Screen name='Time Setting' component={TimeSetting} 
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();

            navigation.navigate('Time Setting', {briLight:0, satLight:0,hueLight:0, initialState:{0:0}, timer:0, tempId:0, device:'',location:0})
          }
        })}
        options={{headerShown:false,
        tabBarIcon:({}) => (
            <Icon name='clock-o' size={25}/>
        )  
      }} />
      <Tabs.Screen name='Usage' component={LightUsage} 
      options={{headerShown:false,
        tabBarIcon:({}) => (
          <Icon name='bar-chart'size={25} />
        )
      }} />
      <Tabs.Screen name='History' component={HistoryUser} 
      options={{headerShown:false,
        tabBarIcon:({}) => (
          <Icon name='history' size={25}/>
        )
      }} />
    </Tabs.Navigator>
  )
  
  
}

  //testing
function AuthStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={DefineNavigator} // Use DefineNavigator here
        options={{ headerShown: false }} // Optional: Hide header
      />
     <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                  tabBarIcon: () => (
                      <Entypo
                          name="signup"
                          size={30}
                          color
                      />
                  ),
                  // headerTitle: () => (
                  //     ""
                  // ),
                  headerShown: false
              }}
          />
      {/* Add more authentication-related screens here */}
    </Stack.Navigator>
  );
}

function AppDrawerContent(props){
  const authCtx = useContext(AuthProcess)
  const username = authCtx && authCtx.token && authCtx.token.username ? authCtx.token.username : "no name"; 

  return (
     <DrawerContentScrollView {...props} contentContainerStyle={{flex:1}}>
       {/*all of the drawer items*/}
       <View style={{marginTop:20, marginStart: 10, marginBottom: 10}}>
          <Text style={{fontSize:14, fontWeight:'bold'}}>Hello welcome, {username}!</Text>       
        </View>
       <DrawerItemList {...props}  style={{borderWidth:1}}/>
       <View style={{flex:1,marginTop:200, }}>
          
         {/* here's where you put your logout drawer item*/}
         <DrawerItem 
           label="Log out"
           onPress={()=>{
           
  // console.log('tes')
  Alert.alert(
    "Logout",
   "Are you sure? You want to logout?",
    [
     {
       text: "Cancel",
      onPress: () => {
        },
     },
      {
       text: "Confirm",
       onPress: () => {
        authCtx.logout()
        },
     },
   ],
   { cancelable: false }
  );
            //  AsyncStorage.clear();
            //  props.navigation.replace("loginScreen");
           }}
           style={{flex:1,justifyContent:'flex-end'}}
         />
       </View>

     
     </DrawerContentScrollView>
   );
 }


function AuthenticatedStack(){

  const authCtx = React.useContext(AuthProcess)
 
  return (
  <Drawer.Navigator drawerContent={props=><AppDrawerContent {...props} />} >
    <Drawer.Screen name="Home" component={BottomTabs}
    options={{
      headerTitle:() => (
        ""
      ),
      headerStyle: {
        backgroundColor:'#FFFFFF'
      },
      headerShown: false
    }}
    />

    {/* <Drawer.Screen name="Home" component={HomeScreen}
        options={{
          headerTitle: () => (
              ""
          ),
          headerStyle: {
          backgroundColor: '#ffffff'
        },
          headerShown: false
      }}
    /> */}
    
    <Drawer.Screen name="Time Setting" component={TimeSetting}
    options={{
      headerTitle: () => (
        ""
    ),
    headerStyle: {
    backgroundColor: '#ffffff'
  },
      headerShown: true
  }}
    />
    <Drawer.Screen name="Light Usage" component={LightUsage}
    options={{
      headerTitle: () => (
        ""
    ),
    headerStyle: {
    backgroundColor: '#ffffff'
  },
      headerShown: false
  }}
    />
     <Drawer.Screen name="Lighting App Lists" component={RoomNavigator}
    options={{
      headerTitle: () => (
        ""
    ),
    headerStyle: {
    backgroundColor: '#ffffff'
  },
      headerShown: false
  }}
    />
    <Drawer.Screen name="History usage" component={HistoryUser}
    options={{
      headerTitle: () => (
        ""
    ),
    headerStyle: {
    backgroundColor: '#ffffff'
  },
      headerShown: false
  }}
    />
    {/* <Drawer.Screen name="Logout" component={LogoutFunction} /> */}
</Drawer.Navigator>
  )
}

function AlatNavigasi(){
  const authCtx = React.useContext(AuthProcess)
    return (
      <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  )
}

function AppNavigator(){

  return (
             <AuthenticationProcess>
                <AlatNavigasi />
             </AuthenticationProcess>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default AppNavigator;
