import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  ScrollView,
} from 'react-native';
import { getRegisterLight } from '../../../util/getPost';
import { icons, COLORS, FONTS } from '../../../constants';
import { Card } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      <Text
        style={{
          color: '#FBFFDC',
          ...FONTS.h3,
          backgroundColor: label === 'OFF' ? COLORS.gray : '#1A5D1A',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const RoomList = ({ route, navigation, timeSettingData }) => {
  const [registerLight, setRegisterLight] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [selfTime, setSelfTime] = useState('');
  const [timerDisplay, setTimerDisplay] = useState({});
  const [labelSwitch, setLabelSwitch] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [data, setData] = useState([]);  
  const [storedValue, setStoredValue] = useState('')
  // const [labelBtn, setLabelBtn] = useState({})

  const {briLight,satLight,hueLight, initialState, status,tempId} = timeSettingData
  
  const fetchRegisterLight = async () => {
    try {
      const response = await getRegisterLight();
      console.log('response ', response);
      const value = await AsyncStorage.getItem('@location')
      if(value !== null){
        setStoredValue(value)
      }
      // const lightData = Object.entries(response).map(([key, value]) => {
      //   const { name: roomName, state: { hue, bri } } = value;

      //   return {
      //     key,
      //     roomName,
      //     hue,
      //     bri
      //   };
      // });
      // {lightId,roomName, lightBri, lightHue} = lightData
  
      // setData(lightData); // Assuming lightid should hold all the extracted data
      setRegisterLight(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching registerLight:', error);
    }
  };

  const registerLightArray = Object.entries(registerLight).map(([key, value]) => ({
    id: key,
    data: value,
  }),
  );

  useEffect(() => {
    fetchRegisterLight();
    console.log('label  switch', timeSettingData)

    // if(status === 6){
    //   set
    // }
  }, [selfTime, initialState]);

  const timerCounter = (timer, id) => {
    setTimeSetup(true)
    if (timer > 0) {
      timer = Number(timer);
      let currentDates = new Date();
      currentDates.setMinutes(currentDates.getMinutes() + timer);

      const countDownDate = new Date(currentDates).getTime();

      const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const timerDisplays = `${hours}h ${minutes}m ${seconds}s`;

        setTimerDisplay((prevDisplay) => {
          const newDisplay = { ...prevDisplay };
          newDisplay[id] = timerDisplays;
          return newDisplay;
        });

        if (distance < 0) {
          clearInterval(x);
          setLabelSwitch((prevLabelSwitch) => {
            const newLabelSwitch = { ...prevLabelSwitch };
            newLabelSwitch[id] = 0;
            return newLabelSwitch;
          });

          setTimerDisplay((prevDisplay) => {
            const newDisplay = { ...prevDisplay };
            newDisplay[id] = '00:00:00';
            return newDisplay;
          });

            // Update the button state to enabled when the timer runs out
            setBtnDisabled(prevBtnDisabled => ({
              ...prevBtnDisabled,
              [id]: false
            }));

            // ConvenienceLogicSet(id, )
          } else {
            // Update the button state to disabled when the timer is running
            setBtnDisabled(prevBtnDisabled => ({
              ...prevBtnDisabled,
              [id]: true
            }));
          }
        }, 1000);

      setLabelSwitch((prevLabelSwitch) => {
        const newLabelSwitch = { ...prevLabelSwitch };
        newLabelSwitch[id] = x;
        return newLabelSwitch;
      });
    }
  };

  const resetTimer = (id) => {
    const timerInterval = labelSwitch[id];
    if (timerInterval) {
      clearInterval(timerInterval);
      setLabelSwitch((prevLabelSwitch) => {
        const newLabelSwitch = { ...prevLabelSwitch };
        newLabelSwitch[id] = 0;
        return newLabelSwitch;
      });
    
      // Update only the relevant ID's value in the btnDisabled state
      setBtnDisabled(prevBtnDisabled => ({
        ...prevBtnDisabled,
        [id]: false
      }));

      setTimerDisplay((prevDisplay) => {
        const newDisplay = { ...prevDisplay };
        newDisplay[id] = '00:00:00';
        return newDisplay;
      });
    }
  };

  // const { lightid, roomName, lightStatus, lightBri, lightCT, lightHue, reachable, lightSat,status, location, device } = route.params;
  
  

  const ConvenienceLogicSet = (id, roomName, timer) => {
    console.log('convenience', id,roomName,timer)
    // timerCounter(timer,id, roomName)
    
    dataBackend = {
      "username":authCtx.token.username,
      "lightHue" : hueLight,
       "lightSat" : satLight,
       "lightBri" : briLight,
       "lightCT" : lightCT,
       "lightStatus" : true,
       "lightId" : id,
       "roomName" : roomName,
       "switchMode":"time-setting",
       "deviceTemp":null,
       "lightLuminance":null,
       "motion":null,
       "location": location,
       "device": device
    }

    hueBackend(dataBackend)
    .then((res) => {
      console.log('response backend', res.message)
      Toast.show({
        type:'success',
        position: 'bottom',
        text1: `Light of ${dataBackend.roomName}`,
        text2: 'has turned OFF successfully',
        visibilityTime: 2000,
      })
      navigation.goBack();
    } )
  }

  const setConvenience = (id, roomName, lightStatus,lightBri, lightCT, lightHue, reachable, lightSat, status, location, device) => {
    console.log('selftime', selfTime[id])
    // setBtnDisabled(prevBtnDisabled => ({
    //   ...prevBtnDisabled,
    //   [id]: true
    // }));
    if(selfTime[id] < 0 || selfTime[id] == undefined || selfTime[id] == ""){
      Toast.show({
        type:'info',
        position: 'top',
        text1: `No Time set!`,
        text2: 'please set up time first!',
        visibilityTime: 2000,
      })
    }else {
      navigation.navigate("Lighting App Lists", {
        screen:'BulbRoom',
        params: dataParams = {
          lightid:id,
          roomName: roomName,
          lightStatus:lightStatus,
          lightBri:lightBri,
          lightCT:lightCT,
          lightHue:lightHue,
          reachable:reachable,
          lightSat:lightSat,
          status:status,
          location: location,
          device:device,
          menu:"timeSetting",
          timer:selfTime[id],
          tempId: id
        }
    })
    }  
  }

  const roomList = (item) => {
    const id = item.id;
    let label;
    let isTouchableDisabled = false;
    // const { lightid, roomName, lightStatus, lightBri, lightCT, lightHue, reachable, lightSat,status, location, device } = route.params;
    let paramsData = {"lightId":id, "roomName":item.data.name, "lightStatus":item.data.state.on, "lightBri":item.data.state.bri,"lightCT":item.data.state.ct,"lightHue":item.data.state.hue, "lightSat":item.data.state.sat, "status":'5',"reachable":item.data.state.reachable, "location":storedValue, "device":Platform.OS }
    if(paramsData.lightStatus === false){
      paramsData.lightBri = 0
      paramsData.lightHue = 0
      paramsData.lightSat = 0
    }
    console.log('params ', paramsData)

    if (item.data.state.reachable === true && item.data.state.on === true) {
      label = 'ON';
    } else if (item.data.state.reachable === true && item.data.state.on === false) {
      label = 'OFF';
    } else {
      label = 'OFF';
      isTouchableDisabled = true;
    }

    if(id in initialState){
      if(initialState[id] === 1){
        // setLabelBtn(`HSB (${hueLight},${satLight},${briLight},${status},${tempId})`)
        // setLabelBtn(prevStateBtn => ({...prevStateBtn, [tempId]: `HSB (${hueLight},${satLight},${briLight}`}))
        labelBtn = `Set to HSB (${hueLight},${satLight},${briLight})`
      }else {
        // setLabelBtn(`Set Convenience`)
        labelBtn = "Set Convenience"
      }
    }else {
      // setLabelBtn(`Set Convenience`)
      labelBtn = "Set Convenience"
    }

    // if(paramsData.status == '5'){
    //   labelBtn = `Set to HSB (${hueLight},${satLight},${briLight})`
    // }else {
    //   labelBtn = "Set Convenience"
    // }

    return (
      
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: 'gray',
              borderRadius: 20,
              maxWidth: 150,
              maxHeight: 150,
              margin: 20,
            }}
          >
            <View style={{ backgroundColor: '#E4F1FF', borderRadius: 10 }}>
              <IconLabel icon={icons.phillipsBulb} label={label} style={{ backgroundColor: '#E4F1FF' }} />
            </View>

            <Text
              style={{
                fontSize: 14,
                width: 120,
                textAlign: 'center',
                backgroundColor: label === 'OFF' ? COLORS.gray : '#8C3333',
                color: '#FFFFFF',
                borderRadius: 5,
              }}
            >
              {item.data.name}
            </Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', marginTop: 25 }}>
              <View>
                <Card style={{ paddingTop: 0, width: '100%' }}>
                  <TextInput
                    label={'in Minute'}
                    placeholder={'Ex. 120 m'}
                    style={{ backgroundColor: 'transparent' }}
                    value={selfTime[id] || ''}
                    onChangeText={(selfTime) => setSelfTime((prevSelfTimes) => ({ ...prevSelfTimes, [id]: selfTime }))}
                 />
                </Card>
              </View>
              <View>
                <TouchableOpacity style={{ paddingTop: 0 }} onPress={() => {
                  if (btnDisabled && selfTime && id !== undefined && !btnDisabled[id]) {
                      timerCounter(selfTime[id], id)
                   }
                  }}   
                  disabled={btnDisabled[id] || false}>
                  <Text
                    style={{
                      margin: 5,
                      color: '#000000',
                      backgroundColor: label === 'ON' ? 'blue' : 'green',
                      color: '#FFFFFF',
                      borderRadius: 5,
                      padding: 10,
                      textAlign: 'center',
                    }}
                  >
                    {label === 'ON' ? 'Turn OFF' : 'Turn ON'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={{ paddingTop: 0 }} onPress={() => resetTimer(id)}>
                  <Text
                    style={{
                      margin: 5,
                      color: '#000000',
                      backgroundColor: 'red',
                      color: '#FFFFFF',
                      borderRadius: 5,
                      padding: 10,
                      textAlign: 'center',
                    }}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 15, flexDirection:'row' }}>
              <View>
            <TouchableOpacity style={{ paddingTop: 0 }} onPress={() => 
              // setConvenience(paramsData.lightId, paramsData.roomName,paramsData.lightStatus, paramsData.lightBri,paramsData.lightCT,paramsData.lightHue, paramsData.reachable, paramsData.lightSat, paramsData.status,paramsData.location,paramsData.device )}>
                 {
                  console.log(btnDisabled, selfTime,paramsData.lightId, !btnDisabled[id])
                  if (btnDisabled && paramsData.lightId !== undefined && !btnDisabled[paramsData.lightId]) {
                      // timerCounter(selfTime[id], id)
                      setConvenience(paramsData.lightId, paramsData.roomName,paramsData.lightStatus, paramsData.lightBri,paramsData.lightCT,paramsData.lightHue, paramsData.reachable, paramsData.lightSat, paramsData.status,paramsData.location,paramsData.device )
                   }
                  }}   
                  disabled={btnDisabled[id] || false}>
              <Text
                 style={{
                   margin: 5,
                   color: '#000000',
                   backgroundColor: 'orange',
                   color: '#FFFFFF',
                   borderRadius: 5,
                   padding: 10,
                   textAlign: 'center',
                   flexWrap: 'wrap',
                   fontSize:10
                 }}
               >
                 {labelBtn}
               </Text>
             </TouchableOpacity> 
              </View>
              <View>
              <Text style={[styles.textWhite, { fontSize: 16, color: '#000000', padding:12 }]}>
                {timerDisplay[id] || '00:00:00'}
              </Text>
              </View>
             
            </View>
          </View>
        </View>
    
    );
  };

  return (
    <>
      <View>
        <Text style={[styles.graphTitle, { paddingTop: 10, marginStart: 20 }]}>Lighting Bulb Lists</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <View style={styles.iconContainer}>
          {registerLightArray && registerLightArray.length > 0 ? (
            <FlatList
              vertical
              showsHorizontalScrollIndicator={false}
              data={registerLightArray}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => roomList(item)}
            />
          ) : (
            <Text>No rooms available</Text>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textWhite: {
    color: 'white',
  },
  graphTitle: {
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default RoomList;
