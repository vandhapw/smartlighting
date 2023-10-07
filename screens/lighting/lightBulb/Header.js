import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {images, icons, COLORS, FONTS, SIZES} from '../../../constants';

const IconLabel = ({icon, label}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={icon}
        resizeMode="cover"
        style={{
          width: 20,
          height: 20,
          tintColor:'#482121'
          // position:'absolute',
          // marginStart: 150
        }}
      />
      <Text style={{marginTop: SIZES.padding, color: COLORS.gray, ...FONTS.h3}}>
        {label}
      </Text>
    </View>
  );
};

const HeaderLight = ({navigation}) => {
    const styles = getStyles();

    return (
      <>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <View style={{}}>
             <IconLabel icon={icons.barMenu} label="" />        
            </View> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Text style={styles.backArrow}>←</Text>   
        </TouchableOpacity>    
        <Text style={styles.title}>Back</Text>
       
      </View>
      </>
    )
}

const getStyles = ()  => StyleSheet.create({
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 30,
    },
    backArrow: {
      fontSize: 32,
      color: '#482121',
      marginRight: 5,
      marginTop: 20,
      marginStart: -30
    },
    title: {
      fontSize: 24,
      color: '#482121',
      marginTop: 30
    },
 });
  


export default HeaderLight