/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  Pressable,
  Switch,
} from 'react-native';

import CustomButton from '../../component/form/CustomButton';
import {Card, Button, TextInput} from 'react-native-paper';
import LoadingOverlay from '../../component/LoadingOverlay';

import { getSensorValue, sendDataMobile, readMainData, fetchMainData } from '../../util/getPost';

function Control() {
  const [timerDisplay, setTimerDisplay] = useState("00:00:00");
  const [selfTime, setSelfTime] = useState("");
  const [isEnabled, setIsEnabled] = useState(isEnabled);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    // console.log(isEnabled, " toggle");
    if(isEnabled){
      pressSwithOff(0,0,0);
      setTextSwitch("OFF");
      setStyleSwitch("#1A0000");
      setTimerDisplay("00:00:00")
    }else {
      pressSwithOff(1,1,1);
      setTextSwitch("ON");
      setStyleSwitch("#03C988");
      setTimerDisplay("00:00:00")
    }
  }
  const [latestData, setLatestData] = useState([{}])
  const [isLoading, setLoading] = useState(false)
  const [smallText, setSmallText] = useState(false)
  const [readHumidity, setHumidity] = useState("");
  const [readTemperature, setTemperature] = useState("");
  const [readDust, setDust] = useState("");
  const [SwitchData, setSwitchData] = useState([{}]);
  const [styleSwitch,setStyleSwitch] = useState(styleSwitch);
  const [textSwitch, setTextSwitch] = useState(textSwitch);
  const [dustValue, setDustValue] = useState()

  const styles = getStyles(styleSwitch);


  
  let newData = []
  let minutes="";
  let seconds="";
  let timeSetup="";
  let onOffData=[]
  let temp = []

  const getSensor = async () => {
    await getSensorValue()
    .then((response) => {
        newData = response.filter(function(el, index){
          return index >= response.length - 1;
        })
        // console.log("Control ", newData)
        setLoading(true)
        setLatestData(newData)
        // setDustValue(newData[0].dustDensity.toFixed(2))
      })
      .catch(err => console.log(err));
  } 

  const fetchMainData = async () =>{
    await readMainData()
    .then((res) => {
      onOffData = res.filter(function(el, index){
        return index >= res.length - 1;
      })
      // onOffData = res;
      setSwitchData(onOffData)
      // console.log(onOffData[0].dust)
      if(onOffData.length > 0){        
        if(onOffData[0].dust == 0){
          setTextSwitch("OFF")
          setStyleSwitch("#1A0000")
          setIsEnabled(false)
          // console.log('on OFF')
     
        }else {
          setTextSwitch("ON")
          setStyleSwitch("#03C988")
          setIsEnabled(true)
          // console.log('on OFF')
        }
      }
      // console.log('on off status ', onOffData)
      // console.log('Text baru', styleSwitch);
     
     })
    .catch(err => console.log(err)) 
  }


  // const makingOnOff = ({onoffstatus}) => {
    
  //   useEffect(() => {
  //     const intrv = setInterval(() => {
  //     readMainData()
  //     .then((res) => {
  //       onOffData = res.filter(function(el, index){
  //         return index >= res.length - 1;
  //       })
  //       // console.log(onOffData[0].dust)
  //       if(onOffData.length > 0){
  //         if(onOffData[0].dust == 0){
  //           setTextSwitch("Switch ON")
  //           setStyleSwitch("backgroundColor:'green'")
  //           // console.log('on OFF')
       
  //         }else {
  //           setTextSwitch("Switch OFF")
  //           setStyleSwitch("backgroundColor:'yellow'")
  //           // console.log('on OFF')
  //         }
  //       }
  //       console.log("Text ", textSwitch);
       
  //      })
  //     .catch(err => console.log(err)) 
  //     }, 1000);
  //     return () => {
  //       clearInterval(intrv);
  //     };
  //   }, [onoffstatus])
   
  // }

  useEffect(() => {    
    const intrv = setInterval(() => {
      fetchMainData()
      getSensor()
    }, 2000);
    return () => clearInterval(intrv);
  },[])

  useEffect(() => {
    // read main data function
    // sendDataMobile();
    const ref = setInterval(() => {
    // getSensor()

    //other function
    // readData();
 }, 60000);
 return  () => clearInterval(ref); 
  },[])

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
      if(distance < 0 && textSwitch == "OFF"){
        clearInterval(x);
        setSmallText(true)
        setIsEnabled(false)
        setTextSwitch("OFF")
        setStyleSwitch("#1A0000")
        pressSwithOff(1,1,1);
        // console.log(timerDisplay)
      }else if(distance < 0 && textSwitch == "ON") {
        clearInterval(x);
        setSmallText(true)
        setIsEnabled(true)
        setTextSwitch("OFF")
        setStyleSwitch("#1A0000")
        pressSwithOff(0,0,0);
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

  // console.log("Text ", textSwitch);

  function pressSwithOff(humidity, temperatur, dust){
    sendDataMobile(humidity, temperatur,dust)
    .then((response) => {      
      // console.log("sendData Mobile ", response)
    })
    .catch(err => console.log(err))
    // console.log('asd');
  }

  function reset(){
    timerCounter(0);
    setTimerDisplay("00:00:00");    
  }

  // function 

  

    // console.log('tes')
  // }

  if(isLoading){ 
 return (
    <ScrollView style={{backgroundColor: '#ffffff'}}>
      <View>
        <Text style={styles.whiteColor}>Controls Device</Text>
      </View>

      <View style={styles.viewPage}>
        <View style={styles.viewHumidity}>
          <Card style={{backgroundColor: '#582525'}}>
            {/* <Card.Title /> */}
            <Card.Content>
            <Text style={styles.scoreHum}>{latestData[0].humidity}</Text>
            <Text style={{paddingBottom: 10, justifyContent: 'center', textAlign: 'center', color:'#ffffff'}}>Humidity</Text>
            <Pressable style={styles.buttonSwitch}>
             <Text style={{color: '#ffffff', fontWeight:'bold'}}>{textSwitch}</Text> 
            </Pressable>
            
            </Card.Content>
            {/* <Card.Actions>
                <Button>Switch Off</Button>
            </Card.Actions> */}
          </Card>          
        </View>

        <View style={styles.viewTemperature}>
            <Card style={{backgroundColor: '#582525'}}>
                <Card.Content>
                <Text style={styles.scoreTemp}>{latestData[0].temperature}</Text>
          <Text style={{paddingBottom: 10, justifyContent: 'center', textAlign: 'center', color:'#ffffff'}}>Temperature</Text>
          <Pressable style={styles.buttonSwitch}>
            <Text style={{color: '#ffffff',fontWeight:'bold'}}>{textSwitch}</Text>
          </Pressable>
                </Card.Content>
            </Card>          
        </View>

        <View style={styles.viewDust}>
            <Card style={{backgroundColor: '#582525'}}>
                <Card.Content>
                <Text style={styles.scoreDust}>{latestData[0].dustDensity}</Text>
          <Text style={{paddingBottom: 10,  justifyContent: 'center', textAlign: 'center', color:'#ffffff'}}>Dust Density</Text>
          <Pressable style={[styles.buttonSwitch]}>
            <Text style={{color: '#ffffff',fontWeight:'bold'}}>{textSwitch}</Text>
          </Pressable>
                </Card.Content>
            </Card>         
        </View>
      </View>
      <View style={styles.viewSwitchButton}>
      <Text style={{fontSize: 8, fontWeight: 'bold'}}>{textSwitch == "OFF" ? "Switch On Device Sensor" : "Switch Off Device Sensor"}</Text>      
            <Switch 
              trackColor={{false: '#820000', true:'#473C33'}}
              thumbColor={isEnabled ? '#820000' : '#EEEEEE'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
      </View>

      <View style={styles.setupTime}>
      <Text style={{color:'#582525', textAlign:'center', fontSize: 24, textDecorationLine:'underline', fontWeight:'bold'}}>Setup Time</Text>
                <View style={styles.setupView1}>
                <View style={styles.timeSetup}>
                  <Pressable onPress={() => timerCounter(15)} style={styles.pressableButton}>  
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text>15 Min</Text>
                        </Card.Content>
                    </Card>
                    </Pressable>
                </View>
                <View style={styles.timeSetup}>
                    <Pressable onPress={() => timerCounter(30)} style={styles.pressableButton}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text>30 Min</Text>
                        </Card.Content>
                    </Card>
                    </Pressable>
                </View>
                <View style={styles.timeSetup}>
                    <Pressable onPress={() => timerCounter(45)} style={styles.pressableButton}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text>45 Min</Text>
                        </Card.Content>
                    </Card>
                    </Pressable>
                </View>
                <View style={styles.timeSetup}>
                    <Pressable onPress={() => timerCounter(60)} style={styles.pressableButton}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text>1 Hour</Text>
                        </Card.Content>
                    </Card>
                    </Pressable>
                </View>
                </View>
                <View style={styles.setupView2}>
                <View style={styles.timeSetup}>
                    <Pressable onPress={() => timerCounter(120)} style={styles.pressableButton}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text>2 Hour</Text>
                        </Card.Content>
                    </Card>
                    </Pressable>
                </View>
                <View style={styles.timeSetup}>
                    <Pressable onPress={() => timerCounter(180)} style={styles.pressableButton}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text>3 Hour</Text>
                        </Card.Content>
                    </Card>
                    </Pressable>
                </View>
                <View style={[styles.selfTimeSetup]}>
                <Card style={[styles.card, {paddingTop:0, width: '60%'}]}>
                    <TextInput label={"in Minute"} placeholder={"Ex. 120"} style={{backgroundColor: 'transparent'}} 
                      value={selfTime}
                      onChangeText={selfTime => parseInt(setSelfTime(selfTime))}
                    />
                </Card>
                <View style={{paddingStart: 5}}>
                  <Pressable onPress={() => timerCounter(selfTime)} style={styles.pressableButton}>
                  <Card style={[styles.card, {paddingTop:0, width: '100%', paddingRight: 15, paddingStart: 5, backgroundColor: '#520000', marginTop: 10 }]}>
                    <Text style={{margin: 5, color: '#ffffff'}}>Submit</Text>
                  </Card>
                  </Pressable>
                </View>
                <View style={{paddingTop: 30, marginStart: -75}}>
                  <Pressable onPress={() => reset()} style={styles.pressableButton}>
                  <Card style={[styles.card, {paddingTop:0, width: '100%',paddingRight: 25, paddingStart: 5, backgroundColor: '#3C6255', marginTop: 10 }]}>
                    <Text style={{margin:5,color: '#ffffff'}}>Reset</Text>
                  </Card>
                  </Pressable>
                
                </View>
                </View>
               
                {/* <View style={styles.timeSetup}>
                    <Card>
                        <Card.Content>
                            <Text>4 Hour</Text>
                        </Card.Content>
                    </Card>
                </View>
                <View style={styles.timeSetup}>
                    <Card>
                        <Card.Content>
                            <Text>8 Hour</Text>
                        </Card.Content>
                    </Card>
                </View> */}
                </View>

             

                <View style={styles.timeCounting}>
                <Text style={[styles.textWhite,{paddingBottom: 25}]}>Time Countdown</Text>
                {smallText ? <Text style={[styles.textWhite,{fontSize: 20}]}>{timerDisplay}</Text> :
                     <Text style={[styles.textWhite,{fontSize: 60}]}>{timerDisplay}</Text> }
                {textSwitch == "OFF" ? 
                <Text style={[styles.textWhite,{fontSize: 20}]}>The Device has turned of successfully</Text> : <Text></Text>}     
                </View>

      </View>
    </ScrollView>
  );
} else {
  return (
    <LoadingOverlay message={"Reading Data...."} />
  )
  
}
}


const getStyles = (styleSwitch) =>StyleSheet.create({
  whiteColor: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    backgroundColor: '#582525',
    paddingTop: 15
  },

  viewPage: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 25,
  },

  viewHumidity: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreHum: {
    textAlign: 'center',
    color: '#ffffff',
    padding: 25,
    fontSize: 20
  },

  viewTemperature: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreTemp: {
    color: '#ffffff',
    padding: 25,
    textAlign: 'center',
    fontSize: 20
  },

  viewDust: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreDust: {
    color: '#ffffff',
    padding: 25,
    textAlign: 'center',
    fontSize: 20,
  },

  buttonSwitch: {
    width: '100%',
    padding: 10,
    backgroundColor: styleSwitch,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top:0,
    left:0
  },

  setupTime: {
    paddingTop: 30,
  },

  setupView1:{
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },

  setupView2:{
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },

  timeSetup: {
    width: '25%',
    paddingRight: 10,
    paddingTop: -10
  },

  setupSwitch: {
    width: '25%',
  },

  timeCounting: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#582525',
    paddingBottom: '21%',
  },

  selfTimeSetup: {
    width: '50%',
    fontSize: 8,
    flex: 1,
    flexDirection: 'row'
  },

  card:{
    backgroundColor: '#EFECE2'
  },

  textWhite:{
    color: '#ffffff',
    textAlign: 'center'
  },

  viewSwitchButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform:[{scale: 2.5}],
    paddingTop: 10,
    flexDirection: 'row'
  },

  pressableButton:{
    position: 'relative',
    top:0,
    left:0
  }

  

});

export default Control;

