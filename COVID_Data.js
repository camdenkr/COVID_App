import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';


const styles = StyleSheet.create({
  homestyle: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class COVID_Data extends React.Component {
  
  render() {
    return (
      <View style={styles.homestyle} >
        <Text>This is COVID Data</Text>
      </View>
    );
  }
}

export default COVID_Data;