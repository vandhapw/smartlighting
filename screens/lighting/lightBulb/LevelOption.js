import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder, Dimensions} from 'react-native'
// import Animated, {Easing, EasingNode, Value, timing,withSpring} from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
import  Icon  from 'react-native-vector-icons/FontAwesome';

const LevelOption  = ({data, navigation}) => {
    let { lightid, roomName, lightStatus, lightBri, lightCT, lightHue, reachable, lightSat, status, brightness } = data;
    
    // console.log('level option',data)
    const [updateLightBri, setUpdateLightBri] = useState(lightBri)

    const [progress, setProgress] = useState(0)
    const [indicatorPosition] = useState(new Animated.Value(0))

    const animatedValue = useRef(new Animated.Value(0)).current;

    function convertBrightness(bri){
        let hsbBri = Math.floor((bri / 254) * 100); 
        setUpdateLightBri(hsbBri)

        return hsbBri
    }
    const styles = getStyles();
    
    const [colorChange, setColorChange] = useState("#125B50")
    const [colorChange1, setColorChange1] = useState(false)
    const [colorChange2, setColorChange2] = useState(false)
    const [colorChange3, setColorChange3] = useState(false)
    const [colorChange4, setColorChange4] = useState(false)
    const [colorChange5, setColorChange5] = useState(false)
    const [colorChange6, setColorChange6] = useState(false)
    const [colorChange7, setColorChange7] = useState(false)
    const [colorChange8, setColorChange8] = useState(false)
    const [colorChange9, setColorChange9] = useState(false)
    const [colorChange10, setColorChange10] = useState(false)

    

    // console.log('bright ', updateLightBri)
    // console.log('bright value ', brightness)

    function changeLevel(min, max){
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        let briNumber = (number * 254) / 100
        // console.log('number ', number)
        sendingLevelValue(number)
        setUpdateLightBri(number)
        
    }

    function sendingLevelValue(number){
        // console.log('sending', number)
        navigation.navigate('Lighting App Lists', {
            screen:'BulbRoom',
            params: dataParams = {
              lightid:lightid,
              roomName: roomName,
              lightStatus:lightStatus,
              lightBri:number,
              lightCT:lightCT,
              lightHue:lightHue,
              reachable:reachable,
              lightSat:lightSat,
              status:4,
              brightness: number
            }
        })
    }

    const sliderHeight = 270; // Change this value based on desired height


    const handleMove = (evt) => {
      const newY = evt.nativeEvent.locationY;
      const boundedY = Math.max(0, Math.min(newY, sliderHeight));
      setProgress(boundedY / sliderHeight);
    };
  
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: handleMove,
      onPanResponderRelease: handleMove,
    });

    const currentPercentage = `${Math.round(updateLightBri)}%`;


    const bulbIconStyle = {
        position: 'absolute',
        bottom: currentPercentage,
        left: 10,
      };

    useEffect(() => {

        Animated.timing(animatedValue, {
            toValue: updateLightBri * sliderHeight,
            duration: 100,
            // easing: EasingNode.linear,
            useNativeDriver: false,
        }).start();

        if(status == 0){
            convertBrightness(lightBri)
        }else if(status == 4) {
            setUpdateLightBri(lightBri)
        }else if(status == 2){
            lightBri = brightness
            setUpdateLightBri(lightBri)
        }


       

        // getBackgroundColor(lightBri)
        
    switch(true){
        case updateLightBri >= 0 && updateLightBri <= 10:
          setColorChange1(true)
          setColorChange2(false)
          setColorChange3(false)
          setColorChange4(false)
          setColorChange5(false)
          setColorChange6(false)
          setColorChange7(false)
          setColorChange8(false)
          setColorChange9(false)
          setColorChange10(false)
          break;
        case updateLightBri >= 11 && updateLightBri <= 20:
            setColorChange2(true)
            setColorChange1(false)
          setColorChange3(false)
          setColorChange4(false)
          setColorChange5(false)
          setColorChange6(false)
          setColorChange7(false)
          setColorChange8(false)
          setColorChange9(false)
          setColorChange10(false)
          break;
        case updateLightBri >= 21 && updateLightBri <= 30:
            setColorChange3(true)
            setColorChange2(false)
          setColorChange1(false)
          setColorChange4(false)
          setColorChange5(false)
          setColorChange6(false)
          setColorChange7(false)
          setColorChange8(false)
          setColorChange9(false)
          setColorChange10(false)
          break;
        case updateLightBri >= 31 && updateLightBri <= 40:
          setColorChange4(true)
          setColorChange2(false)
          setColorChange3(false)
          setColorChange1(false)
          setColorChange5(false)
          setColorChange6(false)
          setColorChange7(false)
          setColorChange8(false)
          setColorChange9(false)
          setColorChange10(false)
          break;
        case updateLightBri >= 41 && updateLightBri <= 50:
          setColorChange5(true)
          setColorChange2(false)
          setColorChange3(false)
          setColorChange4(false)
          setColorChange1(false)
          setColorChange6(false)
          setColorChange7(false)
          setColorChange8(false)
          setColorChange9(false)
          setColorChange10(false)
          break;
        case updateLightBri >= 51 && updateLightBri <= 60:
          setColorChange6(true)
          setColorChange2(false)
          setColorChange3(false)
          setColorChange4(false)
          setColorChange5(false)
          setColorChange1(false)
          setColorChange7(false)
          setColorChange8(false)
          setColorChange9(false)
          setColorChange10(false)
          break;
        case updateLightBri >= 61 && updateLightBri <= 70:
          setColorChange7(true)
          setColorChange2(false)
          setColorChange3(false)
          setColorChange4(false)
          setColorChange5(false)
          setColorChange6(false)
          setColorChange1(false)
          setColorChange8(false)
          setColorChange9(false)
          setColorChange10(false)
          break;
        case updateLightBri >= 71 && updateLightBri <= 80:
          setColorChange8(true)
          setColorChange2(false)
          setColorChange3(false)
          setColorChange4(false)
          setColorChange5(false)
          setColorChange6(false)
          setColorChange7(false)
          setColorChange1(false)
          setColorChange9(false)
          setColorChange10(false)
          break;
        case updateLightBri >= 81 && updateLightBri <= 90:
          setColorChange9(true)
          setColorChange2(false)
          setColorChange3(false)
          setColorChange4(false)
          setColorChange5(false)
          setColorChange6(false)
          setColorChange7(false)
          setColorChange8(false)
          setColorChange1(false)
          setColorChange10(false)
          break;
        case updateLightBri >= 91 && updateLightBri <= 100:
          setColorChange10(true)
          setColorChange2(false)
          setColorChange3(false)
          setColorChange4(false)
          setColorChange5(false)
          setColorChange6(false)
          setColorChange7(false)
          setColorChange8(false)
          setColorChange9(false)
          setColorChange1(false)
          break;
        default:
          setColorChange(false)
      }         
  
    },[updateLightBri,data])

    const levels = [
        { label: 'Level 0', percentage: '0%' },
        { label: 'Level 1', percentage: '25%' },
        { label: 'Level 2', percentage: '50%' },
        { label: 'Level 3', percentage: '75%' },
        { label: 'Level 4', percentage: '100%' },
      ];

   
   
    return (
        <>
        <View style={styles.levelPosition}>
            {/* <View style={styles.levelChoice}>
                <View>
                    <TouchableOpacity onPress={() => changeLevel(0,10) } style={[styles.marginPosition,{backgroundColor: colorChange1 ? '#D2001A' : '#125B50'}]}>
                        <Text style={styles.textColor}>Level 1</Text>
                    </TouchableOpacity>                    
                </View> 
                <View>
                    <TouchableOpacity onPress={() => changeLevel(11,20) } style={[styles.marginPosition,{backgroundColor: colorChange2 ? '#D2001A' : '#125B50'}]}>
                    <Text style={styles.textColor}>Level 2</Text>
                    </TouchableOpacity>
                </View> 
                <View>
                    <TouchableOpacity onPress={() => changeLevel(21,30) } style={[styles.marginPosition,{backgroundColor: colorChange3 ? '#D2001A' : '#125B50'}]}>
                    <Text style={styles.textColor}>Level 3</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => changeLevel(31,40) } style={[styles.marginPosition,{backgroundColor: colorChange4 ? '#D2001A' : '#125B50'}]}>
                    <Text style={styles.textColor}>Level 4</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => changeLevel(41,50) } style={[styles.marginPosition,{backgroundColor: colorChange5 ? '#D2001A' : '#125B50'}]}>
                    <Text style={styles.textColor}>Level 5</Text>
                    </TouchableOpacity>
                </View>     
                <Animated.View style={[styles.bar,{width:progress}]} /> 
                      
            </View> */}
            {/* <View style={styles.levelChoice}>
                <View>
                    <TouchableOpacity onPress={() => changeLevel(51,60) } style={[styles.marginPosition,{backgroundColor: colorChange6 ? '#D2001A' : '#125B50'}]}>
                        <Text style={styles.textColor}>Level 6</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => changeLevel(61,70) } style={[styles.marginPosition,{backgroundColor: colorChange7 ? '#D2001A' : '#125B50'}]}>
                        <Text style={styles.textColor}>Level 7</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => changeLevel(71,80) } style={[styles.marginPosition,{backgroundColor: colorChange8 ? '#D2001A' : '#125B50'}]}>
                        <Text style={styles.textColor}>Level 8</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => changeLevel(81,90) } style={[styles.marginPosition,{backgroundColor: colorChange9 ? '#D2001A' : '#125B50'}]}>
                        <Text style={styles.textColor}>Level 9</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => changeLevel(91,100) } style={[styles.marginPosition,{backgroundColor: colorChange10 ? '#D2001A' : '#125B50'}]}>
                        <Text style={styles.textColor}>Level 10</Text>
                    </TouchableOpacity>
                </View>
                
            </View> */}

                {/* <Slider 
                    style={styles.slider}
                    value={progress}
                    minimumValue={0}
                    maximumValue={1}
                    onValueChange={(value) => setProgress(value)}
                    orientation="vertical"
                    step={1}
                />    
                <View style={styles.progressBar}>
                    <View
                    style={[
                        styles.progressBarFill,
                        {
                        height: `${progress * 100}%`,
                        },
                    ]}
                    />
                    </View> */}
    <View
        style={{
          width: 40,
          height: sliderHeight,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: '#f4f4f4',
          position:'relative',
          marginStart: 20,
          borderRadius: 20,
          justifyContent:'flex-start'
        }}
        {...panResponder.panHandlers}
      >
    <View
        style={{
            position: 'absolute',
            top: 5, // Adjust the top position as needed
            alignSelf: 'center',
          }}
    >
          {/* <Icon name="lightbulb-o" size={24} color="yellow" /> */}
        </View>
        <View
          style={{
            backgroundColor: 'blue',
            width: '100%',
            height: `${updateLightBri}%`,
            bottom: 0,
            position:'absolute'
          }}
        />
          {levels.map((level, index) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              bottom: `${index * 25}%`,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <Text style={{ fontSize: 10, fontWeight:'900', color:'#FFFFFF' }}>{level.label}</Text>
            {/* <Text style={{ fontSize: 10 }}>
              {index === 0 ? currentPercentage : level.percentage}
            </Text> */}
          </View>
        ))}
         <Animated.View style={bulbIconStyle}>
          <Icon name="lightbulb-o" size={35} color="#213555" />
        </Animated.View>
      </View>
            
        </View>
        </>
    )
}

const getStyles = ()  => StyleSheet.create({
    
    levelPosition: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent:'space-between',
      marginTop: -560,
      marginStart: 10,
      marginEnd: 10,
      marginBottom: 10
      
      // backgroundColor:'black',
    },

    levelChoice: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent:'space-around',
        
        // backgroundColor:'black',
      },

    marginPosition: {
        marginTop: 10,
        backgroundColor:'#125B50',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        margin: 5,
    },

    textColor:{
        color: '#FFFFFF'
    },
    
    energyCard: {
      backgroundColor:'#EEE2DE',
      // padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      margin: 5
      // position:'absolute'
    },

    bar: {
        // height: 20,
        backgroundColor: '#333',
        borderRadius: 10,
        flex:1,
        backgroundColor:'green',
      },
      slider: {
        height: 200, // Set the height to control the slider's length
        transform: [{ rotate: '-90deg' }], // Rotate the slider to make it vertical
        width:20,
        overflow: 'hidden'
      },
      progressBar: {
        width: 20,
        height: 200, // Set the height to match the slider's height
        backgroundColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
      },
      progressBarFill: {
        backgroundColor: 'green',
        width: '100%',
      },

   });

export default LevelOption