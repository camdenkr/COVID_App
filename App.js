import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import "firebase/auth";
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBtpGx1Xx309_yWUvypMwkpb4pe6B0uFAM",
    authDomain: "covid-app-9ad6b.firebaseapp.com",
    databaseURL: "https://covid-app-9ad6b.firebaseio.com",
    projectId: "covid-app-9ad6b",
    storageBucket: "covid-app-9ad6b.appspot.com",
    messagingSenderId: "1062995578058",
    appId: "1:1062995578058:web:f6cf237c17b7830a1e3833",
    measurementId: "G-91ZSC3H517"
};

firebase.initializeApp(firebaseConfig);



export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
