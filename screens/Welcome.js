/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { storeAqd, storeRealtime, fetchRealTime, fetchLastRowData } from '../util/getPost';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from 'react-native-progress-step-bar';
import { color } from 'react-native-reanimated';
import LoadingOverlay from '../component/LoadingOverlay';
import { LineChart, BarChart } from 'react-native-chart-kit';




function Welcome() {

    const listTab = [
        {
            status: 'Charts'
        },
        {
            status: 'Advice'
        },
    ]

    const tabData = [
        {
            name: 'Messi',
            status: 'AQI Parameters'
        },
        {
            name: 'Kaka',
            status: 'Dashboard'
        },
    ]

    const [fetchData, setFetchData] = useState([]);
    const [realTimeData, setRealTimeData] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [textSevere,setSevere] = useState();
    const [pictureSevere, setPictureSevere] = useState()

    let severe;
    let picture;
    let last_data;

    useEffect(() => {
        const getRealTime = async () => {
            await fetchRealTime().then((res) => {
                last_data = res.filter(function(el, index){
                    return index >= res.length - 1;
                  })
                  setRealTimeData(last_data)
                setLoading(false);
            })
            .catch(err => console.log(err)) 
        }

        if (realTimeData.length < 1) {
            // console.log(realTimeData, "Kosong")
            // last_data = { timestamps: <ActivityIndicator size="small" color="#0000ff" />, countryCode: <ActivityIndicator size="small" color="#0000ff" />, aqi: <ActivityIndicator size="small" color="#0000ff" />, city: <ActivityIndicator size="small" color="#0000ff" />, }
            // setSevere(<ActivityIndicator size="small" color="#0000ff" />)
            // setPictureSevere(<ActivityIndicator size="small" color="#0000ff" />) 
            // return <LoadingOverlay message={`"Waiting for Loading Content from API..."`} />
            // severe = "Good"
            // picture = require("../assets/images/0-50.png")
        } else {
            // last_data = realTimeData[Object.keys(realTimeData)[Object.keys(realTimeData).length - 1]];
           
            // console.log(Object.keys(realTimeData)); 
            // console.log(last_data.timestamps)
            if (realTimeData[0].AQI <= 50) {
                setSevere("Good")
                //  setPictureSevere(require("../assets/images/0-50.png")) 
               
            } else if (realTimeData[0].AQI > 50 && realTimeData[0].AQI <= 100) {
                setSevere("Moderate")
                //  setPictureSevere(require("../assets/images/51-100.png")) 
            } else if (realTimeData[0].AQI > 100 && realTimeData[0].AQI <= 150) {
               setSevere("Unhealthy for Sensitive Groups")
                //  setPictureSevere(require("../assets/images/101-200.png")) 
            } else if (realTimeData[0].AQI > 150 && realTimeData[0].AQI <= 200) {
                setSevere("Unhealthy")
                //  setPictureSevere(require("../assets/images/101-200.png")) 
            } else if (realTimeData[0].AQI > 200 && realTimeData[0].AQI <= 300) {
                setSevere("Very UnHealthy")
                //  setPictureSevere(require("../assets/images/201-300.png")) 
            } else if (realTimeData[0].AQI > 300 && realTimeData[0].AQI <= 500) {
                setSevere("Hazadous")
                //  setPictureSevere(require("../assets/images/201-300.png")) 
            }
            // console.log("contents inside", last_data)
        }

        const intr = setInterval(() => {
            getRealTime();
        
        }, 60*1000)
        return () => clearInterval(intr)

       
    }, [])

    useEffect(() => {
        // storeRealtime();
    },[])

    // console.log("realtimedata", realTimeData)

    
    

   


  


    // const getFetchData = () => {
    //     const API = "https://api.ambeedata.com/latest/by-postal-code?postalCode=12110&countryCode=ID"
    //     fetch(API, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type" : "application/json",
    //             "x-api-key": "dccbdca1072e7695dedda8c6663c232bd1587b2235b850ac4e0d72a3b635de8d"
    //         }
    //     }).then(res=>{
    //         return res.json()
    //     }).then(res => {
    //         let dataFetch = res.stations
    //         // console.log(dataFetch)
    //         setFetchData(dataFetch)
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }
    
    // Tab Function

    // const [datalist, setDataList] = useState(tabData)
    // const [status, setStatus] = useState('Charts')
    // const setStatusFilter = status => {
    //     if (status != 'Health Advice') {
    //         setDataList([...tabData.filter(e => e.status === status)])
    //     } else {
    //         setDataList(tabData)
    //     }
    //     setStatus(status)
    // }

    // if(status === 'AQI Parameters'){
    //     return()
    // }

    // const renderItem = ({ item, index }) => {
    //     if (status === 'AQI Parameters') {
    //         content = <View>
    //             <View>
    //                 <Text>
    //                     {item.name}
    //                 </Text>
    //             </View>
    //             <View>
    //                 <Text>
    //                     {item.status}
    //                 </Text>
    //             </View>
    //         </View>
    //     } else {
    //         content =
    //             <View style={styles.contents2}>
    //                 <View>
    //                     <Text>
    //                         {item.name}
    //                     </Text>
    //                 </View>
    //                 <View>
    //                     <Text>
    //                         {item.status}
    //                     </Text>
    //                 </View>
    //             </View>
    //     }
    //     return (
    //         <View key={index}>
    //             <View style={styles.contents}>
    //                 <View style={styles.contents2}>
    //                     {content}
    //                 </View>

    //             </View>
    //         </View>
    //     )

    // }
    // console.log('loading', isLoading)
    if(isLoading){
        return (<LoadingOverlay message={"Reading Data..."} />)
    } else {    
    return (

        <ScrollView style={{backgroundColor: "#990100"}}>
            {/* <ImageBackground source={require("../assets/images/background-apps.png")} resizeMode="cover" > */}


            <View style={styles.updatedTop}>
                {/* {Object.keys(realTimeData).map(function(key){  */}
                {/* { {realTimeData[0].map((item, index) => { */}
                {/* return( */}
                <View>
                    <Text style={styles.textUpdatedTop}>Last Update : {realTimeData[0].datetime}</Text>
                    {/* <Text>Last Update : {realTimeData[Object.keys(realTimeData).at(-1)].timestamps}</Text> */}
                </View>
                {/* ) */}

                {/* })} */}

            </View>


            <View style={styles.location}>
                <View>
                    <Text style={styles.TextLocation}>
                        Country Code : {realTimeData[0].CountryCode}
                    </Text>
                    <Text style={styles.TextLocation2}>
                        {realTimeData[0].City}
                    </Text>
                </View>
                <View style={styles.loveButton}>
                    <Icon
                        title="Love this"
                        name='cards-heart-outline'
                        size={30}
                        color='#E8E8E8'
                    />

                </View>

            </View>

            <View style={styles.AirIndex}>
                <Text style={styles.TextIndex}>
                    AQI {realTimeData[0].City}
                </Text>
                <View style={styles.AirIndex2}>
                    <View>
                        <Text style={styles.TextIndex2}>
                            {realTimeData[0].AQI}
                            {/* 40 */}
                        </Text>
                    </View>
                    <View style={styles.imageAQI}>
                        <Image
                            source={pictureSevere}
                            style={{backgroundColor:"#990100", borderRadius: 10}}
                        />
                    </View>
                </View>
                <Text style={styles.TextIndex3}>
                    {textSevere}
                </Text>

            </View>

            {/* <View style={styles.progressBar}>
                    <ProgressBar
                        steps={6}
                        ranges={['0', '150', '400', '600', '800', '1000', '1200']}
                        width={325}
                        height={3}
                        // currentStep={currentStep}
                        // stepToStepAnimationDuration={1000}
                        withDots={false}
                    />
                </View> */}

            {/* <View style={styles.tabBar}>
                <View style={styles.tabList}>
                    {
                        listTab.map(e => (
                            <View >
                            <TouchableOpacity
                                style={[styles.btnTab, status === e.status && styles.btnTabActive]}
                                onPress={() => setStatusFilter(e.status)}
                            >
                                <Text style={styles.textTab}>{e.status}</Text>
                            </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            </View> */}

            <View style={styles.chartDashboard}>
                <BarChart
                    data={{
                        labels: ["AQI", "CO", "NO2", "Ozone", "PM10", "PM25", "SO2"],
                        datasets: [
                            {
                                data: [
                                    realTimeData[0].AQI,
                                    realTimeData[0].CO,
                                    realTimeData[0].NO2,
                                    realTimeData[0].Ozone,
                                    realTimeData[0].PM10,
                                    realTimeData[0].PM25,
                                    realTimeData[0].SO2,

                                ]
                            }
                        ]
                    }}
                    width={385}
                    height={220}
                    // yAxisLabel="$"
                    // yAxisSuffix='k'
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: "#333333",
                        backgroundGradientFrom: "#333333",
                        backgroundGradientTo: "#333333",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: '#ffa726'
                        }
                    }}
                    // bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>



            {/* <FlatList
                data={datalist}
                keyExtractor={(e, i) => i.toString()}
                renderItem={renderItem}
            /> */}

            {/* <View>
                {realTimeData.map((item, index) => {
                    return (
                        <View key={index}>
                            <View />
                            <View>
                                <Text>{item['aqi']} - Nilai CO</Text>
                            </View>
                        </View>
                    )
                })}
            </View> */}

            {/* <View>
            {Object.keys(realTimeData).map(function(key){
                    return (
                        <View key={realTimeData[key]}>
                            <View />
                                 <View>
                                <Text>{realTimeData[key].aqi} - Nilai AQI</Text>
                                <Text>{realTimeData[key].co} - Nilai CO</Text>
                            </View>
                        </View>
                    )
                })}
            </View> */}
            {/* </ImageBackground> */}
        </ScrollView>

    );
}
    
};

