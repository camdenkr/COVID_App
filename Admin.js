import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import * as firebase from 'firebase';
import "firebase/auth";

let today = new Date();
let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
//let SurveyResponseRef = firebase.firestore().collection("Survey Responses");

let user_list;
let user_list_keys;
let responses;
let responses_keys;

var the_state = [];
var state_obj = {};

class Admin extends React.Component {


    constructor(props) {
        super(props);

        this.retrieveData();
        this.checkSymptomatic();
        //this.checkNoResponse();


    }


    //add users and record whether they are symptomatic or not for the UI
    checkSymptomatic = () => {
        console.log("hi");
        for (var key in responses) {
            var obj = responses[key];
            state_obj["name"] = obj.name;
            state_obj["email"] = obj.gmail;
            state_obj["Response"] = 'Yes';
            if (obj.symptomatic) {
                state_obj["symptoms"] = 'Yes';
            }
            else {
                state_obj["symptoms"] = 'No';
            }
            the_state.push(state_obj);
        }
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
                    console.log("user_list:");
                    console.log(user_list);
                    console.log(user_list_keys);
                }


            );
        ref = firebase.database().ref('Survey Responses').child(date);
        ref
            .on(
                "value",
                function (snapshot) {
                    responses = snapshot.val();
                    responses_keys = Object.keys(snapshot.val());
                    console.log("Responses:");
                    console.log(responses);
                    console.log(responses_keys);
                }


            );
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.wholeScreen}>
                    {
                        the_state.map((item) => {
                            return (
                                <View style={(item.response == 'No') ? (styles.infoContainerYellow) : (item.symptoms == 'Yes') ? (styles.infoContainerRed) : (styles.infoContainerGreen)}>
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