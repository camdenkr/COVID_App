import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Constants from 'expo';
import api from './utilities/api.js';

const styles = StyleSheet.create({
  homestyle: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BigBold: {
    marginTop: -500,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30
  }
});


class COVID_Data extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Country: '',
      TotalConfirmed: '',
      TotalDeaths: '',
      Date: ''
    }
  }
  componentDidMount() {
    api.COVID_countries().then((res) => {
      this.setState({
        country: res.Countries[179].Country,
        TotalConfirmed: res.Countries[179].TotalConfirmed,
        TotalDeaths: res.Countries[179].TotalDeaths,
        Date: res.Countries[179].Date
      })
    })
      .catch((error) => {
        console.error(error)
      })
  }
  render() {
    return (
      <View style={styles.homestyle} >
        <Text style={styles.BigBold}>{this.state.country}</Text>
        <Text>Total Confirmed Cases: <Text style={{fontWeight: 'bold'}}>{this.state.TotalConfirmed}</Text></Text>
        <Text>Total Deaths: <Text style={{fontWeight: 'bold'}}>{this.state.TotalDeaths}</Text></Text>
        <Text>As of: <Text style={{fontWeight: 'bold'}}>{this.state.Date[0]}{this.state.Date[1]}
        {this.state.Date[2]}{this.state.Date[3]}{this.state.Date[4]}
        {this.state.Date[5]}{this.state.Date[6]}{this.state.Date[7]}
        {this.state.Date[8]}{this.state.Date[9]}</Text></Text>
      </View>
    );
  }
}


export default COVID_Data;