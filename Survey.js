import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import { SimpleSurvey } from 'react-native-simple-survey';
import { Button as MUIButton } from "react-native-material-ui";

var surveyResponses = {
    Q1: '',
    Q2: '',
    Q3: '',
    Q4: '',
    Q5: '',
    Q6: '',
    Q7: '',
    Q8: '',
}


class Survey extends React.Component {

    constructor(props) {
        super(props);
      //one for each button, 11 is Q1 Yes, 12 is Q1 No, etc.
        this.state = {
          buttonColor11: '',
          buttonColor12: '',
          buttonColor21: '',
          buttonColor22: '',
          buttonColor31: '',
          buttonColor32: '',
          buttonColor41: '',
          buttonColor42: '',
          buttonColor51: '',
          buttonColor52: '',
          buttonColor61: '',
          buttonColor62: '',
          buttonColor71: '',
          buttonColor72: '',
          buttonColor81: '',
          buttonColor82: '',
        };
      }

      //each on press records response, then changes color of buttons respectively
    render() {
        return (
            <>
                <View style={{alignItems: 'center', backgroundColor: 'white', flex: 1 }} >
                    <Text style = {{fontFamily: 'Cochin'}}>
                        Are you experiencing any of the following symptoms
                        (Please Note: These questions pertain only to new symptoms that have arisen in the past 14 days.)
            </Text>
                    <Text style = {{fontSize : 18, fontFamily: 'Cochin'}}>
                        Fever of 100 F, or feeling unusually hot (if no thermometer available) accompanied by shivering/chills
            </Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{flexDirection: 'row' }}
                            title="Yes"
                            color ={this.state.buttonColor11}
                            onPress={() => {
                                surveyResponses.Q1 = 'yes'
                                this.setState({ buttonColor11: 'green' }); 
                                this.setState({ buttonColor12: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color ={this.state.buttonColor12}
                            onPress={() => {
                                surveyResponses.Q1 = 'no'
                                this.setState({ buttonColor11: '' }); 
                                this.setState({ buttonColor12: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text style = {{fontSize : 18, fontFamily: 'Cochin'}}>
                    New cough not related to chronic condition
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{flexDirection: 'row' }}
                            title="Yes"
                            color ={this.state.buttonColor21}
                            onPress={() => {
                                surveyResponses.Q2 = 'yes'
                                this.setState({ buttonColor21: 'green' }); 
                                this.setState({ buttonColor22: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color ={this.state.buttonColor22}
                            onPress={() => {
                                surveyResponses.Q2 = 'no'
                                this.setState({ buttonColor21: '' }); 
                                this.setState({ buttonColor22: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text style = {{fontSize : 18, fontFamily: 'Cochin'}}>
                    Difficulty breathing, Shortness of breath
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{flexDirection: 'row' }}
                            title="Yes"
                            color ={this.state.buttonColor31}
                            onPress={() => {
                                surveyResponses.Q3 = 'yes'
                                this.setState({ buttonColor31: 'green' }); 
                                this.setState({ buttonColor32: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color ={this.state.buttonColor32}
                            onPress={() => {
                                surveyResponses.Q3 = 'no'
                                this.setState({ buttonColor31: '' }); 
                                this.setState({ buttonColor32: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text style = {{fontSize : 18, fontFamily: 'Cochin'}}>
                    Sore Throat
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{flexDirection: 'row' }}
                            title="Yes"
                            color ={this.state.buttonColor41}
                            onPress={() => {
                                surveyResponses.Q4 = 'yes'
                                this.setState({ buttonColor41: 'green' }); 
                                this.setState({ buttonColor42: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color ={this.state.buttonColor42}
                            onPress={() => {
                                surveyResponses.Q4 = 'no'
                                this.setState({ buttonColor41: '' }); 
                                this.setState({ buttonColor42: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text style = {{fontSize : 18, fontFamily: 'Cochin'}}>
                    New loss of taste or smell
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{flexDirection: 'row' }}
                            title="Yes"
                            color ={this.state.buttonColor51}
                            onPress={() => {
                                surveyResponses.Q5 = 'yes'
                                this.setState({ buttonColor51: 'green' }); 
                                this.setState({ buttonColor52: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color ={this.state.buttonColor52}
                            onPress={() => {
                                surveyResponses.Q5 = 'no'
                                this.setState({ buttonColor51: '' }); 
                                this.setState({ buttonColor52: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text>
                    Vomiting
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{flexDirection: 'row' }}
                            title="Yes"
                            color ={this.state.buttonColor61}
                            onPress={() => {
                                surveyResponses.Q6 = 'yes'
                                this.setState({ buttonColor61: 'green' }); 
                                this.setState({ buttonColor62: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color ={this.state.buttonColor62}
                            onPress={() => {
                                surveyResponses.Q6 = 'no'
                                this.setState({ buttonColor61: '' }); 
                                this.setState({ buttonColor62: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text style = {{fontSize : 18, fontFamily: 'Cochin'}}>
                    Severe fatigue
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{flexDirection: 'row' }}
                            title="Yes"
                            color ={this.state.buttonColor71}
                            onPress={() => {
                                surveyResponses.Q7 = 'yes'
                                this.setState({ buttonColor71: 'green' }); 
                                this.setState({ buttonColor72: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color ={this.state.buttonColor72}
                            onPress={() => {
                                surveyResponses.Q1 = 'no'
                                this.setState({ buttonColor71: '' }); 
                                this.setState({ buttonColor72: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text style = {{fontSize : 18, fontFamily: 'Cochin'}}>
                    Severe muscle aches
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{flexDirection: 'row' }}
                            title="Yes"
                            color ={this.state.buttonColor81}
                            onPress={() => {
                                surveyResponses.Q8 = 'yes'
                                this.setState({ buttonColor81: 'green' }); 
                                this.setState({ buttonColor82: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color ={this.state.buttonColor82}
                            onPress={() => {
                                surveyResponses.Q8 = 'no'
                                this.setState({ buttonColor81: '' }); 
                                this.setState({ buttonColor82: 'green' });
                            }
                            }
                        />
                    </View>
                    <Button
                            title="SUBMIT"
                            onPress={() => {
                              //send data to firestore
                              this.props.navigation.navigate('HomePage');
                            }
                            }
                        />
                        <Text>*If you have a new positive test for COVID-19 from an outside facility and have not notified Healthway, please call Healthway 617-353-0550 during business hours 8AM-8PM.</Text>
                </View>
            </>
        );
    }
}

export default Survey;