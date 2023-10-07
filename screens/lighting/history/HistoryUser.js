import React from 'react'
import { View, StyleSheet } from 'react-native'
import HistoryData from './HistoryData'
import {images, COLORS} from '../../../constants'

const HistoryUser = ({route, navigation}) => {
    return (
        <View style={styles.container}>
             <HistoryData navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    
  });

export default HistoryUser