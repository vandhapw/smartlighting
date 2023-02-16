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
  Animated,
  FlatList
} from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { menuBackend } from '../../util/MenuBackend';
import { Card, Checkbox } from 'react-native-paper';

import { COLORS, FONTS, icons, SIZES } from '../../constants';


const Tab = createMaterialTopTabNavigator();

function BackEndMenu(){

    const [listMenu, setListMenu] = useState()
    const [isLoading, setLoading] = useState(true)
    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState([]);
     


    const getBackendMenu = async() => {
        await menuBackend()
        .then((val) => {
            setListMenu(val)
            setLoading(false)
        })
    }

    const onSelect = (value, isSelected) => {
        if (!isSelected) {
          const selectedIndex = selected.indexOf(value);
          const newSelectedItems = [...selected];
          newSelectedItems.splice(selectedIndex, 1);
          setSelected(newSelectedItems);
        } else {
          setSelected([...selected, value]);
        }
    }
       
    const onActivateMenu = (id) => {
        let arrayMenu = [];
    
        arrayMenu.append(id)
        setChecked(!checked)
        setSelected({arrayMenu})
        console.log(arrayMenu)
    }

    const Item = ({item}) => (
        <Card title={"Menu Data"} style={[styles.shadow,{marginBottom: '2%'}]}>
        <View style={[styles.cardList]}>
        <View style={{paddingStart: 15, justifyContent:'center', alignItems:'center'}}>
        <Checkbox
        label={"activate the menu"}
      status={selected.includes(item.menu_id) ? "checked" : "unchecked"}
      onPress={() => {
        // onActivateMenu(item.menu_id)
        onSelect(item.menu_id, !selected.includes(item.menu_id));
      }}
    />
    <Text style={{fontSize: 10}}>activate / non-activate menu</Text>
        </View>  
          <View>
          <Text style={[styles.title, {paddingTop:2, fontWeight:'bold', width:'100%', paddingHorizontal: 40}]}>{item.menu_name}</Text>
          </View>
          <View>
        </View>
    </View>
       
        </Card>
      );

      useEffect(() => {
        getBackendMenu();
        
       }, [selected])
    

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
         List of Menu
       </Text>
       </View>
     </View>
   {isLoading ? <ActivityIndicator size="large" /> : 
     
       <FlatList 
         data={listMenu}
         keyExtractor={(item, index) => {
           return item.menu_id;
         }}
         renderItem={Item}
       />

     
   }

      {/* // bottom Sheet */}
 </SafeAreaView>
   
  )
}

export default BackEndMenu;

const styles = StyleSheet.create({
    cardList :{
        padding: 20,
        flex: 1,
        flexDirection:'row',
        maxHeight:75
      },
    
  });

