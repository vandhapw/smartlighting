import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';

function LoadingOverlay({ message }) {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.rootContainer]}>
      <Text style={styles.message}>{message}</Text>
       <ActivityIndicator size="large" /> 
      {/* <Image source={require('../assets/images/loading-unscreen.gif')} style={{width:100,height:100}} /> */}
      {/* <LottieView source={require('../assets/images/animationLoading.json')} autoPlay loop/> */}
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex:1,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    color: '#000'
  },
});
