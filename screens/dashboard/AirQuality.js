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

const AirQuality = ({navigation}) => {
  const [modalLighting, setModalLighting] = useState(false);
  const [modalTime, setModalTime] = useState(false);
  const [modalControl, setModalControl] = useState();
  const [chartData, setChartData] = useState({
    labels: ['x1', 'x2', 'x3', 'x4', 'x5'],
    datasets: [
      {
        data: [12, 45, 67, 89, 12],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    // legend: ["Moisture Values"]
  });

  const [latestData, setLatestData] = useState([{}]);
  const [isLoading, setLoading] = useState(true);
  const [smallText, setSmallText] = useState(false);
  const [readHumidity, setHumidity] = useState();
  const [readTemperature, setTemperature] = useState();
  const [readDust, setDust] = useState();
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
  
  const getSensor = async () => {
    await getSensorValue()
      .then(response => {
        newData = response.filter(function (el, index) {
          return index >= response.length - 1;
        });
        // console.log("Control ", newData)
        setLatestData(newData);
        if(newData.length > 0){
          let hum = newData[0].humidity;
          let temper = newData[0].temperature;
          let dust = newData[0].dustDensity;
          dust = parseInt(dust);
          // console.log(typeof dust);
          // if(newData[0].dustDensity > 50){
          //   console.log("50 ")
          // }
          // console.log(hum)
          switch (true){
            case (hum < 40):
              setHumidity("Too Dry");
              // console.log(hum)
              break;
            case (hum > 40 && hum < 60):
              setHumidity("Ideal");
              break;
            case (hum > 65):
              setHumidity("Too Humid");
              break;
            default:
              setHumidity("No Data");
          }
          // temperature
          switch (true){
            case (temper < 18):
              setTemperature("Too Cold");
              break;
            case (temper > 18 && temper < 24):
              setTemperature("Comfortable");
              break;
            case (temper > 24 && temper < 32):
              setTemperature("Acceptable");
              break;
            case (temper > 32 ):
                setTemperature("Too Hot");
                break;  
            default:
              setTemperature("No Data");
          }
    
          // console.log(dust)
          switch (true){
            case (dust <= 30):
              setDust("Good");
              setAqiValue("Good");
              // console.log(dust)
              break;
            case (dust > 30 && dust <= 80):
              setDust("Normal");
              setAqiValue("Normal");
              // console.log(dust)
              break;
            case (dust > 80 && dust <= 150):
              setDust("Bad");
              setAqiValue("Bad");
              break;
            case (dust > 150):
              setDust("Warning");
              setAqiValue("Warning");
              // console.log(dust)
              break;
            default:
              setDust("No Data");
              setAqiValue("No Data");
          }
    
    
             
          // if(latestData[0].humidity)
        }
        // fetchCurrentData();
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  const fetchCurrentData = async() => {
    await getSwitchValue()
    .then((res) => {
      if(res[0].temperature > 0){
        setTextSwitch(1)
      }else {
        setTextSwitch(0)
      }
      setLightingValue(res[0].lighting)
      switch (res[0].lighting){
        case 1:
          setLampLevel(icons.lamp100);
          setTextLevel("Lighter");
          break;
        case 2:
            setLampLevel(icons.lamp75);
            setTextLevel("Light");
            break;
        case 3:
          setLampLevel(icons.lamp40)
          setTextLevel("Soft")
          break;
        case 4:
          setLampLevel(icons.lamp10)
          setTextLevel("Softer")
          break;
        case 5:
          setLampLevel(icons.lampOff)
          setTextLevel("OFF")
          break;
        default:
          setLampLevel(icons.lampOff)
          setTextLevel("OFF")
      }
      // console.log("ligthing ", res[0].lighting)
    })
}

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
      if(distance < 0 && textSwitch > 0){
        clearInterval(x);
        pressSwithOff(0,0,0, lightingValue);
        setTextSwitch(0)
        setTimerDisplay("00:00:00")
        // console.log(timerDisplay)
      }else if(distance < 0 && textSwitch < 1) {
        clearInterval(x);
        pressSwithOff(1,1,1, lightingValue);
        setTimerDisplay("00:00:00")
        setTextSwitch(1)
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

  //  const pressSwithOff = async(humidity, temperatur, dust, lighting) => {
    async function pressSwithOff(humidity, temperatur, dust, lighting){
    // console.log("onpRess ", humidity, temperatur, dust, lighting)
    await sendDataMobile(humidity, temperatur,dust, lighting)
    .then((response) => {    
      if(humidity == 0){
        setTextSwitch(0)
      }else {
        setTextSwitch(1)
      } 
      ToastAndroid.show("Changing Device Successfully", ToastAndroid.SHORT)
    })
    .catch(err => console.log(err))
    // console.log('asd');
  }

  function reset(){
    timerCounter(0);
    setTimerDisplay("00:00:00");    
  }

  useEffect(() => {
    fetchCurrentData();
    getSensor();
  //   let z = 0
  // const intrv = setInterval(() => {
  //   // fetchMainData();
  //   fetchCurrentData();
  //   console.log("value ", lightingValue)
  //   z = z+1
  //   console.log(z)
  //   // getSensor();
  //   // console.log("text Switch ", textSwitch)
  //   // onChangeLampLevel();
  //   if(z >= 10){
  //   clearInterval(intrv)  
  // }
  // }, 1000);
  // console.log("nilai z ", z)
  // if(z >= 10){
  //   clearInterval(intrv)  
  // }
  // return () => clearInterval(intrv);
}, [isFocused, lightingValue]);

useEffect(() => {
  switch (lightingValue){
    case 1:
      setLampLevel(icons.lamp100);
      setTextLevel("Lighter");
      break;
    case 2:
        setLampLevel(icons.lamp75);
        setTextLevel("Light");
        break;
    case 3:
      setLampLevel(icons.lamp40)
      setTextLevel("Soft")
      break;
    case 4:
      setLampLevel(icons.lamp10)
      setTextLevel("Softer")
      break;
    case 5:
      setLampLevel(icons.lampOff)
      setTextLevel("OFF")
      break;
    default:
      setLampLevel(icons.lampOff)
      setTextLevel("OFF")
  }
  // console.log("value lighting ", lightingValue)
},[lightingValue])

// useMemo(() => {
//   fetchCurrentData()
//   // console.log(lightingValue)
// }, [isFocused])


  if (isLoading) {
    return <LoadingOverlay message={'Reading Data....'} />;
  } else {
    return (
      <View style={styles.container}>
        {/* Modal */}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalTime}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalTime(!modalTime);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Card style={{width: '80%'}}>
                  <TextInput
                    label={'in Minute'}
                    placeholder={'Ex. 120'}
                    style={{backgroundColor: 'transparent'}}
                    // value={selfTime}
                    // onChangeText={selfTime => parseInt(setSelfTime(selfTime))}
                  />
                </Card>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalTime(!modalTime)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>

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

        {/* Header */}
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h2, textAlign: 'center', paddingTop: 10, color:'#000000'}}>
            Dashboard
          </Text>
          <Text style={{textAlign: 'center', fontSize: 12, fontWeight: 'bold', color: '#000000'}}>
            Last Updated on : {latestData[0].datetime}
          </Text>
          <View
            style={[
              {
                position: 'absolute',
                bottom: '20%',
                left: '5%',
                right: '5%',
                borderRadius: 15,
                padding: 2,
                // alignItems:'center',
                backgroundColor: COLORS.white,
              },
              styles.shadow,
            ]}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  styles.shadow,
                  COLORS.primary,
                  {marginTop: 30, marginStart: 30},
                ]}>
                <IconLabel icon={icons.aqIcon} />
              </View>

              <View
                style={{
                  marginHorizontal: SIZES.radius,
                  justifyContent: 'space-around',
                }}>
                <Text style={{...FONTS.h1, marginStart: 35, color:'#000000'}}>{latestData[0].dustDensity}</Text>
              </View>
              <View
                style={{
                  marginHorizontal: SIZES.radius,
                  marginStart: 20,
                  justifyContent: 'space-around',
                }}>
                <Text style={{...FONTS.h1, color: 'green', fontWeight: 'bold'}}>
                  {aqiValue}
                </Text>
              </View>
            </View>
            <View
              style={{position: 'absolute', marginTop: 90, marginStart: 10}}>
              <Text style={{...FONTS.h4, color: 'green', fontWeight: 'bold'}}>
                Air Quality Data
              </Text>
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={{flex: 1.5, bottom: '5%'}}>
          {/* Icons */}
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: SIZES.padding * 2,
              justifyContent: 'space-between',
            }}>
            <IconLabel icon={icons.humidityIcon} label={latestData[0].humidity} />

            <IconLabel icon={icons.temperatureIcon} label={latestData[0].temperature} />

            <IconLabel icon={icons.dust_icon} label={latestData[0].dustDensity} />
          </View>
          <View
            style={[
              {
                flexDirection: 'row',
                marginTop: SIZES.base,
                paddingHorizontal: SIZES.padding * 2,
                justifyContent: 'space-between',
              },
            ]}>
            <Text style={{color:'#000000'}}>{readHumidity} </Text>
            <Text style={{color:'#000000', marginEnd:30}}>{readTemperature} </Text>
            <Text style={{color:'#000000'}}>{readDust}</Text>
          </View>
          <View
            style={[
              {
                flexDirection: 'row',
                marginTop: SIZES.base,
                paddingHorizontal: SIZES.padding * 2,
                justifyContent: 'space-between',
              },
            ]}>
            <Text style={{color:'#000000'}}>Humidity  </Text>
            <Text style={{color:'#000000'}}> Temperature</Text>
            <Text style={{color:'#000000'}}> Dust Density</Text>
          </View>

          {/* About */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.base,
              paddingHorizontal: SIZES.padding * 2,
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate("Lighting")}>
              <IconLabel icon={lampLevel} label={textLevel} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => bottomSheet.current.show()}>
              <IconLabel icon={icons.timeIcon} label="Time Setting" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.warn("Still in development")}>
            <IconLabel icon={icons.cameraIcon} label="Control" />
            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                flexDirection: 'row',
                marginTop: SIZES.base,
                paddingHorizontal: SIZES.padding * 2,
                justifyContent: 'space-between',
              },
            ]}>
            {/* <Text>Humidity </Text>
                    <Text>Temperature </Text>
                    <Text>Dust Density </Text> */}
          </View>

          {/* About */}
          {/* <View style={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}>
                  <Text style={{ ...FONTS.h2 }}>About</Text>
                  <Text style={{ marginTop: SIZES.radius, color: COLORS.gray, ...FONTS.body3 }}>
                      Located at the Alps with an altitude of 1,702 meters. The ski area is the largest ski area in the world and is known as the best place to ski. Many other facilities, such as fitness center, sauna, steam room to star-rated restaurants.
                  </Text>
              </View> */}
        </View>

        {/* <View style={{marginTop: 570, position: 'absolute'}}>
          <BarChart
            style={{borderRadius: 16, paddingStart: 5, paddingEnd: 5}}
            data={chartData}
            width={380}
            height={150}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#1C315E',
              backgroundGradientFrom: '#227C70',
              backgroundGradientTo: '#88A47C',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#00204A',
              },
            }}
            verticalLabelRotation={30}
          />
        </View> */}
      </View>
    );
  }
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

export default AirQuality;
