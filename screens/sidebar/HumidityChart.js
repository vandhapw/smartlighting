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

import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

import { fetchSensorAPI } from '../../util/getPost';

import SelectDropdown from 'react-native-select-dropdown'
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const ddl = ["-- Choose one of this Option --","Humidity", "Temperature", "Dust"]

function HumidityChart(){

  
    const [selectedItem, setSelectedItem] = useState();
    const [textSelected, setTextSelected] = useState();
    const [isLoading, setLoading] = useState(true);

    const [sensorData, setSensorData] = useState([])
    
    let last10Date = []
    let last10Sensor = []
    let last10Hum = []
    let last10Temp = []
    let last10Dust = []
   
    const [chartData,setChartData] = useState({
        labels: ["x1","x2","x3","x4","x5",],
        datasets: [
         {
           data:[12,45,67,89,12],
           color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
           strokeWidth: 2
         }
        ],
        // legend: ["Moisture Values"]
       })

       useEffect(() => {
        async function getDataApi(){
          await fetch('https://vpw.my.id/microcontroller/sensorData.json')
          //await fetch('https://api.waqi.info/feed/here/?token=71fd05aec3047c1be05e19c77f1a5fa911be8c3a')
          .then(response => response.json())
          .then(data => {
              let tenData = data.filter(function(el, index){
                  return index >= data.length - 5; // default 10
                })
              tenData.map((value) => {
                  let x = value.datetime.split("-")
                  let y = x[2].split(":")
                  let z = x[1]+"/"+y[0]+":"+y[1]+" "
               
                  last10Date.push(z)
                  last10Hum.push(value.humidity)
                  last10Temp.push(value.temperature)
                  last10Dust.push(value.dustDensity)
              })

              // console.log("selected item", selectedItem)
              
              
              if(selectedItem == 1){ // 1 for humidity, 2 for temperature and 3 for dust density
                setTextSelected("Humidity")
                setLoading(false)
                setChartData({
                  ...chartData,
                  labels: last10Date,
                  datasets:[
                      {
                          ...chartData.datasets[0],
                          data: last10Hum
                      }
                  ]
              })
              }else if (selectedItem == 2){ // temperature data
                setTextSelected("Temperature")
                setLoading(false)
                setChartData({
                  ...chartData,
                  labels: last10Date,
                  datasets:[
                      {
                          ...chartData.datasets[0],
                          data: last10Temp
                      }
                  ]
              })
              }
              else if (selectedItem == 3) {
                setTextSelected("Dust Density")
                setLoading(false)
                setChartData({
                  ...chartData,
                  labels: last10Date,
                  datasets:[
                      {
                          ...chartData.datasets[0],
                          data: last10Dust
                      }
                  ]
              })
              }else {
                setTextSelected("Humidity")
                setSelectedItem(1)
                setLoading(false)
                setChartData({                  
                  ...chartData,
                  labels: last10Date,
                  datasets:[
                      {
                          ...chartData.datasets[0],
                          data: last10Hum
                      }
                  ]
              })
              }
         
  
         
       
          //   console.log("Data APIs",)
          })
          .catch(err => { console.log(err) })
      }

      // other function
       // logic to get new data
    var getData = async function() {
      await fetch('https://vpw.my.id/microcontroller/sensorData.json')
            //await fetch('https://api.waqi.info/feed/here/?token=71fd05aec3047c1be05e19c77f1a5fa911be8c3a')
            .then(response => response.json())
            .then(data => {
              let last_data = data[Object.keys(data).length-1];
              let x = last_data.datetime.split("-")
              let y = x[2].split(":")
              let z = x[1]+"-"+y[0]+":"+y[1]+" "
              last10Date.push(z);
              last10Hum.push(last_data.humidity)// setTimeout(last10Date.push(last_data.datetime), 1000)
              last10Temp.push(last_data.temperature)// setTimeout(last10Date.push(last_data.datetime), 1000)
              last10Dust.push(last_data.dustDensity)// setTimeout(last10Date.push(last_data.datetime), 1000)
                               
              if(selectedItem == 1){
                if(last10Date.length >= 15){
                    last10Date.splice(0,5);
                    last10Hum.splice(0,5);
                    // console.log("overloaded!!!", last10Date.length);                
                }else {
                    // console.log("still save", last10Date.length);
                }
                setChartData({
                    ...chartData,
                    labels: last10Date,
                    datasets:[
                        {
                            ...chartData.datasets[0],
                            data: last10Hum
                        }
                    ]
                })
              }else if (selectedItem == 2){
                if(last10Date.length >= 15){
                    last10Date.splice(0,5);
                    last10Temp.splice(0,5);
                    // console.log("overloaded!!!", last10Date.length);                
                }else {
                    // console.log("still save", last10Date.length);
                }
                setChartData({
                    ...chartData,
                    labels: last10Date,
                    datasets:[
                        {
                            ...chartData.datasets[0],
                            data: last10Temp
                        }
                    ]
                })
              }
              else if (selectedItem == 3){
                if(last10Date.length >= 15){
                    last10Date.splice(0,5);
                    last10Dust.splice(0,5);
                    // console.log("overloaded!!!", last10Date.length);                
                }else {
                    // console.log("still save", last10Date.length);
                }
                setChartData({
                    ...chartData,
                    labels: last10Date,
                    datasets:[
                        {
                            ...chartData.datasets[0],
                            data: last10Dust
                        }
                    ]
                })
              }
              // console.log(last10Date, "1 new data")
      })
    };

      const ref = setInterval(() => {
        getDataApi()
        getData()
      }, 60*500)
      return () => {
              clearInterval(ref);
            };
  
       })

     

  

    // useEffect(() => {
    //     // getDataApi();   
    //     const intervals = setInterval(() => {
    //         console.log(last10Date, "data coming");
    //         getData();        
    //     }, 60*1000);
    //     return () => clearInterval(intervals)
    //     // setChartData({
    //     //     ...chartData,
    //     //     //labels: days,
    //     //     labels: ["Jan", "Feb", "Mar"],
    //     //     datasets:[
    //     //         {
    //     //             ...chartData.datasets[0],
    //     //             // data: values
    //     //             data: ["10", "11", "12"]
    //     //         }
    //     //     ]
    //     // })
    //     //getSensorData();
    //     // setTimeout(getSensorData, 1000)
    //   }, [])

    // const getSensorData = async () => {
    //     await fetchSensorAPI().then((res) => {
    //         setSensorData(res)
    //     })
    // }
   
    
   
      
   
  return (
   
      <ScrollView style={{backgroundColor: "#ffffff"}} >

      <View style={{paddingStart: 100, paddingTop: 10, backgroundColor: '#F6F6F6', paddingBottom: 10}}>
      <SelectDropdown
        data={ddl}
          onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
          setSelectedItem(index)
          setTextSelected(selectedItem)
          setLoading(true)
       
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
      </View>

        <View>
        <Text style={styles.whiteColor}>
          {/* {waiting} {loading} */}
        </Text>
        
        </View>
        
        <View>
        {isLoading ? 
            <Text style={styles.whiteColor}>
              Loading data...
            </Text>
            :
            <Text style={styles.whiteColor}>
               {textSelected} (updated per minute)
            </Text>
        }
        </View>
        
      {isLoading ? <ActivityIndicator size="large" color="#2A3990" style={styles.loadingView} />  :
      <View >
        <LineChart
          data={
            chartData
          }
          // width={Dimensions.get("window").width} // from react-native
    width={380}      
    height={220}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#13005A",
      backgroundGradientFrom: "#1C82AD",
      backgroundGradientTo: "#00337C",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#00204A"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
      paddingStart: 5,
      paddingLeft: 2
    }}
        />
        </View>
        }

      {isLoading ? <ActivityIndicator size="large" color="#2A3990" /> : 

        <View>
          <BarChart 
             style={{ borderRadius: 16, paddingStart: 5, paddingEnd: 5}}
             data={
              chartData
            }
             width={380}
             height={220}
             yAxisLabel=""
             chartConfig={{
              backgroundColor: "#1C315E",
              backgroundGradientFrom: "#227C70",
              backgroundGradientTo: "#88A47C",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#00204A"
              }
            }}
             verticalLabelRotation={30}
          />
        </View>
        }

      </ScrollView>
  );
};

export default HumidityChart;

const styles = StyleSheet.create({
    whiteColor: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center',
      paddingBottom: 10
    },

    loadingView: {
      flex: 1,
      justifyContent: 'center'
    }
  });

