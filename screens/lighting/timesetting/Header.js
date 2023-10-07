import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import {images, icons, COLORS, FONTS, SIZES} from '../../../constants';
import { createDrawerNavigator } from '@react-navigation/drawer';

const IconLabel = ({icon, label}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          source={icon}
          resizeMode="cover"
          style={{
            width: 20,
            height: 20,
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

const Header = ({navigation}) => {

  const [styleSwitch, setStyleSwitch] = useState();
  const styles = getStyles(styleSwitch);
  const Drawer = createDrawerNavigator();


return (
    <>
       {/* Title and Temperature */}
       <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=> navigation.openDrawer()}>
            <View style={{position:'absolute'}}>
             <IconLabel icon={icons.barMenu} label="" />        
            </View>  
        </TouchableOpacity>          
            <Text style={[styles.title]}>Time Settings</Text>
            <Text style={styles.temperature}></Text>
        </View>
    </>  
)

}

const getStyles = (bgColor)  => StyleSheet.create({
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 10,
      // marginTop:10
    },
    temperature: {
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 10,
    },
    
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',  // Optional: If you want them to align vertically in the center
      marginVertical: 10,
    },
  });

export default Header