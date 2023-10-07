import React, {useState, useEffect} from 'react'
import {View,Text,FlatList, StyleSheet, TouchableOpacity, Image, Pressable, TextInput} from 'react-native'
import { getRegisterLight, getLightingLog, getEnergyConsumption } from '../../../util/getPost';
import { images, icons, COLORS, FONTS, SIZES } from '../../../constants';
import { Card,Button } from 'react-native-paper';
import { RadialSlider } from 'react-native-radial-slider';



const IconLabel = ({ icon, label }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image
                source={icon}
                resizeMode="cover"
                style={{
                    width: 50,
                    height: 75,
                    // backgroundColor:'#E5D283'
                }}
            />
            <Text style={{ color: '#FBFFDC', ...FONTS.h3, 
            backgroundColor: label === "OFF" ? COLORS.gray :'#1A5D1A', 
            width:'100%', textAlign:'center' }}>{label}</Text>
        </View>
    )
  }

const RoomList = ({route,navigation, data}) => {

    const [isFocused, setIsFocused] = useState(false);
    const [registerLight, setRegisterLight] = useState([]);
    const [styleSwitch, setStyleSwitch] = useState();
    const styles = getStyles(styleSwitch);
    const [isLoading, setLoading] = useState(true);
    const [lightStatus, setLightStatus] = useState()

    const [selfTime, setSelfTime] = useState("");
    const [timerDisplay, setTimerDisplay] = useState([]);
    const [labelSwitch, setLabelSwitch] = useState(false)
    const [speed, setSpeed] = useState();
   
    const fetchRegisterLight = async () => {
        try {
          const response = await getEnergyConsumption();
          // console.log('response ', response.filtered)
          setRegisterLight(response.filtered);
          setLoading(false)
        } catch (error) {
          console.error("Error fetching registerLight:", error);
        }
      };

    const roomList = (item) => {
      console.log('item ', item)
      function costCalculation(kwh){
          let x = kwh*910
          return x
      }
      let cost = costCalculation(item.data.energy_kwh)
    
      function reformateDate(timestamp){
        const parts = timestamp.split('T');
        const datePart = parts[0];
        const timePart = parts[1].split('.')[0]; // Remove milliseconds
        const formattedTimestamp = `${datePart} ${timePart}`;
        return formattedTimestamp
      }
      let timestamps = reformateDate(item.data.timestamp)
    // console.log('log ', item.data.state.on)
    // let label;
    // let isTouchableDisabled = false
    // // label = "TEST"
    // if(item.data.state.reachable == true && item.data.state.on == true){
    //   label = "ON"
    //   setLightStatus("ON")
    // }else if(item.data.state.reachable == true && item.data.state.on == false) {
    //   label = "OFF"
    //   setLightStatus("OFF")
    //   // isTouchableDisabled = true
    // }else {
    //   label = "OFF"
    //   isTouchableDisabled = true
    // }
    setSpeed(item.data.energy_kwh)
    
    return(
     
         <View style={{flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center',  borderColor:'gray', borderWidth:1, padding:5}}>
            <View style={{padding:10}}>
              <Text style={{textAlign:'center', fontWeight:'bold'}}>{item.data.roomName}</Text>
            <RadialSlider 
         //  variant='speedometer'
              subTitle={`${item.data.time_difference_in_hours.toFixed(2)} hours, ${cost.toFixed(2)}원`}
              unit='kwh'
              value={item.data.energy_kwh.toFixed(3)} 
              min={0} 
              max={100}
              style={{justifyContent:'center'}}
              onChange={setSpeed} 
              />  
            </View>
            <View style={{flexDirection:'column', marginStart:25, marginBottom:10,}}>
              <View style={{flexDirection:'row'}}>
                <View>
                <Text>Total of Energy Consumption (kwh) : </Text>
                </View>
                <View>
                <Text>{item.data.energy_kwh.toFixed(2)}</Text>
                </View>                
              </View> 
              <View style={{flexDirection:'row'}}>
                <View>
                <Text>Total of Energy Consumption (hours per day) : </Text>
                </View>
                <View>
                <Text>{item.data.time_difference_in_hours.toFixed(2)} hours</Text>
                </View>                
              </View> 
              <View style={{flexDirection:'row'}}>
                <View>
                <Text>Total of Energy Consumption (day) :  </Text>
                </View>
                <View>
                <Text>{item.data.time_per_day.toFixed(2)} days</Text>
                </View>                
              </View>
              <View style={{flexDirection:'row'}}>
                <View>
                <Text>Last Turn On Light :  </Text>
                </View>
                <View>
                <Text>{timestamps}</Text>
                </View>                
              </View> 
              <View style={{flexDirection:'row'}}>
                <View>
                <Text>Method of Changing Light :  </Text>
                </View>
                <View>
                <Text>{item.data.switchMode}</Text>
                </View>                
              </View> 
            </View>
           
         </View>
      )
  }

useEffect(() => {
    fetchRegisterLight()
   
},[])

const registerLightArray = Object.entries(registerLight).map(([key, value]) => ({
  id: key,
  data: value
}));

console.log('register light array', registerLightArray)




    return (
    <>
        <View>
            <Text style={[styles.graphTitle,{paddingTop:10, marginStart:20}]}>Lighting Bulb Lists</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
            <View style={styles.iconContainer}>      
                {registerLightArray && registerLightArray.length > 0 ? ( // Check if registerLight has data
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
        {/* </View> */}

      

         </>
          )
}

const getStyles = (bgColor)  => StyleSheet.create({
    title: {
       fontSize: 24,
       fontWeight: 'bold',
       textAlign: 'center',
       marginVertical: 10,
     },
     temperature: {
       fontSize: 18,
       textAlign: 'center',
       marginVertical: 10,
     },
     
     headerContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',  // Optional: If you want them to align vertically in the center
       marginVertical: 10,
     },
   });
 

export default RoomList;