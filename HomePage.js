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
  componentDidMount() {
    this.checkIfLoggedIn();
}

checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
        function (user) {
            if (user) {
                this.props.navigation.navigate('HomePage');
            }
            else {
                this.props.navigation.navigate('LoginPage');
            }
        }.bind(this)
    );
};  
  
  render() {
        return (
          <View style={styles.homestyle} > 
            <Text>Welcome to COVID Tracker!</Text>
            <Button
              title="Login"
              onPress={() =>
                this.props.navigation.navigate('LoginPage')
              }
            />
            </View>
        );
    }
}

export default HomePage;