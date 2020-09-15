import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import * as firebase from 'firebase';
import "firebase/auth";



class Admin extends React.Component {

  constructor() {
    super();
    this.state = {
      users: [
        { email: 'abc@gmail.com', symptoms: 'No' },
        { email: 'xyz@gmail.com', symptoms: 'Yes' },
      ]
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.wholeScreen}>
          {
            this.state.users.map((item) => {
              return (
                <View style={styles.infoContainer}>
                  <Text>Email Address: {item.email}</Text>
                  <Text>Presence of Symptoms: {item.symptoms}</Text>
                </View>
              );
            })
          }
        </View>
      </ScrollView>


    );
  }
}

const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 20,
    alignItems: "center"
  },

  infoContainer: {
    elevation: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'rgb(97, 219, 251)'
  },
});

export default Admin;