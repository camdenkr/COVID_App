import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import "firebase/auth";
import { TextInput } from 'react-native-gesture-handler';
import * as Google from 'expo-google-app-auth';
import firebaseConfig from './App';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});





class LoginPage extends React.Component {
    // componentDidMount() {
    //     this.checkIfLoggedIn();
    // }

    // checkIfLoggedIn = () => {
    //     firebase.auth().onAuthStateChanged(
    //         function (user) {
    //             if (user) {
    //                 //this.props.navigation.navigate('HomePage');
    //             }
    //             else {
    //                 //this.props.navigation.navigate('HomePage');
    //             }
    //         }.bind(this)
    //     );
    // };

    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                behavior: 'web',
              iosClientId: '933381419067-u8li5hjrmi0jttf4tq7rvtrpn2jqv45s.apps.googleusercontent.com',
              scopes: ['profile', 'email'],
            });
        
            if (result.type === 'success') {
              return result.accessToken;
            } else {
              return { cancelled: true };
            }
          } catch (e) {
            return { error: true };
          }
        }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to the login page!</Text>
                <Button
                    title="Back to home"
                    onPress={() =>
                        this.props.navigation.navigate('HomePage')
                    }
                />
                <Button
                    title="Sign In With Google"
                    onPress={() =>
                        this.signInWithGoogleAsync()
                    }
                />
            </View>

        );
    }
}

export default LoginPage;