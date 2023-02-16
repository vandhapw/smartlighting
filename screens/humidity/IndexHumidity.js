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
  ActivityIndicator,
  Image
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HumidityChart from './HumidityChart';
import HumidityData from './HumidityData';



function IndexHumidity(){

  const Tab = createMaterialTopTabNavigator();

    return (
     <Tab.Navigator>
        <Tab.Screen name='Humidity Data' component={HumidityData} />
        <Tab.Screen name='Chart' component={HumidityChart} />
     </Tab.Navigator>
     
    )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default IndexHumidity;
