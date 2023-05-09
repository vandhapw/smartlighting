import React, { useState,useRef, useMemo, useCallback } from 'react';
import { useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable, Picker } from 'react-native';
import {BottomSheetModal,BottomSheetModalProvider, BottomSheetScrollView }from '@gorhom/bottom-sheet';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';

// import BottomSheet
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Divider, Card, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import { SelectList } from 'react-native-dropdown-select-list';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import { storingLighting } from '../../util/getPost';

 
function BottomSheetLocation(props) {
   // ref
   const bottomSheetModalRef = useRef(null);
   const bottomSheetModalRefQR = useRef(null);
   const snapPoints = useMemo(() => ["25%", "55%", "55%"], []);
   const [isFocused, setFocused] = useState(true)

   const [qrcode, setQrcode] = useState()

   const navigation = useNavigation()

   const [latestData, setLatestData] = useState([{}]);
   const [isLoading, setLoading] = useState(true);
   const [smallText, setSmallText] = useState(false);
   const [SwitchData, setSwitchData] = useState([{}]);
   const [styleSwitch, setStyleSwitch] = useState(styleSwitch);
   const [textSwitch, setTextSwitch] = useState();
   const [dustValue, setDustValue] = useState();
   const [aqiValue, setAqiValue] = useState();
  //  const isFocused = useIsFocused(true);
   const [lightingValue, setLightingValue] = useState();
   const [lampLevel, setLampLevel] = useState(lampLevel);
   const [textLevel, setTextLevel] = useState(textLevel);
   const [selfTime, setSelfTime] = useState("");
   const [timerDisplay, setTimerDisplay] = useState("00:00:00");
   const [isVisible, setVisible] = useState(false)

   const data = [
    {key:'0', value:'Off', lux:'0'},
    {key:'1', value:'Level 1', lux:'20-50'},
    {key:'2', value:'Level 2', lux:'50-100'},
    {key:'3', value:'Level 3', lux:'100-150'},
    {key:'4', value:'Level 4', lux:'150-250'},
    {key:'5', value:'Level 5', lux:'250-500'},
    {key:'6', value:'Level 6', lux:'500-750'},
    {key:'7', value:'Level 7', lux:'750-1000'},
    {key:'8', value:'Level 8', lux:'1000-1500'},
    {key:'9', value:'Level 9', lux:'1500-5000'},
  ]

   const [selectedOption, setSelected] = React.useState(data[0]);
   const [deviceInfo, setDeviceInfo] = useState()

 
   
  
   useFocusEffect(useCallback(() => {       
    // bottomSheetModalRef.current?.present();
    if(props.value == true){
      bottomSheetModalRef.current?.present();
    }
    fetchDeviceInfo()

    // console.log('props', props.value)
   }, [props, selectedOption]))

   useEffect(() => {
    
   }, [isFocused])

   
  const fetchDeviceInfo = async () => {
    const res = await getUniqueId()
    setDeviceInfo(res)
  };

  const fetchDeviceManufactur = () => {
    getManufacturer()
    .then((res) => {
    //   console.log(res)
    })
  }

  
   async function storeLighting(data){
      let device_id = deviceInfo
      let timestamps = Date.now()
      let currentdate = new Date(); 
      let datetime = currentdate.getDate('yyyy') + "-"
                  + (currentdate.getMonth()+1)  + "-" 
                  + currentdate.getFullYear() + " "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
      let lightingValue = data.lux
      let lightingLevel = data.value
      let room = null
      let numberPeople = null
      let saveCategory = 2
      let coordinate = "(35.123123,129.123123)"
      let expenseData = {device_id,coordinate, timestamps, datetime, lightingValue, lightingLevel, saveCategory, room, numberPeople}
      await storingLighting(expenseData)
      // console.log(save)
      
  
      // console.log(deviceID, timestamps, datetime, lightingValue, lightingLevel, categoryStore)
      // yyyy-MM-dd HH:mm:ss.SSS
   }
  

   const handleSheetChanges = useCallback(() => {
    // console.log('handleSheetChanges');
  }, []);

  const handleSelectItem = (item) => {
    // console.log('item', item)
    setSelected(data[item]);
  };

  function timerCounter(timer){
    // if(textSwitch == "OFF"){
    if(timer > 0){
    timer = Number(timer);
    currentDates = new Date();
    currentDates.setMinutes(currentDates.getMinutes()+timer);

    countDownDate = new Date(currentDates).getTime();
    setSmallText(false)
      

    // update count down every 1 second
    x = setInterval(function() {
      now = new Date().getTime(); // get todays date and time
      distance = countDownDate - now; // find the distance between now and count down date
      // Time calulations for hours, minutes and seconds
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // output the result
      timerDisplays = hours+ "h " + minutes + "m " + seconds + "s ";
      setTimerDisplay(timerDisplays)
      // console.warn(smallText)
      
      // if the count down is over, change with this result
      if(distance < 0 ){
        clearInterval(x);
        setTextSwitch(0)
        setTimerDisplay("00:00:00")
        console.log(timerDisplay)
        console.log(selectedOption)
        storeLighting(selectedOption)
      }
    }, 1000)
    // }else {
    //   console.log('failed');
    // }
    // timer = parseInt(timer / 60, 10);
    
    // console.warn(timer);
   }
   else {
      setTimerDisplay("00:00:00")
      clearInterval(x);
   }
  }


  function reset(){
    timerCounter(0);
    setTimerDisplay("00:00:00");    
  }

  const direction =  async () => {
      // props.value = false
      bottomSheetModalRef.current?.close();
  }

  
const IconLabel = ({icon, label}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={icon}
        resizeMode="cover"
        style={{
          width: 50,
          height: 50,
        }}
      />
      <Text style={{marginTop: SIZES.padding, color: COLORS.gray, ...FONTS.h3}}>
        {label}
      </Text>
    </View>
  );
};

 
  return (
    <BottomSheetModalProvider >
        <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {/* <ScrollView contentContainerStyle={styles.contentContainer}> */}
        {/* <SafeAreaView style={{flex: 1}}> */}
        <Animatable.View
        animation='fadeInUp'
        delay={500}
        easing="ease-in-out"
        duration={400}
        >
       
       <View style={{flex:1, flexDirection:'row', padding:15}}>
       
          <View style={{flex:1, alignItems:'center'}}>
            <Pressable onPress={() => direction()}>
            <Ionicons
                name="navigate"
                size={30}
                color="#212A3E"
            />
            </Pressable>
            <Text style={{fontSize:12, fontWeight:'bold'}}>Close</Text>
          </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 6,
              height: 400,
              alignItems: 'center',
              justifyContent: 'center',
              width:'100%',
              marginTop:0
              // position:'absolute'
            }}>
            <View style={{width: '75%', paddingStart: 10, marginTop:-200}}>
            <View style={styles.timeCounting}>
                  <Text style={[styles.textWhite,{fontSize: 16, textAlign:'center', color:'#000000'}]}>{timerDisplay}</Text> 
                {/* }      */}
                </View> 
           
                <Card style={[{paddingTop:0}]}>
                    <TextInput label={"in Minute"} placeholder={"Ex. 120"} style={{backgroundColor: 'transparent'}} 
                      value={selfTime}
                      onChangeText={selfTime => parseInt(setSelfTime(selfTime))}
                    />
                </Card>
                <Pressable onPress={()=>timerCounter(selfTime)} style={styles.pressableButton}>
                  <Card style={[{paddingTop:0, width: '100%', paddingRight: 15, paddingStart: 5, backgroundColor: '#26ADE4', marginTop: 10, justifyContent:'center' }]}>
                    <Text style={{margin: 5, color: '#ffffff', textAlign:'center'}}>Submit</Text>
                  </Card>
                  </Pressable>
                  <Pressable onPress={() => reset()} style={styles.pressableButton}>
                  <Card style={[styles.card, {paddingTop:0, width: '100%',paddingRight: 25, paddingStart: 5, backgroundColor: '#8D091B', marginTop: 10 }]}>
                    <Text style={{margin:5,color: '#ffffff', textAlign:'center'}}>Reset</Text>
                  </Card>
                  </Pressable>
                  <SelectList 
                       data={data}
                       setSelected={(data) => handleSelectItem(data)} 
                       save={"key"}
                   />
                 
               </View>
          </View>
      

    
       
     </Animatable.View>
     {/* </SafeAreaView> */}
     {/* </ScrollView> */}
        </BottomSheetScrollView>
     </BottomSheetModal>
   </BottomSheetModalProvider>
  );
}

export default BottomSheetLocation;

const styles = StyleSheet.create({
  panelTitle:{
    color:'#000000', fontSize: 26, fontWeight:'bold', marginStart: 10,marginBottom:5
  },
  subTitle:{
  flexDirection: 'row',marginStart: 10
  },
  textSubTitle : {
    color:'gray', fontSize: 12 
  },

  contentContainer: {
    backgroundColor: "white",
    // height:'100%'
    // flex: 1
  },
});

