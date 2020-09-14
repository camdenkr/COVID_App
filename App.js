import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import "firebase/auth";
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import COVID_Data from './COVID_Data';
import Admin from './Admin';
import Survey from './Survey'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Initialize Firebase

export const firebaseConfig = {
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


const Stack = createStackNavigator();
class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen
              name="LoginPage"
              component={LoginPage}
            />
          <Stack.Screen
              name="HomePage"
              component={HomePage}
            />
            <Stack.Screen
              name="COVID_Data"
              component={COVID_Data}
            />
            <Stack.Screen
              name="Admin"
              component={Admin}
            />
            <Stack.Screen
              name="Survey"
              component={Survey}
            />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;