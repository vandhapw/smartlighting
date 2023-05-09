
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
    DeviceEventEmitter,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { images, icons, COLORS, FONTS, SIZES } from '../../constants';

import { Entypo } from 'react-native-vector-icons/Entypo';
import {BarChart } from 'react-native-chart-kit';
import {Card, Button, TextInput} from 'react-native-paper';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getSwitchValue, sendDataMobile, postSwitchDevice } from '../../util/getPost';
import { useCsrfToken } from '@shopify/react-csrf';
import AuthenticationProcess, {AuthProcess} from '../../util/AuthenticationProcess';
import LightingButton from './LightingButton';
import ModalLoading from '../../component/ModalLoading';
import BottomSheetLocation from './BottomSheetLocation';
import { startLightSensor, stopLightSensor } from 'react-native-ambient-light-sensor';



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

const LightingScreen = ({ route }) => {

  const [lampLevel, setLampLevel] = useState();
  const [textLevel, setTextLevel] = useState();
  const [isLevel, setLevel] = useState();
  const [isLoading, setLoading] = useState(true);
  const [styleSwitch, setStyleSwitch] = useState();
  const styles = getStyles(styleSwitch);
  const [inputLevel, setInputLevel] = useState();
  const isFocused = useIsFocused(true);
  const [isShowing, setShowing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const authCtx = useContext(AuthProcess)

  
  // const {showValue} = route.params
  useEffect(() => {
    if(route.params != undefined){
      const {showValue} = route.params
      console.log(showValue)
      setShowing(true)
    }else {
      console.log(route.params)
      setShowing(false)
    }

  },[route])

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

  const [result, setResult] = React.useState();

  React.useEffect(() => {
    startLightSensor();
    currentState()
      
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
  }, []);



    return (
      
      
        <View style={styles.container}>
          
          <View style={{ flex: 1 }}>
        {/* <Image
            source={images.skiVillaBanner}
            resizeMode="cover"
            style={{
                width: '100%',
                height: '80%',
            }}
        /> */}
        <Text style={{ ...FONTS.h2, textAlign:'center', paddingTop:150, color:'#000000' }}>Ambient Light Sensor</Text>
        <View
            style={[{
                position: 'absolute',
                bottom: "52%",
                left: "5%",
                right: "5%",
                borderRadius: 15,
                padding: 2,
                // alignItems:'center',
                backgroundColor: COLORS.white,
            }, styles.shadow]}
        >
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.shadow, COLORS.primary, {marginTop:30, marginStart:30}]}>
                <IconLabel icon={lampLevel}/>
                </View>

                <View style={{ marginHorizontal: SIZES.radius, justifyContent: 'space-around' }}>
                    <Text style={{ ...FONTS.h2, marginStart:25, color:'#000000' }}>Ambient Light</Text>
                </View>
                <View style={{ marginHorizontal: SIZES.radius,marginStart:5, justifyContent: 'space-around' }}>
                    <Text style={{ ...FONTS.h2, color:'green', fontWeight:'bold' }}>{result}</Text>
                </View>
            </View>
            <View style={{position:'absolute', marginTop:110, marginStart:10}}>
              <Text style={{...FONTS.h4,color:'green', fontWeight:'bold'}}>Ambient Light</Text>
            </View>
            <TouchableOpacity style={{backgroundColor: 'blue'}} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{color: 'white', textAlign:'center'}}>Save this data?</Text>
            </TouchableOpacity>
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Save Ambient Data</Text>
            <TextInput
                placeholder={"Where are you? Ex. Home / Office"}
                style={{fontSize: 12, borderRadius: 10}}
            ></TextInput>
            <TextInput
            placeholder='How many people in your room?'
            style={{fontSize: 12, margin: 10,borderRadius: 10}}
            ></TextInput>
            <Pressable
              style={[styles.button, styles.buttonClose, {marginTop: 10}]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>


      </View>

           
           
        </View>
    );
};

const getStyles = (styleSwitch)  => StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.white
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

export default LightingScreen;
