/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect,useRef} from 'react';
import {
    Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  Animated
} from 'react-native';

import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';

import { getSensorValue } from '../util/getPost';
import LoadingOverlay from '../component/LoadingOverlay';

import { useNavigation } from '@react-navigation/native';

function Dashboard(){

  const [currentDateNow, setDateNow] = useState("")
  const [latestData, setLatestData] = useState("")
  const [isLoading, setLoading] = useState(false)

  let randomData = []
  let newData = []
  

  const navigation = useNavigation();

  const getSensor = async () => {
        await getSensorValue()
        .then((response) => {
          newData = response.filter(function(el, index){
            return index >= response.length - 1;
          })
          // console.log("main Screen ", newData)
          randomData.push([newData[0].humidity.toFixed(2), "Humidity"])
          randomData.push([newData[0].temperature.toFixed(2), "Temperature"])
          randomData.push([newData[0].dustDensity.toFixed(2), "Dust Density"])
          
          let val = randomData[Math.floor(Math.random()*randomData.length)];
          setLatestData(val);
          setLoading(true);
         
          
        //   return json.movies;
        // console.log(val, "value")
        })
        .catch((err) => console.log(err))

      }

      // console.log("value", latestData)
  

  useEffect(() => {
    getNewDate();
    const ref = setInterval(() => {
      getSensor();
    }, 60000);
    () => clearInterval(ref);
    // randomValue();
  },[])

  const getNewDate = (() =>{
    date = new Date().getDate();
    month = new Date().getMonth();
    year = new Date().getFullYear();
    day = new Date().getDay();
    dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    stringDay = dayArray[day]
    stringMonth = monthArray[month]
    fullDate = stringDay+ ", "+date+ " "+stringMonth+ " "+year;
    setDateNow(fullDate)
    // console.log(fullDate);
  });

  
  // console.log("loading ", isLoading, " and ", "latestData ", latestData)
  

  //create function to get data sensor
  // const getSensorData = async () => {
  //   await fetch('https://vpw.my.id/microcontroller/sensorData.json')
  //   //await fetch('https://api.waqi.info/feed/here/?token=71fd05aec3047c1be05e19c77f1a5fa911be8c3a')
  //   .then(response => response.json())
  //   .then(data => {
  //       // latestData = data.filter(function(el, index){
  //       //     return index >= data.length - 1;
  //       //   })
  //       console.log("Data APIs", data)
  //   })
  //   .catch(err => { console.log(err) })
  // }

  // const getCurrentRandomValue = (() => {
  //   temp = [

  //   ]
  // }) 


 
  //call function
  // getNewDate();

   if(isLoading){
  return (
   
      <ScrollView style={{backgroundColor: "#EFECE2"}} >
        {/* <View style={{padding: 10}}>
            <Text style={styles.MainColor}>
                Welcome to Klaen Apps
            </Text>
        </View> */}
        <View style={styles.mainView}>
          <View style={styles.randomMainValue}>
          <Pressable style={styles.pressableButton}>        
            <Card style={styles.cardMainValue}>
              <Text style={[styles.textMainValue, {paddingTop:20}]}>{currentDateNow}</Text>
              <Icon 
                name="air"
                style={[{fontSize: 50, marginTop: 100},styles.textMainValue]}
              />
              <Text style={[styles.textMainValue, {fontSize:60}]}>{latestData[0]}</Text>
              <Text style={[styles.textMainValue,{fontSize:20, paddingBottom: 100}]}>{latestData[1]}</Text>
              <Text style={[styles.textMainValue, {}]}>Latest Air Quality Data</Text>
            </Card>
            </Pressable>
          </View>
          
          <View style={styles.secondView}>
          <View style={styles.chartView}>
            <Pressable onPress={() => navigation.navigate("Charts") } style={styles.pressableButton}>
            <Card style={[styles.cardChart]}>
              <Text style={[styles.textChart,{fontSize:60, paddingTop:40, paddingBottom:50}]}>3</Text>
              <Text style={[styles.textChart]}>All Charts</Text>
            </Card>
            </Pressable>
          </View>
          <View style={styles.controlView}>
            <Pressable onPress={() => navigation.navigate("Control")} style={styles.pressableButton}>
            <Card style={[styles.cardControl, {paddingTop: 55}]}>
              <Icon 
                name="switch"
                style={[{fontSize: 60, paddingBottom:60}, styles.textcontrol]}
              />
              <Text style={[styles.textcontrol]}>Controls Device</Text>
            </Card>
            </Pressable>
          </View>
          </View>
        </View>
        <View style={styles.thirdView}>
          <View style={styles.articleView}>
            <Pressable onPress={() => navigation.navigate("Articles")} style={styles.pressableButton}>
            <Card style={[styles.cardArticle]}>
              <Icon 
              name="open-book"
              style={[{fontSize: 80, paddingTop:80, paddingBottom:80}, styles.textArticle]}
              />
              <Text style={[styles.textArticle, {paddingBottom:10}]}>Articles</Text>
            </Card>
            </Pressable>
          </View>
          <View style={styles.aqiView}>
            <Pressable onPress={() => navigation.navigate("Air Quality")} style={styles.pressableButton}>
            <Card style={[styles.cardAqi]}>
              <Icon 
                name = "cloud"
                style={[{fontSize: 80, paddingTop:80, paddingBottom:80}, styles.textAqi]}
              />
              <Text style={[styles.textAqi, {paddingBottom:10}]}>Air Quality</Text>
            </Card>
            </Pressable>
          </View>
          </View>
      </ScrollView>
  );
  } else {
    return (
      <LoadingOverlay message={"Reading Data...."} />
    )
    
  }
};

