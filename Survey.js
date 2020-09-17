import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as firebase from 'firebase';
import { Button as MUIButton, COLOR, ThemeContext, getTheme, withTheme } from "react-native-material-ui";
import { color } from 'react-native-reanimated';



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

    isSymptomatic = () => {
        if (surveyResponses.Q1 == 'yes' ||
            surveyResponses.Q2 == 'yes' ||
            surveyResponses.Q3 == 'yes' ||
            surveyResponses.Q4 == 'yes' ||
            surveyResponses.Q5 == 'yes' ||
            surveyResponses.Q6 == 'yes' ||
            surveyResponses.Q7 == 'yes' ||
            surveyResponses.Q8 == 'yes')
            return true;
        else
            return false;
    };

    //stores user response and whether they are symptomatic in firestore
    storeResponses = () => {
        let today = new Date();
        let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
        let symtpomatic = "false";
        if (this.isSymptomatic()) {
            symtpomatic = "true";
        }
        //firebase.auth().currentUser.
        firebase
        .database()
        .ref("Survey Responses")
        .child(date + '/' + firebase.auth().currentUser.uid)
        .update({
                symptomatic: symtpomatic,
                has_responded_today: 'yes',
                Q1: surveyResponses.Q1,
                Q2: surveyResponses.Q2,
                Q3: surveyResponses.Q3,
                Q4: surveyResponses.Q4,
                Q5: surveyResponses.Q5,
                Q6: surveyResponses.Q6,
                Q7: surveyResponses.Q7,
                Q8: surveyResponses.Q8,
            })
    }
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
    componentDidMount() {
        surveyResponses.Q1 = '';
        surveyResponses.Q2 = '';
        surveyResponses.Q3 = '';
        surveyResponses.Q4 = '';
        surveyResponses.Q5 = '';
        surveyResponses.Q6 = '';
        surveyResponses.Q7 = '';
        surveyResponses.Q8 = '';
    }
    checkSurveyCompletion = () => {
        if (surveyResponses.Q1 == '' ||
            surveyResponses.Q2 == '' ||
            surveyResponses.Q3 == '' ||
            surveyResponses.Q4 == '' ||
            surveyResponses.Q5 == '' ||
            surveyResponses.Q6 == '' ||
            surveyResponses.Q7 == '' ||
            surveyResponses.Q8 == '')
            return false;
        else
            return true;
    };

    //each on press records response, then changes color of buttons respectively
    render() {
        return (
            <>
                <View style={{backgroundColor: 'white', flex: 1 ,padding: 10}} >
                    <View style={{borderColor:'white', borderBottomWidth:20}}>
                    <Text>
                        Are you experiencing any of the following symptoms?
                        (Questions pertain only to new symptoms that have arisen in the past 14 days.)
            </Text>
            </View>
            <Text style={styles.Questions}>
                        Fever of 100 F, or feeling unusually hot (if no thermometer available) accompanied by shivering/chills
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{ flexDirection: 'row' }}
                            title="Yes"
                            color={this.state.buttonColor11}
                            onPress={() => {
                                surveyResponses.Q1 = 'yes'
                                this.setState({ buttonColor11: 'green' });
                                this.setState({ buttonColor12: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color={this.state.buttonColor12}
                            onPress={() => {
                                surveyResponses.Q1 = 'no'
                                this.setState({ buttonColor11: '' });
                                this.setState({ buttonColor12: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text style={styles.Questions}>
                        New cough not related to chronic condition
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{ flexDirection: 'row' }}
                            title="Yes"
                            color={this.state.buttonColor21}
                            onPress={() => {
                                surveyResponses.Q2 = 'yes'
                                this.setState({ buttonColor21: 'green' });
                                this.setState({ buttonColor22: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color={this.state.buttonColor22}
                            onPress={() => {
                                surveyResponses.Q2 = 'no'
                                this.setState({ buttonColor21: '' });
                                this.setState({ buttonColor22: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text style={styles.Questions}>
                        Difficulty breathing, Shortness of breath
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{ flexDirection: 'row' }}
                            title="Yes"
                            color={this.state.buttonColor31}
                            onPress={() => {
                                surveyResponses.Q3 = 'yes'
                                this.setState({ buttonColor31: 'green' });
                                this.setState({ buttonColor32: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color={this.state.buttonColor32}
                            onPress={() => {
                                surveyResponses.Q3 = 'no'
                                this.setState({ buttonColor31: '' });
                                this.setState({ buttonColor32: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text style={styles.Questions}>
                        Sore Throat
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{ flexDirection: 'row' }}
                            title="Yes"
                            color={this.state.buttonColor41}
                            onPress={() => {
                                surveyResponses.Q4 = 'yes'
                                this.setState({ buttonColor41: 'green' });
                                this.setState({ buttonColor42: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color={this.state.buttonColor42}
                            onPress={() => {
                                surveyResponses.Q4 = 'no'
                                this.setState({ buttonColor41: '' });
                                this.setState({ buttonColor42: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text style={styles.Questions}>
                        New loss of taste or smell
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{ flexDirection: 'row' }}
                            title="Yes"
                            color={this.state.buttonColor51}
                            onPress={() => {
                                surveyResponses.Q5 = 'yes'
                                this.setState({ buttonColor51: 'green' });
                                this.setState({ buttonColor52: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color={this.state.buttonColor52}
                            onPress={() => {
                                surveyResponses.Q5 = 'no'
                                this.setState({ buttonColor51: '' });
                                this.setState({ buttonColor52: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text style={styles.Questions}>
                        Vomiting
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{ flexDirection: 'row' }}
                            title="Yes"
                            color={this.state.buttonColor61}
                            onPress={() => {
                                surveyResponses.Q6 = 'yes'
                                this.setState({ buttonColor61: 'green' });
                                this.setState({ buttonColor62: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color={this.state.buttonColor62}
                            onPress={() => {
                                surveyResponses.Q6 = 'no'
                                this.setState({ buttonColor61: '' });
                                this.setState({ buttonColor62: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text style={styles.Questions}>
                        Severe fatigue
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{ flexDirection: 'row' }}
                            title="Yes"
                            color={this.state.buttonColor71}
                            onPress={() => {
                                surveyResponses.Q7 = 'yes'
                                this.setState({ buttonColor71: 'green' });
                                this.setState({ buttonColor72: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color={this.state.buttonColor72}
                            onPress={() => {
                                surveyResponses.Q7 = 'no'
                                this.setState({ buttonColor71: '' });
                                this.setState({ buttonColor72: 'green' });
                            }
                            }
                        />
                    </View>
                    <Text style={styles.Questions}>
                        Severe muscle aches
            </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
                        <Button style={{ flexDirection: 'row' }}
                            title="Yes"
                            color={this.state.buttonColor81}
                            onPress={() => {
                                surveyResponses.Q8 = 'yes'
                                this.setState({ buttonColor81: 'green' });
                                this.setState({ buttonColor82: '' });
                            }
                            }
                        />
                        <Button
                            title="No"
                            color={this.state.buttonColor82}
                            onPress={() => {
                                surveyResponses.Q8 = 'no'
                                this.setState({ buttonColor81: '' });
                                this.setState({ buttonColor82: 'green' });
                            }
                            }
                        />
                    </View>
                    <MUIButton style={{ container: { backgroundColor: "#DE5246" } }}
                        raised primary text="SUBMIT"
                        onPress={() => {
                            //assigns variable correctly based on if survey has been completed  
                            //if survey has not been completed, don't send data and alert
                            if (!this.checkSurveyCompletion()) {
                                Alert.alert(
                                    "Survey Incomplete",
                                    "Please answer all questions before submitting.",
                                    [
                                        { text: "OK" }
                                    ],
                                    { cancelable: false }
                                );
                            }
                            else {
                                this.storeResponses();
                                this.props.navigation.navigate('HomePage');
                            }
                        }
                        }
                    />
                    <Text>*If you have a new positive test for COVID-19 from an outside facility and have not notified Healthway, please call Healthway 617-353-0550 during business hours 8AM-8PM.</Text>

                </View>
            </>
        );
    }
}
const styles = StyleSheet.create({
    Questions: {
        fontSize: 15
    }
});
export default Survey;