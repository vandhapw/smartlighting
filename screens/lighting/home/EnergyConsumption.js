import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
   
} from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';
import {getLightingLog,getEnergyConsumption } from '../../../util/getPost';
import LoadingOverlay from '../../../component/LoadingOverlay';

const EnergyConsumption = ({route, navigation}) => {

    const [lightingLogData, setLightingLogData] = useState([]);
    const [energyConsumption, setEnergyConsumption] = useState([]);
    const [styleSwitch, setStyleSwitch] = useState();
    const styles = getStyles(styleSwitch);
    const [speed, setSpeed] = useState();
    const [isLoading, setLoading] = useState(true)
    
  const fetchLightingLog = async () => {
    try {
      const response = await getLightingLog();
      setLightingLogData(response);
      // console.log('log ', response)
    } catch (error) {
      console.error("Error fetching Lighting Log:", error);
    }
  };

  const fetchEnergyConsumption = async() => {
    try {
      const response = await getEnergyConsumption();
      console.log('energy ', response)
      setSpeed(response.total_energy)
      setEnergyConsumption(response);
      setLoading(false)
      // console.log('log ', response)
    } catch (error) {
      setEnergyConsumption("No Data")
      console.error("Error fetching Lighting Log:", error);
    }
  }

 

  // const calculateTimeDifference = (start, end) => {
  //   return (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60); // Difference in hours
  // };
  
  // const calculateTotalOnTime = () => {
  //   let totalTime = 0;
  
  //   for (let i = 0; i < lightingLogData.length - 1; i++) {
  //     if (["on", "True"].includes(lightingLogData[i].lightStatus)) {
  //       totalTime += calculateTimeDifference(lightingLogData[i].timestamp, lightingLogData[i + 1].timestamp);
  //     }
  //   }
    
  //   return totalTime;
  // };
  
  // const computeEnergyConsumption = (power, time) => {
  //   return power * time;
  // };

  // const totalOnTime = calculateTotalOnTime().toFixed(2);
  // const energyConsumption = computeEnergyConsumption(0.095, totalOnTime).toFixed(2); // 0.095 kW = 95W
   
//   const calculateCost = (energyConsumption) => {
//     const costPerKWh = 910; // in Korean won

//     if (energyConsumption <= 200) {
//         return energyConsumption * costPerKWh;
//     }
//     // You can add more conditions here if you have tiered pricing beyond 200 kWh

//     return 0; // default, if the energyConsumption is out of the specified range (or you can handle it differently)
// }

// const cost = calculateCost(energyConsumption);

  
//   const [speed, setSpeed] = useState(0.10);
//   const data1 = [50, 10, 40, 95, -4, -24, 85, 91];
//   const data2 = [20, 30, 25, 80, -10, -20, 95, 87];
//   const contentInset = { top: 20, bottom: 20 };

  useEffect(() => {
    fetchLightingLog()
    fetchEnergyConsumption()
},[route])


    return (
      <>
    <View style={styles.graphContainer}>
      <Text style={styles.graphTitle}>Energy Consumption Today</Text>
      {isLoading ? <LoadingOverlay/> :
      <TouchableOpacity onPress={() => navigation.navigate("Usage")}>
      <RadialSlider 
         //  variant='speedometer'
         subTitle={`${(energyConsumption.total_hours).toFixed(1)} hours, ${(energyConsumption.cost).toFixed(1)}원`}
         unit='kwh'
         value={(energyConsumption.total_energy).toFixed(2)} 
         min={0} 
         max={100} 
         onChange={setSpeed} />    
      </TouchableOpacity>
      }
    {/* <Text style={{alignSelf:'flex-start'}}>Formula :</Text>
    <Text style={{alignSelf:'flex-start', fontSize:10}}>"Energy Consumption (in kWh) = Power (in kW) x Time (in hours)"</Text> */}
    </View>
      </>
      
    )
}

const getStyles = (bgColor)  => StyleSheet.create({
    graphContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
  });

export default EnergyConsumption