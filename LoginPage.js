import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import "firebase/auth";
import * as Google from 'expo-google-app-auth';

let today = new Date();
let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
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
                    //do nothing
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
                //Setting up user_list if a new user and setting up date ref if it hasn't been created yet
                firebase.auth().signInWithCredential(credential).then(function (result) {
                    //a new user logging in will check if a reference to today's survey has been created yet, if it hasn't, we will create one so that there is some information for the admins
                    let created;
                    //check the result of the reference, if it is null then the reference does note exist
                    let ref = firebase.database().ref("Survey Reponses").child(date);
                    ref.on(
                        "value",
                        function (snapshot) {
                            if (snapshot.val())
                                created = true;
                            else
                                created = false;
                        }
                    );
                    //make the reference if not created
                    if (!created) {
                        firebase
                            .database()
                            .ref('Survey Responses/' + date + '/' + result.user.uid)
                            .update({
                                gmail: result.user.email,
                                name: result.additionalUserInfo.profile.given_name + ' ' + result.additionalUserInfo.profile.family_name,
                                has_responded_today: 'no',
                            })
                    }
                    //if new user
                    if (result.additionalUserInfo.isNewUser) {
                        //save user to firebase database with the following information
                        firebase
                            .database()
                            .ref('/user_list/' + result.user.uid)
                            .set({
                                gmail: result.user.email,
                                name: result.additionalUserInfo.profile.given_name + ' ' + result.additionalUserInfo.profile.family_name,
                            })



                    }
                    else {
                        firebase
                            .database()
                            .ref('Survey Responses/' + date + '/' + result.user.uid)
                            .update({
                                gmail: result.user.email,
                                name: result.additionalUserInfo.profile.given_name + ' ' + result.additionalUserInfo.profile.family_name,
                                has_responded_today: 'no'
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
                    <Text style={styles.TextStyle}>Sign in with Google </Text>
                </TouchableOpacity>
            </View>

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
    ImageIconStyle: {
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        height: 50,
        width: 50,
        resizeMode: 'stretch',
        borderRadius: 5,
    },
    TextStyle: {
        fontSize: 20,
        fontFamily: 'Apple SD Gothic Neo',
        marginLeft: 6,
        //fontWeight: 'bold',
        color: 'white'
    },
    GoogleStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4c8bf5',
        borderWidth: .5,
        borderColor: '#000000',
        height: 60,
        width: 240,
        borderRadius: 5,
        margin: 5,
    },
});

export default LoginPage;