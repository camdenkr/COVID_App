import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as firebase from 'firebase';
import "firebase/auth";



class Admin extends React.Component {

  render() {
    return (
      <View style={styles.homestyle} >
        <Text style={styles.title}>Welcome to COVID Tracker!</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    homestyle: {
      flex: 1,
      backgroundColor: '#ffff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  
export default Admin;


//<MUIButton style={{ "min-height": "56px", width: "0%" }} raised primary text = "Hello There" size = "small"/>
