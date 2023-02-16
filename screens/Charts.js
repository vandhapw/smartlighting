/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
    Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator
} from 'react-native';

import { LineChart } from 'react-native-chart-kit';

import { fetchRealTime } from '../util/getPost';

function Charts(){

    const [realTimeData, setRealTimeData] = useState([])

    useEffect(() => {
        getRealTime();
        setTimeout(getRealTime, 1440 * 1000)
      }, [])

    const getRealTime = async () => {
        await fetchRealTime().then((res) => {
            setRealTimeData(res)
        })
    }

    let timestamps = [];
    let aqi = [];
    let co = [];
    let no2 = [];
    let ozone = [];
    let pm10 = [];
    let pm25 = [];
    let so2 = [];
    if (realTimeData.length < 1) {
        console.log(realTimeData, "Kosong")
        // return <LoadingOverlay message={`"Waiting for Loading Content from API..."`} />
        timestamps= ["00","00"]
        aqi= [0,10]
        co= [0,10]
        no2= [0,10]
        ozone= [0,10]
        pm10= [0,10]
        pm25= [0,10]
        so2= [0,10]
        loading = <ActivityIndicator size="large" color="#0000ff" />
        waiting = "Waiting for API Data"
    } else {
        // newData = realTimeData;
        
        console.log(Object.keys(realTimeData));
        Object.keys(realTimeData).map(function(key){
            timestamps.push(realTimeData[key].timestamps);
            aqi.push(realTimeData[key].aqi)
            co.push(realTimeData[key].co)
            no2.push(realTimeData[key].no2)
            ozone.push(realTimeData[key].ozone)
            pm10.push(realTimeData[key].pm10)
            pm25.push(realTimeData[key].pm25)
            so2.push(realTimeData[key].so2)
            loading = ""
            waiting = "Charts Screen"
        })
        console.log(aqi, " timestamps ", timestamps)
        // console.log(aqi)
        // console.log(last_data.timestamps)
        // console.log(Object.keys(realTimeData));
        // console.log(realTimeData)
    }

   
  return (
   
      <ScrollView style={{backgroundColor: "#990100"}} >
        <View>
        <Text style={styles.whiteColor}>
          {waiting} {loading}
        </Text>
        
        </View>
        <View>
            <Text style={styles.whiteColor}>
                Air Quality Index Charts
            </Text>
        </View>

        <LineChart 
            
            data={{
                // labels :  [timestamps],
                labels :  [timestamps],
                datasets: [
                    {
                        data:aqi
                        // data:[55,67]
                    }
                ]
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel=""
            yAxisSuffix=''
            yAxisInterval={1}
            chartConfig={{
                backgroundColor:"#046D8B",
                backgroundGradientFrom:"#046D8B",
                backgroundGradientTo: "#046D8B",
                decimalPlaces: 2,
                color:(opacity = 1) => `rgba(255,255,255, ${opacity})`,
                labelColor:(opacity = 1) => `rgba(255,255,255,${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots:{
                    r: "6",
                    strokeWidth: "2",
                    stroke:'#ffa726'
                }
            }}
            bezier
            style={{
                marginVertical:8,
                borderRadius:16
            }}
        />
   
        <View>
            <Text style={styles.whiteColor}>
                Carbon Dioxide Charts
            </Text>
        </View>
        <LineChart 
            data={{
                labels : [timestamps],
                // labels :  ["Januari", "February"],
                datasets: [
                    {
                        data:co
                        // data:[21,26]
                    }
                ]
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel=""
            yAxisSuffix=''
            yAxisInterval={1}
            chartConfig={{
                backgroundColor:"#309292",
                backgroundGradientFrom:"#309292",
                backgroundGradientTo: "#309292",
                decimalPlaces: 2,
                color:(opacity = 1) => `rgba(255,255,255, ${opacity})`,
                labelColor:(opacity = 1) => `rgba(255,255,255,${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots:{
                    r: "6",
                    strokeWidth: "2",
                    stroke:'#ffa726'
                }
            }}
            bezier
            style={{
                marginVertical:8,
                borderRadius:16
            }}
        />

<View>
            <Text style={styles.whiteColor}>
                Ozone Charts
            </Text>
        </View>
        <LineChart 
            data={{
                labels : [timestamps],
                // labels :  ["Januari", "February"],
                datasets: [
                    {
                        data:ozone
                        // data:[75,89]
                    }
                ]
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel=""
            yAxisSuffix=''
            yAxisInterval={1}
            chartConfig={{
                backgroundColor:"#2FB8AC",
                backgroundGradientFrom:"#2FB8AC",
                backgroundGradientTo: "#2FB8AC",
                decimalPlaces: 2,
                color:(opacity = 1) => `rgba(255,255,255, ${opacity})`,
                labelColor:(opacity = 1) => `rgba(255,255,255,${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots:{
                    r: "6",
                    strokeWidth: "2",
                    stroke:'#ffa726'
                }
            }}
            bezier
            style={{
                marginVertical:8,
                borderRadius:16
            }}
        />

<View>
            <Text style={styles.whiteColor}>
                Nitrogen Dioxide (NO2) Charts
            </Text>
        </View>
        <LineChart 
            data={{
                labels : [timestamps],
                // labels :  ["Januari", "February"],
                datasets: [
                    {
                        data:no2
                        // data:[13,56]
                    }
                ]
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel=""
            yAxisSuffix=''
            yAxisInterval={1}
            chartConfig={{
                backgroundColor:"#93A42A",
                backgroundGradientFrom:"#93A42A",
                backgroundGradientTo: "#93A42A",
                decimalPlaces: 2,
                color:(opacity = 1) => `rgba(255,255,255, ${opacity})`,
                labelColor:(opacity = 1) => `rgba(255,255,255,${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots:{
                    r: "6",
                    strokeWidth: "2",
                    stroke:'#ffa726'
                }
            }}
            bezier
            style={{
                marginVertical:8,
                borderRadius:16
            }}
        />

<View>
            <Text style={styles.whiteColor}>
               Ozone Charts
            </Text>
        </View>
        <LineChart 
            data={{
                labels : [timestamps],
                // labels :  ["Januari", "February"],
                datasets: [
                    {
                        data:ozone
                        // data:[43,84]
                    }
                ]
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel=""
            yAxisSuffix=''
            yAxisInterval={1}
            chartConfig={{
                backgroundColor:"#ECBE13",
                backgroundGradientFrom:"#ECBE13",
                backgroundGradientTo: "#ECBE13",
                decimalPlaces: 2,
                color:(opacity = 1) => `rgba(255,255,255, ${opacity})`,
                labelColor:(opacity = 1) => `rgba(255,255,255,${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots:{
                    r: "6",
                    strokeWidth: "2",
                    stroke:'#ffa726'
                }
            }}
            bezier
            style={{
                marginVertical:8,
                borderRadius:16
            }}
        />

<View>
            <Text style={styles.whiteColor}>
                Particulate Matter (PM10) Charts
            </Text>
        </View>
        <LineChart 
            data={{
                labels : [timestamps],
                // labels :  ["Januari", "February"],
                datasets: [
                    {
                        data:pm10
                        // data:[2,90]
                    }
                ]
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel=""
            yAxisSuffix=''
            yAxisInterval={1}
            chartConfig={{
                backgroundColor:"#3A111C",
                backgroundGradientFrom:"#3A111C",
                backgroundGradientTo: "#3A111C",
                decimalPlaces: 2,
                color:(opacity = 1) => `rgba(255,255,255, ${opacity})`,
                labelColor:(opacity = 1) => `rgba(255,255,255,${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots:{
                    r: "6",
                    strokeWidth: "2",
                    stroke:'#ffa726'
                }
            }}
            bezier
            style={{
                marginVertical:8,
                borderRadius:16
            }}
        />

<View>
            <Text style={styles.whiteColor}>
                Particulate Matter (PM25) Charts
            </Text>
        </View>
        <LineChart 
            data={{
                labels : [timestamps],
                // labels :  ["Januari", "February"],
                datasets: [
                    {
                        data:pm25
                        // data:[10,10]
                    }
                ]
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel=""
            yAxisSuffix=''
            yAxisInterval={1}
            chartConfig={{
                backgroundColor:"#83988E",
                backgroundGradientFrom:"#83988E",
                backgroundGradientTo: "#83988E",
                decimalPlaces: 2,
                color:(opacity = 1) => `rgba(255,255,255, ${opacity})`,
                labelColor:(opacity = 1) => `rgba(255,255,255,${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots:{
                    r: "6",
                    strokeWidth: "2",
                    stroke:'#ffa726'
                }
            }}
            bezier
            style={{
                marginVertical:8,
                borderRadius:16
            }}
        />

<View>
            <Text style={styles.whiteColor}>
                Sulfur Dioxide (SO2) Charts
            </Text>
        </View>
        <LineChart 
            data={{
                labels : [timestamps],
                // labels :  ["Januari", "February"],
                datasets: [
                    {
                        data:so2
                        // data:[10,12]
                    }
                ]
            }}
            width={Dimensions.get("window").width}
            height={220}
            yAxisLabel=""
            yAxisSuffix=''
            yAxisInterval={1}
            chartConfig={{
                backgroundColor:"#574951",
                backgroundGradientFrom:"#574951",
                backgroundGradientTo: "#574951",
                decimalPlaces: 2,
                color:(opacity = 1) => `rgba(255,255,255, ${opacity})`,
                labelColor:(opacity = 1) => `rgba(255,255,255,${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots:{
                    r: "6",
                    strokeWidth: "2",
                    stroke:'#ffa726'
                }
            }}
            bezier
            style={{
                marginVertical:8,
                borderRadius:16
            }}
        />

      </ScrollView>
  );
};

export default Charts;

const styles = StyleSheet.create({
    whiteColor: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center',
      paddingBottom: 10
    }
  });

