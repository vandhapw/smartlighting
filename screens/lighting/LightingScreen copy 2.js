
import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
    StatusBar,
    FlatList
} from 'react-native';

import { images, icons, COLORS, FONTS, SIZES } from '../../constants';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AuthenticationProcess, {AuthProcess} from '../../util/AuthenticationProcess';
import { RadialSlider } from 'react-native-radial-slider';
import { useNavigation } from '@react-navigation/native';
import { getRegisterLight, getLightingLog } from '../../util/getPost';
import BulbRoom from './BulbRoom';



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

const LightingScreen = ({ route, navigation }) => {

  const [isLoading, setLoading] = useState(true);
  const [styleSwitch, setStyleSwitch] = useState();
  const styles = getStyles(styleSwitch);
  const [inputLevel, setInputLevel] = useState();
  const isFocused = useIsFocused(true);
  const [registerLight, setRegisterLight] = useState([]);
  const [lightingLogData, setLightingLogData] = useState([]);
  
  const authCtx = useContext(AuthProcess)

  // const navigation = useNavigation()

  const fetchRegisterLight = async () => {
    try {
      const response = await getRegisterLight();
      setRegisterLight(response);
    } catch (error) {
      console.error("Error fetching registerLight:", error);
    }
  };

  const fetchLightingLog = async () => {
    try {
      const response = await getLightingLog();
      setLightingLogData(response);
      // console.log('log ', response)
    } catch (error) {
      console.error("Error fetching Lighting Log:", error);
    }
  };

  const registerLightArray = Object.entries(registerLight).map(([key, value]) => ({
    id: key,
    data: value
  }));

  useEffect(() => {
    fetchRegisterLight()
    fetchLightingLog()

  },[route])

  const calculateTimeDifference = (start, end) => {
    return (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60); // Difference in hours
  };
  
  const calculateTotalOnTime = () => {
    let totalTime = 0;
  
    for (let i = 0; i < lightingLogData.length - 1; i++) {
      if (["on", "True"].includes(lightingLogData[i].lightStatus)) {
        totalTime += calculateTimeDifference(lightingLogData[i].timestamp, lightingLogData[i + 1].timestamp);
      }
    }
    
    return totalTime;
  };
  
  const computeEnergyConsumption = (power, time) => {
    return power * time;
  };

  const totalOnTime = calculateTotalOnTime().toFixed(2);
  const energyConsumption = computeEnergyConsumption(0.095, totalOnTime).toFixed(2); // 0.095 kW = 95W
   
  const calculateCost = (energyConsumption) => {
    const costPerKWh = 910; // in Korean won

    if (energyConsumption <= 200) {
        return energyConsumption * costPerKWh;
    }
    // You can add more conditions here if you have tiered pricing beyond 200 kWh

    return 0; // default, if the energyConsumption is out of the specified range (or you can handle it differently)
}

const cost = calculateCost(energyConsumption);

  
  const [speed, setSpeed] = useState(energyConsumption);
  const data1 = [50, 10, 40, 95, -4, -24, 85, 91];
  const data2 = [20, 30, 25, 80, -10, -20, 95, 87];
  const contentInset = { top: 20, bottom: 20 };

  // const roomList = (item) => {
  //   // console.log('log ', item.data.state.on)
  //   let label;
  //   if(item.data.state.on == true){
  //     label = "ON"
  //   }else {
  //     label = "OFF"
  //   }

    

  //   // console.log('dataParams' , dataParams)
  //   return(
  //       <TouchableOpacity onPress={() => navigation.navigate('Lighting App Lists', {
  //         screen:'BulbRoom',
  //         params: dataParams = {
  //           lightid:item.id,
  //           roomName: item.data.name,
  //           lightStatus:item.data.state.on,
  //           lightBri:item.data.state.bri,
  //           lightCT:item.data.state.ct,
  //           lightHue:item.data.state.hue,
  //           reachable:item.data.state.reachable,
  //           lightSat:item.data.state.sat,
  //         }
  //       })}>
  //       {/* // <TouchableOpacity onPress={() => console.log(item.data.name)} > */}
  //         <View style={{backgroundColor: 'gray', borderRadius:10, maxWidth:150, maxHeight:150, margin:20}}>
  //           <View style={{backgroundColor: '#ffffff'}}>
  //             <IconLabel
  //               icon={icons.lampOff} // level 2
  //               label={label}
  //             />  
  //           </View>
          
  //         <Text style={{fontSize: 14, width:120, textAlign:'center'}}>{item.data.name}</Text>
  //         </View>
  //       </TouchableOpacity>
  //   )
  // }


    return (
      
      <View style={styles.container}>
      
      {/* Title and Temperature */}
      <View style={styles.headerContainer}>
         <Text style={styles.title}>Welcome Home</Text>
         <Text style={styles.temperature}>27°C</Text>
       </View>

      {/* Energy Consumption Graph */}
      <View style={styles.graphContainer}>
         <Text style={styles.graphTitle}>Energy Consumption Today</Text>

         <RadialSlider 
        //  variant='speedometer'
        subTitle={`${totalOnTime} hours, ${cost}원`}
        unit='kwh'
         value={energyConsumption} 
         min={0} 
         max={100} 
         onChange={setSpeed} />
       
       <Text style={{alignSelf:'flex-start'}}>Formula :</Text>
       <Text style={{alignSelf:'flex-start', fontSize:10}}>"Energy Consumption (in kWh) = Power (in kW) x Time (in hours)"</Text>
       </View>

      {/* Appliance Icons */}
      <View>
      <Text style={[styles.graphTitle,{paddingTop:10}]}>Room Lists</Text>
      </View>
      {/* <View style={styles.iconContainer}>      
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
      </View> */}

    </View>
    );
};

const getStyles = (bgColor)  => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
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
  graphContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  energyText: {
    position: 'absolute',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  suggestion: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',  // Optional: If you want them to align vertically in the center
    marginVertical: 10,
  },
 
  graphContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  graph: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textGroup: {
    padding:10,
    transform: 'translate(0, 110)',  // Adjust the text's y-position to the middle of the circle
},

});

export default LightingScreen;
