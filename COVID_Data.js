import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
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
    marginTop: -480,
    color: 'red',
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
        country: "USA",
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
        <Text style = {{fontSize: 20}}>Total Confirmed Cases: <Text style={{ fontWeight: 'bold' }}>{this.state.TotalConfirmed}</Text></Text>
        <Text style = {{fontSize: 20}}>Total Deaths: <Text style={{ fontWeight: 'bold' }}>{this.state.TotalDeaths}</Text></Text>
        <Text style = {{fontSize: 20}}>As of: <Text style={{ fontWeight: 'bold'}}>{this.state.Date[0]}{this.state.Date[1]}
          {this.state.Date[2]}{this.state.Date[3]}{this.state.Date[4]}
          {this.state.Date[5]}{this.state.Date[6]}{this.state.Date[7]}
          {this.state.Date[8]}{this.state.Date[9]}</Text></Text>
        <View style={{
          marginLeft: -150,
        }}>
          <Text style={{fontWeight: 'bold', marginVertical: 10, fontSize: 20}}>
            Useful Links:</Text>
            <Text style={{fontSize: 30, color: 'black'}}
           onPress={() => Linking.openURL('https://www.who.int/emergencies/diseases/novel-coronavirus-2019')}>
            {'\u2023'} <Text style={{fontSize: 20, color: 'blue'}}>World Health Organization </Text></Text>
            <Text style={{fontSize: 30, color: 'black'}}
           onPress={() => Linking.openURL('https://www.cdc.gov/coronavirus/2019-ncov/index.html')}>
            {'\u2023'} <Text style={{fontSize: 20, color: 'blue'}}> CDC</Text></Text>
            <Text style={{fontSize: 30, color: 'black'}}
           onPress={() => Linking.openURL('https://covid-evidence.org/')}>
            {'\u2023'} <Text style={{fontSize: 20, color: 'blue'}}> COVID Evidence</Text></Text>
            <Text style={{fontSize: 30, color: 'black'}}
           onPress={() => Linking.openURL('https://www.bu.edu/healthway/community-dashboard/')}>
            {'\u2023'} <Text style={{fontSize: 20, color: 'blue'}}> BU Testing Data Dashboard</Text></Text>
        </View>
      </View>
    );
  }
}


export default COVID_Data;



