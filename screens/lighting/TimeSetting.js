import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ToastAndroid,
} from 'react-native';

import {images, icons, COLORS, FONTS, SIZES} from '../../constants';
import {Card, Button, TextInput} from 'react-native-paper';
import LoadingOverlay from '../../component/LoadingOverlay';
import { getSensorValue, getSwitchValue, sendDataMobile } from '../../util/getPost';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import BottomSheet from 'react-native-gesture-bottom-sheet';


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

const TimeSetting = ({navigation}) => {
  const [modalLighting, setModalLighting] = useState(false);
  const [modalTime, setModalTime] = useState(false);
  const [modalControl, setModalControl] = useState();
 
  const [latestData, setLatestData] = useState([{}]);
  const [isLoading, setLoading] = useState(true);
  const [smallText, setSmallText] = useState(false);
  const [SwitchData, setSwitchData] = useState([{}]);
  const [styleSwitch, setStyleSwitch] = useState(styleSwitch);
  const [textSwitch, setTextSwitch] = useState();
  const [dustValue, setDustValue] = useState();
  const [aqiValue, setAqiValue] = useState();
  const isFocused = useIsFocused(true);
  const [lightingValue, setLightingValue] = useState();
  const [lampLevel, setLampLevel] = useState(lampLevel);
  const [textLevel, setTextLevel] = useState(textLevel);
  const [selfTime, setSelfTime] = useState("");
  const [timerDisplay, setTimerDisplay] = useState("00:00:00");
  const [onoffstatus, setOnOffStatus] = useState();
  

  const bottomSheet = useRef();

  let newData = [];
  
  

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

    return (
      <View>
    
        {/* // bottom Sheet */}
        <BottomSheet hasDraggableIcon ref={bottomSheet} height={400}>
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
            <Text style={[styles.panelTitle, {marginBottom: 100, color:'#000000'}]}>Timer Setting</Text>
            <View style={{width: '75%', paddingStart: 10, marginTop:-70}}>
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
                  {textSwitch > 0 || textSwitch == null ? 
                     <Pressable style={styles.pressableButton} onPress={() => pressSwithOff(0,0,0,lightingValue) }>
                     <Card style={[styles.card, {paddingTop:0, width: '100%', paddingRight: 15, paddingStart: 5, backgroundColor: '#8D091B', marginTop: 10, justifyContent:'center' }]}>
                       <Text style={{margin: 5, color: '#ffffff', textAlign:'center'}}>Turn OFF Device</Text>
                     </Card>
                     </Pressable> 
                    :
                    <Pressable style={styles.pressableButton} onPress={() => pressSwithOff(1,1,1, lightingValue)}>
                    <Card style={[styles.card, {paddingTop:0, width: '100%', paddingRight: 15, paddingStart: 5, backgroundColor: '#8D091B', marginTop: 10, justifyContent:'center' }]}>
                      <Text style={{margin: 5, color: '#ffffff', textAlign:'center'}}>Turn ON Device</Text>
                    </Card>
                    </Pressable> 
                  }
                 
                  <View style={styles.timeCounting}>
                  <Text style={[styles.textWhite,{fontSize: 16, textAlign:'center', color:'#000000'}]}>{timerDisplay}</Text> 
                {/* }      */}
                </View> 
            </View>
          </View>
        </BottomSheet>

        
      </View>
    );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
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
    width: '80%',
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

  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelHeader: {
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  pressableButton:{
    position: 'relative',
    top:0,
    left:0
  },
  timeCounting: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#ffffff',
    // paddingBottom: '10%',
    borderRadius:10,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  selfTimeSetup: {
    width: '50%',
    fontSize: 8,
    flex: 1,
    // flexDirection: 'row'
  },
});

export default TimeSetting;
