
import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
    ToastAndroid,
    Platform,
    DeviceEventEmitter
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

import { images, icons, COLORS, FONTS, SIZES } from '../../constants';

import { Entypo } from 'react-native-vector-icons/Entypo';
import {BarChart } from 'react-native-chart-kit';
import {Card, Button, TextInput} from 'react-native-paper';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getSwitchValue, sendDataMobile, postSwitchDevice } from '../../util/getPost';
import { useCsrfToken } from '@shopify/react-csrf';
import AuthenticationProcess, {AuthProcess} from '../../util/AuthenticationProcess';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import { storingLighting } from '../../util/getPost';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions';
import { startLightSensor, stopLightSensor } from 'react-native-ambient-light-sensor';
import Svg, {Path,Defs, Rect, Stop, RadialGradient, Circle } from 'react-native-svg'



const IconLabel = ({ icon, label }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image
                source={icon}
                resizeMode="cover"
                style={{
                    width: 50,
                    height: 75,
                }}
            />
            <Text style={{ marginTop: SIZES.padding, color: COLORS.gray, ...FONTS.h3 }}>{label}</Text>
        </View>
    )
}

const LightingStatus = ({ props }) => {

  const [lampLevel, setLampLevel] = useState();
  const [textLevel, setTextLevel] = useState();
  const [isLevel, setLevel] = useState();
  const [isLoading, setLoading] = useState(true);
  const [humidity, setHumidity] = useState();
  const [temperature, setTemperature] = useState();
  const [dust, setDust] = useState();
  const [styleSwitch, setStyleSwitch] = useState();
  const styles = getStyles(styleSwitch);
  const [inputLevel, setInputLevel] = useState();
  const isFocused = useIsFocused(true);
  const [isPushed, setIsPushed] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState()
  const [latitude, SetLatitude] = useState()
  const [longitude, SetLongitude] = useState()
  const [result, setResult] = useState();



  const fetchDeviceInfo = async () => {
    const res = await getUniqueId()
    setDeviceInfo(res)
  };

  const requestLocationPermission = async() => {
    try {
      let permission;
      if(Platform.OS === 'ios'){
        permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      }else {
        permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      }
      const result = await request(permission);
      if (result === 'granted'){
        // console.log('Location Permission Granted');
      }
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    if(props != undefined){
       currentState(props)
    }else {
        // currentState()
    }
    fetchDeviceInfo()
    Geolocation.getCurrentPosition(
      position => {
        SetLatitude(position.coords.latitude)
        SetLongitude(position.coords.longitude)
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    requestLocationPermission()

    startLightSensor();
    // currentState()
      
    const subscription = DeviceEventEmitter.addListener(
      'LightSensor',
      (data) => {
        setResult(data.lightValue);
      },
    );

    return () => {
      stopLightSensor();
      subscription?.remove();
    };
    // fetchCurrentData()
  },[props])

   
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('tes')
      randomStore()
    }, 1000*60);
    return () => {
      clearInterval(intervalId)
    }; 
  }, []);


  


  async function randomStore(){
    let device_id = deviceInfo
    let timestamps = Date.now()
    let currentdate = new Date(); 
    let datetime = currentdate.getDate('yyyy') + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    let lightingValue = [{level:0,lux:0},
      {level:1,lux:Math.floor(Math.random() * (50 - 1)+1)},
      {level:2,lux:Math.floor(Math.random() * (100 - 51)+51)},
      {level:3,lux:Math.floor(Math.random() * (150 - 101)+101)},
      {level:4,lux:Math.floor(Math.random() * (250 - 151)+151)},
      {level:5,lux:Math.floor(Math.random() * (500 - 251)+251)},
      {level:6,lux:Math.floor(Math.random() * (750 - 501)+501)},
      {level:7,lux:Math.floor(Math.random() * (1000 - 751)+751)},
      {level:8,lux:Math.floor(Math.random() * (1500 - 1001)+1001)},
      {level:9,lux:Math.floor(Math.random() * (5000 - 1501)+1501)}    
    ]
    let room = null
    let numberPeople = null
    let saveCategory = [1,2]
    let ambientLight = result
    let coordinate = {latitude:latitude,longitude:longitude}
    let lightingPicked = lightingValue[Math.floor(Math.random() * lightingValue.length)]
    let categoryPicked = saveCategory[Math.floor(Math.random() * saveCategory.length)]
    let type = 1
    let expenseData = {type,device_id,coordinate, timestamps, datetime, lightingPicked, categoryPicked, room, numberPeople, ambientLight}
    if(device_id != undefined){
      // console.log(expenseData)
      const save = await storingLighting(expenseData)
      ToastAndroid.show(save, ToastAndroid.SHORT)
    }else {
      // console.log('data is not ready')
      ToastAndroid.show('data is not ready', ToastAndroid.SHORT)
    }
    

  }
  

  async function storeLighting(data){
    // requestLocationPermission()
    let device_id = deviceInfo
    let timestamps = Date.now()
    let currentdate = new Date(); 
    let datetime = currentdate.getDate('yyyy') + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    let lValue="0"   
    let lightingLevel = data.level
    switch(lightingLevel){
      case "0":
        lValue =  0
        break;
      case "1":
        lValue = Math.floor(Math.random() * (50 - 1)+1)
          break; 
      case "2":
        lValue = Math.floor(Math.random() * (100 - 51)+51)
          break; 
      case "3":
        lValue = Math.floor(Math.random() * (150 - 101)+101)
          break; 
      case "4":
        lValue = Math.floor(Math.random() * (250 - 151)+151)
          break; 
      case "5":
        lValue = Math.floor(Math.random() * (500 - 251)+251)
          break; 
      case "6":
        lValue = Math.floor(Math.random() * (750 - 501)+501)
          break; 
      case "7":
        lValue = Math.floor(Math.random() * (1000 - 751)+751)
          break; 
      case "8":
        lValue = Math.floor(Math.random() * (1500 - 1001)+1001)
          break; 
      case "9":
        lValue = Math.floor(Math.random() * (5000 - 1501)+1501)
          break;  
      default:
        // lightingLevel = "0"
        lValue =  0
    }
    let lightingPicked = {level:data.level, lux:lValue}
    let room = null
    let numberPeople = null
    let saveCategory = [1,2]
    let coordinate = {latitude:latitude,longitude:longitude}
    let categoryPicked = saveCategory[Math.floor(Math.random() * saveCategory.length)]
    let type = 2
    let ambientLight = result
    
    let expenseData = {ambientLight,type,device_id,coordinate, timestamps, datetime, lightingPicked, categoryPicked, room, numberPeople}
    // console.log(expenseData)
    // const save = await storingLighting(expenseData)
    if(device_id != undefined){
      // console.log(expenseData)
      console.log("Type 2")
      const save = await storingLighting(expenseData)
      ToastAndroid.show(save, ToastAndroid.SHORT)
    }else {
      // console.log('data is not ready')
      ToastAndroid.show('data is not ready', ToastAndroid.SHORT)
      
    }
    // console.log(save)
    // console.log(expenseData)
    // yyyy-MM-dd HH:mm:ss.SSS
  }



  const currentState = (level) => {
    let value = 0
    switch (level){
    case 0:
        setLampLevel(icons.lampOff);
        setTextLevel("0 lux");
        setLevel(`Level 0`);
        value = {level:'0', lux:'0'}
        break;
    case 1:
        setLampLevel(icons.lamp10);
        setTextLevel("20-50 lux");
        setLevel(`Level 1`);
        value = {level:'1', lux:'20-50'}
        break;
      case 2:
          setLampLevel(icons.lamp10);
          setTextLevel("50-100 lux");
          setLevel(`Level 2`);
          value = {level:'2', lux:'50-100'}
          break;
      case 3:
        setLampLevel(icons.lamp40)
        setTextLevel("100-150 lux")
        setLevel(`Level 3`)
        value = {level:'3', lux:'100-150'}
        break;
      case 4:
        setLampLevel(icons.lamp40)
        setTextLevel("150-250 lux")
        setLevel(`Level 4`)
        value = {level:'4', lux:'150-250'}
        break;
      case 5:
        setLampLevel(icons.lamp40)
        setTextLevel("250-500 lux")
        setLevel(`Level 5`)
        value = {level:'5', lux:'250-500'}
        break;
    case 6:
        setLampLevel(icons.lamp75)
        setTextLevel("500-750 lux")
        setLevel(`Level 6`)
        value = {level:'6', lux:'500-750'}
        break;
        case 7:
        setLampLevel(icons.lamp75)
        setTextLevel("750-1000 lux")
        setLevel(`Level 7`)
        value = {level:'7', lux:'750-1000'}
        break;
        case 8:
        setLampLevel(icons.lamp100)
        setTextLevel("1000-1500 lux")
        setLevel(`Level 8`)
        value = {level:'8', lux:'1000-1500'}
        break;
        case 9:
        setLampLevel(icons.lamp100)
        setTextLevel("1500-5000 lux")
        setLevel(`Level 9`)
        value = {level:'9', lux:'1500-5000'}
        break;
      default:
        setLampLevel(icons.lampOff)
        setTextLevel("0")
        setLevel(`Level 0`)
    }
    
    storeLighting(value)
    // randomStore()
  }

  const GlassBulb = () => {
    return (
      <>
        <Defs>
          <RadialGradient id="grad" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <Stop offset="100%" stopColor="#d3d3d3" stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Path
          d="M12 2C8.13 2 5 5.13 5 9c0 3.17 2.44 5.78 5.5 6.67V17c0 .55.45 1 1 1s1-.45 1-1v-1.33c3.06-.89 5.5-3.5 5.5-6.67 0-3.87-3.13-7-7-7z"
          fill="url(#grad)"
          stroke="#000000"
          strokeWidth="0.2"
        />
      </>
    );
  };
  


    return (
        <View style={{ flex: 1 }}>
        {/* <Image
            source={images.skiVillaBanner}
            resizeMode="cover"
            style={{
                width: '100%',
                height: '80%',
            }}
        /> */}
        <Text style={{ ...FONTS.h2, textAlign:'center', paddingTop:5, color:'#000000' }}>Lighting Control</Text>
        
        <View
            style={[{
                position: 'absolute',
                bottom: "30%",
                left: "5%",
                right: "5%",
                borderRadius: 15,
                padding: 2,
                // alignItems:'center',
                backgroundColor: COLORS.white,
            }, styles.shadow]}
        >
            <View style={{ flexDirection: 'row' }}>
            <Svg height="200" width="200" viewBox="0 0 24 24">
      <GlassBulb />
    </Svg>
                <View style={[styles.shadow, COLORS.primary, {marginTop:30, marginStart:30}]}>
                <IconLabel icon={lampLevel}/>
                </View>

                <View style={{ marginHorizontal: SIZES.radius, justifyContent: 'space-around' }}>
                    <Text style={{ ...FONTS.h2, marginStart:25, color:'#000000' }}>{textLevel}</Text>
                </View>
                <View style={{ marginHorizontal: SIZES.radius,marginStart:5, justifyContent: 'space-around' }}>
                    <Text style={{ ...FONTS.h2, color:'green', fontWeight:'bold' }}>{isLevel}</Text>
                </View>
            </View>
            <View style={{position:'absolute', marginTop:110, marginStart:10}}>
              <Text style={{...FONTS.h4,color:'green', fontWeight:'bold'}}>Lighting Level</Text>
            </View>
        </View>
      </View>

    );
};

const getStyles = (styleSwitch)  => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    centeredView: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      marginTop: '50%',
      backgroundColor: '#ffffff',
      borderRadius: 20,
      padding: 35,
      width:'80%',
      alignItems: 'center',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
});

export default LightingStatus;
