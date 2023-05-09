import { View, Modal, StyleSheet, ActivityIndicator,Text } from "react-native"
import * as React from 'react'

function ModalLoading({ message }) {
  return (
        <Modal
                transparent={true}
                animationType={'none'}
                visible={message}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={message} />
                        <Text style={{fontSize: 16, fontWeight:'bold'}}>Loading...</Text>
                    </View>
                </View>
                </Modal>
  );
}

export default ModalLoading;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    color: '#000'
  },

  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
});
