import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as firebase from 'firebase';
import "firebase/auth";
import { Button as MUIButton } from "react-native-material-ui";


const Separator = () => (
  <View style={styles.separator} />
);
class HomePage extends React.Component {
//width: "100%" ,display: "flex",
  render() {
    return (
      <>
      <View style={{backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-end' }} >
      <Button
       title="Go to Admin View"
       raised
       onPress={() => {
         this.props.navigation.navigate('Admin');
       }
       }
     />
     </View>
      <View style={styles.homestyle} >
        <Text style={styles.title}>Welcome to COVID Tracker!</Text>
        <Image
          source={require('./COVID_image.jpeg')}
        />
        <View style={styles.body} >
          <MUIButton
            raised primary text="See COVID Data"
            onPress={
              () => {
                this.props.navigation.navigate('COVID_Data');
              }
            }
          />
          <Separator />
          <MUIButton
            raised primary text="Complete Survey"
            // onPress={() => {
            //   firebase.auth().signOut();
            //   this.props.navigation.replace('SurveyPage');
            // }
            // }
          />
          <Separator />
          <MUIButton
            raised primary text="Sign Out"
            onPress={() => {
              firebase.auth().signOut();
              this.props.navigation.replace('LoginPage');
            }
            }
          />
        
        </View>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  homestyle: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
  title: {
    textAlignVertical: 'top',
    fontSize: 30,
    marginTop: 0,
    fontWeight: 'bold'
  },
  body: {
    textAlignVertical: 'top',
    fontSize: 30,
    marginTop: 0,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default HomePage;


