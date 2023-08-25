
import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
    ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { images, icons, COLORS, FONTS, SIZES } from '../../constants';

import { Entypo } from 'react-native-vector-icons/Entypo';
import {BarChart } from 'react-native-chart-kit';
import {Card, Button, TextInput} from 'react-native-paper';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getSwitchValue, sendDataMobile, postSwitchDevice, updateLightingData} from '../../util/getPost';
import { useCsrfToken } from '@shopify/react-csrf';
import AuthenticationProcess, {AuthProcess} from '../../util/AuthenticationProcess';
import LightingStatus from './LightingStatus';


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

const LightingButton = ({ navigation }) => {

  const [lampLevel, setLampLevel] = useState();
  const [textLevel, setTextLevel] = useState();
  const [isLevel, setLevel] = useState();
  const [isLoading, setLoading] = useState(true);
  const [styleSwitch, setStyleSwitch] = useState();
  const styles = getStyles(styleSwitch);
  const [inputLevel, setInputLevel] = useState();
  const isFocused = useIsFocused(true);
  const [isPushed, setIsPushed] = useState(false);

  const authCtx = useContext(AuthProcess)

  // const csrfToken = useCsrfToken()

  const currentState = (level) => {
    switch (level){
      case 1:
        setLampLevel(icons.lamp100);
        setTextLevel("100%");
        setLevel(`Level ${inputLevel}`);
        break;
      case 2:
          setLampLevel(icons.lamp75);
          setTextLevel("75%");
          setLevel(`Level ${inputLevel}`);
          break;
      case 3:
        setLampLevel(icons.lamp40)
        setTextLevel("40%")
        setLevel(`Level ${inputLevel}`)
        break;
      case 4:
        setLampLevel(icons.lamp10)
        setTextLevel("10%")
        setLevel(`Level ${inputLevel}`)
        break;
      case 5:
        setLampLevel(icons.lampOff)
        setTextLevel("OFF")
        setLevel(`OFF`)
        break;
      default:
        setLampLevel(icons.lampOff)
        setTextLevel("100%")
        setLevel(`Off`)
    }
  }

  const SwitchPhilipsLight = async (value) => {
    let upcomingData = {on:value}
    await updateLightingData(upcomingData)
    .then(response => {
      console.log('Data updated successfully:', response);
      // Handle the updated data as needed
    })
    .catch(error => {
      console.error('Error updating data:', error);
      // Handle the error as needed
    });

  }


  const fetchCurrentData = async () => {
      await getSwitchValue()
      .then((res) => {    
        // console.log(res)    
        currentState(res[0].lighting);
        switch (res[0].lighting){
          case 1:
            setLampLevel(icons.lamp100);
            setTextLevel("100%");
            setLevel(`Level ${res[0].lighting}`);
            break;
          case 2:
              setLampLevel(icons.lamp75);
              setTextLevel("75%");
              setLevel(`Level ${res[0].lighting}`);
              break;
          case 3:
            setLampLevel(icons.lamp40)
            setTextLevel("40%")
            setLevel(`Level ${res[0].lighting}`)
            break;
          case 4:
            setLampLevel(icons.lamp10)
            setTextLevel("10%")
            setLevel(`Level ${res[0].lighting}`)
            break;
          case 5:
            setLampLevel(icons.lampOff)
            setTextLevel("OFF")
            setLevel(`OFF`)
            break;
          default:
            setLampLevel(icons.lampOff)
            setTextLevel("100%")
            setLevel(`Off`)
        }
        // setLampLevel(res[0].lighting)
        // console.log("value all ",res)
        setLoading(false)
        
      })
  }

  

  async function sendLightingData(level){
    console.log(level)
    // console.log("level ", humidity)
    // let csrfToken = authCtx.token.username
    await postSwitchDevice(1, 1,1, level)
    .then((res) => {
      if(res.message == 'success'){
         ToastAndroid.show("Changing Lighting Level Successfully", ToastAndroid.SHORT)
        //  setLoading(true)
        //  fetchCurrentData()
      }
      // ToastAndroid.show("Changing Lighting Level Successfully", ToastAndroid.SHORT)
      // console.log(res);
    })
    .catch((err) => console.log("Error ", err))
  }



  const onChangeLampLevel = (level) => {
    setInputLevel(level)
    // setIsPushed(true)
    // console.log(level)
   
    // switch (inputLevel){
    //   case 1:
    //     setLampLevel(icons.lamp100);
    //     setTextLevel("100%");
    //     setLevel(`Level ${level}`);
    //     sendLightingData(level);
    //     setStyleSwitch("red");
    //     // fetchCurrentData();
    //     // console.log("level ", humidity)
    //     break;
    //   case 2:
    //       setLampLevel(icons.lamp75);
    //       setTextLevel("75%");
    //       setLevel(`Level ${level}`);
    //       sendLightingData(level);
    //       setStyleSwitch("red");
    //       // fetchCurrentData();
    //       break;
    //   case 3:
    //     setLampLevel(icons.lamp40)
    //     setTextLevel("40%")
    //     setLevel(`Level ${level}`)
    //     sendLightingData(level);
    //     setStyleSwitch("red");
    //     // fetchCurrentData();
    //     break;
    //   case 4:
    //     setLampLevel(icons.lamp10)
    //     setTextLevel("10%")
    //     setLevel(`Level ${level}`)
    //     sendLightingData(level);
    //     setStyleSwitch("color:'red'");
    //     // fetchCurrentData();
    //     break;
    //   case 5:
    //     setLampLevel(icons.lampOff)
    //     setTextLevel("OFF")
    //     setLevel(`OFF`)
    //     sendLightingData(level);
    //     setStyleSwitch("red");
    //     // fetchCurrentData();
    //     break;
    //   default:
    //     setLampLevel(icons.lampOff)
    //     setTextLevel("100%")
    //     setLevel(`Off`)
    //     setStyleSwitch("gray");
    //     // fetchCurrentData();
    // }
  }
 
  useEffect(() => {
    currentState()
    // fetchCurrentData()
  },[inputLevel])

  useEffect(() => {
    if(!isPushed){
      fetchCurrentData()
    }else {
      switch (inputLevel){
        case 1:
          setLampLevel(icons.lamp100);
          setTextLevel("100%");
          setLevel(`Level ${inputLevel}`);
          sendLightingData(inputLevel);
           setStyleSwitch("red");
          break;
        case 2:
            setLampLevel(icons.lamp75);
            setTextLevel("75%");
            setLevel(`Level ${inputLevel}`);
            sendLightingData(inputLevel);
           setStyleSwitch("red");
            break;
        case 3:
          setLampLevel(icons.lamp40)
          setTextLevel("40%")
          setLevel(`Level ${inputLevel}`)
          sendLightingData(inputLevel);
           setStyleSwitch("red");
          break;
        case 4:
          setLampLevel(icons.lamp10)
          setTextLevel("10%")
          setLevel(`Level ${inputLevel}`)
          sendLightingData(inputLevel);
           setStyleSwitch("red");
          break;
        case 5:
          setLampLevel(icons.lampOff)
          setTextLevel("OFF")
          setLevel(`OFF`)
          sendLightingData(inputLevel);
           setStyleSwitch("red");
          break;
        default:
          setLampLevel(icons.lampOff)
          setTextLevel("100%")
          setLevel(`Off`)
      }
    }
    
  
    // return () => currentState(inputLevel);
},[inputLevel])

    return (

        <View style={styles.container}>
            <LightingStatus props={inputLevel}/>

              <View style={{ flex: 1.5, bottom:'5%' }}>
            <Text style={{ ...FONTS.h4, textAlign:'center', paddingBottom:30, color:'#000000' }}>Push one of the button below to change lighting level</Text>
                {/* Icons */}
                <View style={{ flexDirection: 'row',  paddingHorizontal: SIZES.padding * 2, justifyContent: 'space-between' }}>
                <View>
                <TouchableOpacity onPress={() => SwitchPhilipsLight(false)}>
                    <IconLabel
                        icon={icons.lampOff} // level 2
                        label="Off"
                    />                  
                </TouchableOpacity>
                <View>
                <TouchableOpacity onPress={() => onChangeLampLevel(5)} style={[{paddingTop:20},styles.shadow]}>
                    <IconLabel
                        icon={icons.lamp40} // level 2
                        label="Level 5"
                    />
                </TouchableOpacity> 
                </View>
                </View>
                
                <View>
                <TouchableOpacity onPress={() => onChangeLampLevel(1)}>
                    <IconLabel
                        icon={icons.lamp10} // level 2
                        label="Level 1"
                    /> 
                </TouchableOpacity>  
                <View>
                <TouchableOpacity onPress={() => onChangeLampLevel(6)} style={[{paddingTop:20},styles.shadow]}>
                    <IconLabel
                        icon={icons.lamp75} // level 2
                        label="Level 6"                        
                    />
                    </TouchableOpacity>   
                </View>
                </View>
                
                <View>
                <TouchableOpacity onPress={() => onChangeLampLevel(2)}>
                    <IconLabel
                        icon={icons.lamp10} // level 2
                        label="Level 2"
                    />  
                </TouchableOpacity> 
                <View>
                <TouchableOpacity onPress={() => onChangeLampLevel(7)} style={[{paddingTop:20},styles.shadow]}>
                    <IconLabel
                        icon={icons.lamp75} // level 2
                        label="Level 7"
                        
                    />
                    </TouchableOpacity>
                </View>
                </View>
                
                 <View>
                 <TouchableOpacity onPress={() => onChangeLampLevel(3)}>  
                    <IconLabel
                        icon={icons.lamp40} // level 2
                        label="Level 3"
                    />
                    </TouchableOpacity> 
                    <View>
                    <TouchableOpacity onPress={() => onChangeLampLevel(8)} style={{backgroundColor:{styleSwitch}, paddingTop:20}}>
                    <IconLabel
                        icon={icons.lamp100}  // level 1
                        label="Level 8"
                    />
                    {/* <Text style={{position:'absolute', marginTop:75, fontSize:17, textAlign:'center', styleSwitch}}>asd</Text> */}
                    </TouchableOpacity>
                    </View>
                 </View>
                  
                    <View>
                    <TouchableOpacity onPress={() => onChangeLampLevel(4)}>  
                    <IconLabel
                        icon={icons.lamp40} // level 2
                        label="Level 4"
                    />
                    </TouchableOpacity>
                    <View>
                    <TouchableOpacity onPress={() => onChangeLampLevel(9)} style={{backgroundColor:{styleSwitch}, paddingTop:20}}>
                    <IconLabel
                        icon={icons.lamp100}  // level 1
                        label="Level 9"
                    />
                    {/* <Text style={{position:'absolute', marginTop:75, fontSize:17, textAlign:'center', styleSwitch}}>asd</Text> */}
                    </TouchableOpacity>
                    </View>
                    </View>
                    
                
                    
                                    
                </View>
               
                {/* About */}
                {/* <View style={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}>
                    <Text style={{ ...FONTS.h2 }}>About</Text>
                    <Text style={{ marginTop: SIZES.radius, color: COLORS.gray, ...FONTS.body3 }}>
                        Located at the Alps with an altitude of 1,702 meters. The ski area is the largest ski area in the world and is known as the best place to ski. Many other facilities, such as fitness center, sauna, steam room to star-rated restaurants.
                    </Text>
                </View> */}
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

export default LightingButton;
