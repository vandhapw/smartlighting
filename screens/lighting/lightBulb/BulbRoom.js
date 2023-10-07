import React, { } from 'react';
import { View, StyleSheet, SafeAreaView} from 'react-native';
import LightAnimation from './LightAnimation';
import HeaderLight from './Header';
import LightLevel from './LightLevel';
import LevelOption from './LevelOption';
import LightStatus from './LightStatus';
import { ScrollView } from 'react-native-gesture-handler';




const BulbRoom = ({route, navigation}) => {
  
  // let status = 0
  const { lightid, roomName, lightStatus, lightBri, lightCT, lightHue, reachable, lightSat,status, location, device, menu, timer ,tempId } = route.params;
  const styles = getStyles();
  const data = {
    lightid, roomName, lightStatus, lightBri, lightCT, lightHue, reachable, lightSat, status, location, device, menu, timer ,tempId }
  
    console.log('bulb', data)



  return (
   <>
    <HeaderLight navigation={navigation} />

      <LightAnimation data={data} navigation={navigation} />
     
      {/* <LightLevel data={data} />       */}

      {/* <LevelOption navigation={navigation}/> */}

      <LightStatus navigation={navigation} data={data} />
      
      <View style={styles.footer}>
        {/* Footer icons here */}
      </View>
    </>
  );
};

const getStyles = ()  => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF5',
  },
 });

export default BulbRoom;