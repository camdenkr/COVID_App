import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import "firebase/auth";
import * as Google from 'expo-google-app-auth';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImageIconStyle: {
        padding: 10,
        margin: 12,
        height: 35,
        width: 35,
        resizeMode: 'stretch',
    },
    TextStyle: {
        fontSize: 17,
        //fontWeight: 'bold',
        color: 'black'
    },
    GoogleStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: .5,
        borderColor: '#000000',
        height: 60,
        width: 240,
        borderRadius: 10,
        margin: 5,
    },
});





class LoginPage extends React.Component {
    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(
            function (user) {
                if (user) {
                    //if user is signed in already go to survey
                    this.props.navigation.replace('HomePage');
                }
                else {

                    //this.props.navigation.replace('COVID_Data');
                    //otherwise if not signed in do nothing so user can sign in
                    //this.props.navigation.navigate('HomePage');
                }
            }.bind(this)
        );
    };
    //check iff user is the same as user trying to sign in
    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    };
    //checks if user is signed into firebase authentication
    onSignIn = googleUser => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                    //following id token does not function from documentation, must pass in tokens separately
                    //googleUser.getAuthResponse().id_token
                );
                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential).then(function (result) {
                    if (result.additionalUserInfo.isNewUser) {
                        //save user to firebase database with the following information
                        firebase
                            .database()
                            .ref('/users/' + result.user.uid)
                            .set({
                                gmail: result.user.email,
                                first_name: result.additionalUserInfo.profile.given_name,
                                last_name: result.additionalUserInfo.profile.family_name,
                                created_at: Date.now()
                            })
                        //.then(function (snapshot)
                        //{});
                    }
                    else {
                        firebase
                            .database()
                            .ref('/users/' + result.user.uid).update({
                                last_logged_in: Date.now()
                            })
                    }
                })
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                    });
            } else {
                console.log('User already signed-in Firebase.');
            }
        }.bind(this));
    };

    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                behavior: 'web',
                iosClientId: '933381419067-u8li5hjrmi0jttf4tq7rvtrpn2jqv45s.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                this.onSignIn(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    };
    render() {

        return (
            <View style={styles.container}>
                {/* <Image
                    source={require('./google_icon_131222.png')}
                    fadeDuration={0}
                    style={{ width: 60, height: 60 }}
                /> */}
                <TouchableOpacity
                    onPress={() =>
                        this.signInWithGoogleAsync()
                    }
                    style={styles.GoogleStyle} activeOpacity={0.5}>
                    <Image
                        source={require('./google_icon_131222.png')}
                        style={styles.ImageIconStyle}
                    />
                    <Text style={styles.TextStyle}> Login With Google </Text>
                </TouchableOpacity>
            </View>

        );
    }
}

export default LoginPage;