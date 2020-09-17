import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, View, Button } from 'react-native';
import * as firebase from 'firebase';
import "firebase/auth";
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
let today = new Date();
let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
//let SurveyResponseRef = firebase.firestore().collection("Survey Responses");

let user_list;
let user_list_keys;
let responses;
let responses_keys;


var the_state = [];
var state_obj = {};
//keeps data from constantly being retrieved
let data_retrieved = false;

class Admin extends React.Component {


    constructor(props) {
        super(props);

        //only retrieve data once per session
        if (!data_retrieved)
            this.retrieveData();

    }

    checkNoResponse = () => {
        var unresponsive_user;
        for (var key in user_list_keys) {
            if (!(key in responses_keys)) {
                let user_id = user_list_keys[key];
                var ref = firebase.database().ref("user_list").child(user_id);
                ref
                    .on(
                        "value",
                        function (snapshot) {
                            unresponsive_user = snapshot.val()
                        }


                    );
                state_obj["name"] = unresponsive_user.name;
                state_obj["email"] = unresponsive_user.gmail;
                state_obj["Response"] = 'No';
                state_obj["symptoms"] = 'User has not completed Survey';
                the_state.push(state_obj);
                state_obj = {};
            }
        }
    }

    //add users and record whether they are symptomatic or not for the UI
    checkSymptomatic = () => {
        for (var key in responses) {
            var obj = responses[key];
            state_obj["name"] = obj.name;
            state_obj["email"] = obj.gmail;
            let no_str = "no"
            if (obj.has_responded_today == no_str) {
                state_obj["Response"] = 'No';
                state_obj["symptoms"] = 'User has not completed Survey';
            }
            else if (obj.symptomatic == "false") {
                state_obj["Response"] = 'Yes';
                state_obj["symptoms"] = 'No';
            }
            else {
                state_obj["Response"] = 'Yes';
                state_obj["symptoms"] = 'Yes';
            }
            the_state.push(state_obj);
            state_obj = {};

        }
        state_obj = {};
        this.checkNoResponse();
    }

    //retrieves data from firebase and saves the user id keys from survey responses and the general user list
    retrieveData = () => {
        let uid = firebase.auth().currentUser.uid;

        var ref = firebase.database().ref("user_list");
        ref
            .on(
                "value",
                function (snapshot) {
                    user_list = snapshot.val()
                    user_list_keys = Object.keys(snapshot.val());
                }


            );
        ref = firebase.database().ref('Survey Responses').child(date);
        ref
            .on(
                "value",
                function (snapshot) {
                    responses = snapshot.val();
                    responses_keys = Object.keys(snapshot.val());
                }


            );
        data_retrieved = true;
        this.checkSymptomatic();
    };

    render() {
        return (
            <ScrollView>
                <Button style={{ flexDirection: 'row' }}
                    //button reinitializes varialbes and sets data back to false, and refreshes the page
                    title="Refresh"
                    onPress={() => {
                        data_retrieved = false;
                        user_list = [];
                        user_list_keys = [];
                        responses = [];
                        responses_keys = [];

                        the_state = [];
                        state_obj = {};
                        this.props.navigation.replace('Admin');
                    }
                    }
                />
                <View style={styles.wholeScreen}>
                    {
                        the_state.map((item) => {
                            return (
                                <View style={(item.Response == 'No') ? (styles.infoContainerYellow) : (item.symptoms == 'Yes') ? (styles.infoContainerRed) : (styles.infoContainerGreen)}>
                                    <Text style={styles.textParams}>Name: {item.name}</Text>
                                    <Text style={styles.textParams}>Email: {item.email}</Text>
                                    <Text style={styles.textParams}>Presence of Symptoms: {item.symptoms}</Text>
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
        alignItems: "center",
    },

    infoContainerGreen: {
        elevation: 5,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 10,
        width: '100%',
        backgroundColor: 'rgb(0,255,127)',
        borderRadius: 15
    },

    infoContainerRed: {
        elevation: 5,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 10,
        width: '100%',
        backgroundColor: 'rgb(255,0,0)',
        borderRadius: 15
    },
    infoContainerYellow: {
        elevation: 5,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 10,
        width: '100%',
        backgroundColor: 'yellow',
        borderRadius: 15
    },
});

export default Admin;