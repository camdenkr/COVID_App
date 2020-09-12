import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import "firebase/auth";


const styles = StyleSheet.create({
  homestyle: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class HomePage extends React.Component {
  
  render() {
    return (
      <View style={styles.homestyle} >
        <Text>Welcome to COVID Tracker!</Text>
        <Button
          title="Sign Out"
          onPress={
            () => {
            firebase.auth().signOut();
            this.props.navigation.replace('LoginPage');
          }
          }
        />
        <Button
          title="See COVID Data"
          onPress={
            () => {
            firebase.auth().signOut();
            this.props.navigation.navigate('COVID_Data');
          }
          }
        />
      </View>
    );
  }
}

export default HomePage;