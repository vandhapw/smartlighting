import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'

const LightStatus = ({data, navigation}) => {

    const { lightid, roomName, lightStatus, lightBri, lightCT, lightHue, reachable, lightSat } = data;
    const styles = getStyles();
    let label;

    if (lightStatus){
      label = "ON"
    }else {
      label = "OFF"
    }

    return (
        <>
        <View style={styles.energyCard}>
            <Text style={styles.energyTitle}>Current State {label}</Text>
            <Text style={styles.energyValue}>Room Name : {roomName}</Text>
            {/* <Text style={styles.energyValue}>Color Temperature : {lightCT}</Text> */}
      </View>  
        </>
    )
}

const getStyles = ()  => StyleSheet.create({
    
    energyCard: {
      backgroundColor:'#F7F5F2',
      // padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginStart: 125,
      marginTop:105,
      position:'absolute'
    },
   });

export default LightStatus;