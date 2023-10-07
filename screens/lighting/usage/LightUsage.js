import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, Pressable, ScrollView } from 'react-native'
import {images, icons, COLORS, FONTS, SIZES} from '../../../constants'
import Header from './Header'
import RoomList from './RoomList'

const LightUsage = ({route, navigation}) => {
      
    return (
        <View style={styles.container}>
             <Header navigation={navigation} />
             <RoomList navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    
  });

export default LightUsage