const styles = StyleSheet.create({
    updatedTop: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#B90504',
        padding: 20
    },
    textUpdatedTop: {
        color: "#ffffff"
    },

    location: {
        flex: 1,
        flexDirection: 'row',
        padding: 30,
        // backgroundColor: 'green',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    TextLocation: {
        marginLeft: -25,
        marginTop: -25,
        fontWeight: 'bold',
        
    },
    TextLocation2: {
        marginLeft: -25,
        marginTop: 0,
        fontWeight: 'light',
        fontSize: 12,
        height: 15,
    },
    loveButton: {
        marginRight: -25,
        marginTop: -25,
    },

    AirIndex: {
        flex: 1,
        flexDirection: 'column',
        padding: 50,
        backgroundColor: '#B90504',
        alignItems: 'flex-start',
    },
    AirIndex2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'flex-start'
        color:"#fffff"
 
    },
    TextIndex: {
        marginLeft: -45,
        marginTop: -45,
        fontWeight: 'bold',
        color:"#fffff"
    },
    TextIndex2: {
        marginLeft: 0,
        marginTop: 0,
        fontWeight: 'bold',
        fontSize: 70,
        // width: '75%'
    },
    TextIndex3: {
        marginLeft: 5,
        marginTop: 5,
        fontWeight: 'bold',
        alignItems: 'center',
        color: 'white',
    },
    imageAQI: {
        marginLeft: 100,
        width: 5,
        height: 5
    },

    progressBar: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        // backgroundColor: 'purple',
        // alignItems: 'flex-start',
        alignSelf: 'center',
        width: '100%'
    },

    tabBar: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        // backgroundColor: 'chocolate',
        // alignItems: 'flex-start',
        alignSelf: 'center',
        width: "100%",
        marginLeft: 100
    },
    tabList: {
        flex: 1,
        flexDirection: 'row',
        marginTop: -10
    },
    btnTab: {
        width: Dimensions.get('window').width / 3.5,
        flexDirection: 'row',
        alignContent: 'space-between',
        borderWidth: 0.5,
        borderColor: '#EBEBEB',
        padding: 10,
        justifyContent: 'center',
    },
    textTab: {
        // width:'30%'
        fontSize: 12,
    },
    btnTabActive: {
        backgroundColor: 'white'
    },

    contents: {
        padding: 100,
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'orange',

    },
    contents2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginStart: -50
    },

    chartDashboard: {

        marginStart: 5,
        marginEnd: 5,
       
    }


});

export default Welcome;
