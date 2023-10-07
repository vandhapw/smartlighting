import React, {useState, useEffect} from 'react'
import {View,Text,FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { getRegisterLight, getLightingLog } from '../../../util/getPost';
import { images, icons, COLORS, FONTS, SIZES } from '../../../constants';



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
            backgroundColor: label === "OFF" || label === "Unreachable" ? COLORS.gray :'#1A5D1A', 
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

    const fetchRegisterLight = async () => {
        try {
          const response = await getRegisterLight();
          setRegisterLight(response);
          setLoading(false)
        } catch (error) {
          console.error("Error fetching registerLight:", error);
        }
      };

    const registerLightArray = Object.entries(registerLight).map(([key, value]) => ({
        id: key,
        data: value
    }));
    

    const roomList = (item) => {
    // console.log('log ', item.data.state.on)
    let label;
    let isTouchableDisabled = false
    // label = "TEST"
    if(item.data.state.reachable == true && item.data.state.on == true){
      label = "ON"
    }else if(item.data.state.reachable == true && item.data.state.on == false) {
      label = "OFF"
      // isTouchableDisabled = true
    }else {
      label = "Unreachable"
      isTouchableDisabled = true
    }

    // console.log('dataParams' , dataParams)
    return(
        <TouchableOpacity onPress={() => navigation.navigate('Lighting App Lists', {
          screen:'BulbRoom',
          params: dataParams = {
            lightid:item.id,
            roomName: item.data.name,
            lightStatus:item.data.state.on,
            lightBri:item.data.state.bri,
            lightCT:item.data.state.ct,
            lightHue:item.data.state.hue,
            reachable:item.data.state.reachable,
            lightSat:item.data.state.sat,
            status: 0,
            location: data.location,
            device:data.device,
            menu:data.menu
          }
        })}
        disabled={isTouchableDisabled}
        >
         {/* <TouchableOpacity onPress={() => console.log(item.data.name)} > */}
          <View style={{backgroundColor: 'gray', borderRadius:20, maxWidth:150, maxHeight:150, margin:20}}>
            <View style={{backgroundColor: '#E4F1FF', borderRadius:10}}>
              <IconLabel
                icon={icons.phillipsBulb} // level 2
                label={label}
                style={{backgroundColor:'#E4F1FF'}}
              />  
            </View>
          
          <Text style={{fontSize: 14, width:120, textAlign:'center', 
          backgroundColor: label === "OFF" || label ==="Unreachable" ? COLORS.gray : '#8C3333', 
          color:'#FFFFFF',borderRadius:5}}>{item.data.name}</Text>
          </View>
        </TouchableOpacity>
    )
  }

useEffect(() => {
    fetchRegisterLight()
},[data,route])


    return (
    <>
        <View>
            <Text style={[styles.graphTitle,{paddingTop:10}]}>Room Lists</Text>
        </View>
        <View style={styles.iconContainer}>      
            {registerLightArray && registerLightArray.length > 0 ? ( // Check if registerLight has data
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={registerLightArray}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => roomList(item)}
            />
        ) : (
        <Text>No rooms available</Text>
    )}
      </View>

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