export default Dashboard;

const styles = StyleSheet.create({
    MainColor: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 12,
      paddingBottom: 5,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      textTransform: 'uppercase'
    },

    mainView: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: 10
    },
    secondView: {
      flex: 1,
      flexDirection: 'column'
    },
    thirdView: {
      flex: 1,
      flexDirection: 'row',
    },

    randomMainValue: {
      padding: 10,
      paddingStart: 5,
      // backgroundColor: 'yellow',
      maxWidth: '50%',
      width: '100%',
      maxHeight: '100%'
    },
    cardMainValue:{
      backgroundColor: '#7D0000',
      maxWidth: '100%',
      alignItems: 'center',
      paddingBottom: 20
    },
    textMainValue:{
      color: '#ffffff',
      textAlign: 'center'
    },

    secondView: {
      padding: 10,
      paddingStart: 0,
      paddingRight:5,
      // backgroundColor: 'yellow',
      maxWidth: '50%',
      width: '100%',
      maxHeight: '100%'
    },
    chartView: {
      maxWidth: '100%',
      maxHeight: '50%',
    },
    cardChart: {
      backgroundColor: '#344D6C',
      paddingTop:5,
      paddingBottom: '10%'
    },
    textChart: {
      color: '#ffffff',
      textAlign: 'center'
    }, 

    controlView: {
      // backgroundColor: 'blue',
      maxHeight: '50%',
      paddingTop: 10,
    },
    cardControl: {
      backgroundColor: '#4B4545',
      paddingBottom:'10%'
    },
    textcontrol: {
      color: '#ffffff',
      textAlign: 'center'
    },

    articleView: {
      padding: 0,
      paddingStart: 5,
      // backgroundColor: 'yellow',
      maxWidth: '48%',
      width: '100%',
      maxHeight: '100%'
    },
    cardArticle: {
      backgroundColor: '#372650',
     
    },
    textArticle:{
      color: '#ffffff',
      textAlign: 'center'

    },

    aqiView: {
      padding: 0,
      paddingEnd: 5,
      paddingStart:10,
      // backgroundColor: 'yellow',
      maxWidth: '52%',
      width: '100%',
      maxHeight: '100%'
    },
    cardAqi: {
      backgroundColor: '#9B3321'
    },
    textAqi: {
      color: '#ffffff',
      textAlign: 'center'
    },

    pressableButton:{
      position: 'relative',
      top:0,
      left:0
    }
  });

