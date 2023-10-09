import React, {useRef, useState, useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, Pressable, SafeAreaView,ScrollView } from 'react-native'
import {Card, Button, TextInput} from 'react-native-paper'
import {images, icons, COLORS, FONTS, SIZES} from '../../../constants'
import BottomSheet from 'react-native-gesture-bottom-sheet'
import { useRoute } from '@react-navigation/native'
import Header from './Header'
import RoomList from './RoomList'

const TimeSetting = ({route, navigation}) => {
    
    const {hueLight,satLight,briLight, initialState,status, tempId, device, location} = route.params
    
    dataValue = {briLight,satLight,hueLight, initialState,status,tempId, device, location}

    // console.log('time setting ', dataValue)
    
    return (
      // <ScrollView>
        <View style={styles.container}>
             <Header navigation={navigation} />
             <RoomList navigation={navigation} timeSettingData={dataValue}/>
        </View>
        // </ScrollView>
    )
}
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: COLORS.white,
     },
     
   });
export default TimeSetting