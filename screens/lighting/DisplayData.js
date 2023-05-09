/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef} from 'react';
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
  Image,
  FlatList,
  Switch,
  ToastAndroid,
  Pressable,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { getSensorValue, getSwitchValue, sendDataMobile } from '../../util/getPost';
import { Card } from 'react-native-paper';

import { COLORS, FONTS, icons, SIZES } from '../../constants';

import { getLightingData } from '../../util/getPost';

const IconLabel = ({icon, label}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={icon}
        resizeMode="cover"
        style={{
          width: 50,
          height: 50,
        }}
      />
      <Text style={{marginTop: SIZES.padding, color: COLORS.gray, ...FONTS.h3}}>
        {label}
      </Text>
    </View>
  );
};

function DisplayData(){

  const [dataDust, setDustData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [currentTemperature, setCurrentTemperature] = useState();
  const [currentHumidity, setCurrentHumidity] = useState();
  const [currentDust, setCurrentDust] = useState();
  const [currentLighting, setCurrentLighting] = useState();
  const [isPage, setPage] = useState(1);
  const [initialData, setInitialData] = useState(11);
  const [lastData, setLastData] = useState();
  const [indexValue, setIndexValue] = useState();
  const [isEnabled, setIsEnabled] = useState(isEnabled);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    // console.log(isEnabled, " toggle");
    if(isEnabled){
      onoffStatus(currentHumidity, currentTemperature, 0, currentLighting);
    }else {
      onoffStatus(currentHumidity, currentTemperature, 1, currentLighting);
    }
  }

  // const styles = getStyles(isColor);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getDustData()
    }, 2000);
  }, []);


  let last10Data = []
  let dustValue;
  let dustIndex={};
  

  const getDustData = async () => {
    await getLightingData()
    .then ((res) => {
      let tenData = res.filter(function(el,index){
        setLastData(res.length)
        return index >= res.length - initialData; // default 10
      })
    
        setDustData(tenData)
        setLoading(false)
       
        last10Data = []

        // console.log(tenData)
       })
      //  last10Data = []
    .catch((err) => console.log(err))
    // last10Data = [];
  }


  const previousPage = () => {
    setLoading(true)
    setInitialData(initialData - 10)
    setPage(isPage - 1);
    getDustData()
  }

  const nextPage = () => {
    setLoading(true)
    setPage(isPage + 1)
    setInitialData(initialData + 10)
    getDustData()
  }

  
  

  const Item = ({item}) => (
    <Card title={"Dust Data"} style={[styles.shadow,{marginBottom: '3%'}]}>
    <View style={[styles.cardList]}>
      <View>
      <IconLabel icon={icons.lightingIcon} label={""} />
      </View>
      <View>
      <Text style={[styles.title,{color:'#060047'}]}>Lighting Value : </Text>
      <Text style={styles.smallText}>On : {item.datetime}</Text>
      <Text style={styles.smallText}>Coordinate : {item.coordinate}</Text>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View>
        <Text style={styles.smallText}> - Room : {item.room != null ? item.room : "null"}</Text>
        </View>
        <View  style={{paddingLeft: 25}}>
        <Text style={styles.smallText}> - Number of people : {item.room != null ? item.room : "null"}</Text>
        </View>
      </View>
      <Text style={styles.smallText}>Behaviour : {item.saveCategory}</Text>
      <Text style={styles.smallText}>AmbientLight : {item.ambientLight}</Text>
      </View>
      <View style={{marginLeft: -100}}>
      <Text style={[styles.score,{color:'#060047', marginRight: -20}]}>{item.lightingValue}</Text>
    </View>
    <View style={{ width: '30%', marginLeft: 50}}>
      <Text style={[styles.index, {color: '#000000'}]}>Level {item.lightingLevel}</Text>
    </View>
    </View>   
    </Card>
  );


  useEffect(() => {
    getDustData();
    // console.log(dataDust)
   }, [initialData])

  // console.log(temperatureData)
   
  return (
    <SafeAreaView style={styles.container}>
       {/* Header */}
       <View>
          
          <View
            style={[
              {
                // position: 'absolute',
                // bottom: '20%',
                left: '5%',
                right: '5%',
                borderRadius: 15,
                padding: 2,
                // alignItems:'center',
                backgroundColor: COLORS.white,
                marginBottom: 10,
                marginEnd: 40,
                marginTop: 10
              },
              styles.shadow,
            ]}>
              <Text style={{...FONTS.h2, textAlign: 'center', paddingTop: 10, color:'#000000', fontWeight:'bold', textDecorationLine:'underline'}}>
            Lighting Data
          </Text>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginHorizontal: SIZES.radius,
                  justifyContent: 'space-around',
                }}>
              </View>
              <View
                style={{
                  marginHorizontal: SIZES.radius,
                  marginStart: 20,
                  justifyContent: 'space-around',
                }}>
              </View>
            </View>
          </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
        {isPage != 1 ? 
          <TouchableOpacity style={{marginEnd:'10%'}} onPress={() => previousPage()}>
          <Text style={{color:'#060047'}}> Previous</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={{marginEnd:'10%'}} disabled={true}>
          <Text style={{color: '#DDDDDD'}}> Previous</Text>
        </TouchableOpacity>
        }        
        <Text style={{color:'#060047'}}>Page {isPage}</Text>
        {(lastData - isPage) >= 10 ? 
        <TouchableOpacity  style={{marginStart:'10%'}} onPress={() => nextPage()}>
          <Text style={{color:'#060047'}}>Next</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity  style={{marginStart:'10%'}} disabled={true}>
          <Text style={{color: '#DDDDDD'}}>Next</Text>
        </TouchableOpacity>
        }
        </View>
        
      {isLoading ? <ActivityIndicator size="large" /> : 
        
          <FlatList 
            data={dataDust}
            keyExtractor={(item, index) => {
              return item.timestamps;
            }}
            renderItem={Item}
            refreshControl={  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
          />

        
      }

        
        
    </SafeAreaView>
  );
};

const styles=StyleSheet.create({
  container :{
    // flex: 1
    // width: '100%'
  },

  titleText:{
    fontSize: 16,
    fontWeight:'bold',
    textAlign:'center',
    padding: 20,
    color: '#000000',
    marginStart: '5%'
    // fontFamily:'Times'
  },

  cardList :{
    padding: 20,
    flex: 1,
    flexDirection:'row',
    maxHeight:130
  },

  score: {
    // padding: 10,
    fontSize: 14,
    fontWeight:'bold',
    // width:'100%',
    // backgroundColor: 'yellow',
    textAlign:'center',
  },

  index:{
    padding: 5,
    fontSize: 12,
    fontWeight:'bold',
    // paddingStart:20,
    // marginEnd:'10%',
    // backgroundColor:isColor,
    color:'#ffffff',
    borderRadius: 10,
    textAlign:'center',
  },

  smallText:{
    fontSize: 10,
    color: 'gray'
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

});

export default DisplayData;
