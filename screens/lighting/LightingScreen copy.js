
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

import { images, icons, COLORS, FONTS, SIZES } from '../../constants';

import { Entypo } from 'react-native-vector-icons/Entypo';
import {Card, Button, TextInput} from 'react-native-paper';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useCsrfToken } from '@shopify/react-csrf';
import AuthenticationProcess, {AuthProcess} from '../../util/AuthenticationProcess';
import LightingButton from './LightingButton';
import ModalLoading from '../../component/ModalLoading';
import BottomSheetLocation from './BottomSheetLocation';
import Geolocation from '@react-native-community/geolocation';


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

  useEffect(() => {
    currentState()
    // fetchCurrentData()
  },[inputLevel])

  const storeLighting = (value) => {
    // console.log('value passed: ', value)
    setShowing(true)    
  }



    return (
      
      
        <View style={styles.container}>
          

          <LightingButton />

          {isShowing ? <BottomSheetLocation value={isShowing}/> : ""}
           
           
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
