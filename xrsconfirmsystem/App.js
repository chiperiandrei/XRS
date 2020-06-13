import React from 'react';
import {
    AsyncStorage,
    Alert,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Vibration,
    View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import Home from './components/Home';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GET_COMPANY_INFO, VERIFY_EMAIL_PASSWORD } from "react-native-dotenv";
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    title: {
        color: 'dodgerblue',
        textAlign: 'center',
        fontSize: 30,
        paddingTop: '2%',
    },
    titleForm: {
        textAlign: 'center',
        paddingTop: '10%',
        fontSize: 30,
        paddingBottom: '10%',
    },
    errorMessage: {
        color: 'red',
        fontSize: 28,
        justifyContent: "center"
    }
});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            exists: false,
            company_name: '',
            created_by: '',
            email: '',
            ADMINNFCID_CLIENT: '',
            valid_nfc: null,
            valid_credintials: true,
            scannedTAG: false,
            error_message: ''
        };
        this.savedCompanyName = '';
    }

    handlerEmail = email => {
        this.setState({ email: email, error_message: '' });
    };
    handlerPassword = password => {
        this.setState({ password: password });
    };


    componentDidMount() {
        axios
            .get(`${GET_COMPANY_INFO}`)
            .then(async response => {
                this.setState({
                    exists: response.data.value,
                    company_name: response.data.company_name,
                    created_by: `${response.data.operatorLname} ${
                        response.data.operatorFname
                        }`,
                    email: response.data.email,
                    year: response.data.date_created,
                });
                try {
                    await AsyncStorage.setItem(
                        'company_name',
                        response.data.company_name,
                    );
                } catch (error) {
                    console.log(error.message);
                }
            })
            .catch(err => console.log(err));
    }


    logInWithEmailAndPassword() {
        data = {
            email: this.state.email,
            password: this.state.password,
        };
        axios
            .post(
                `${VERIFY_EMAIL_PASSWORD}`,
                data,
            )
            .then(async response => {
                try {
                    await AsyncStorage.setItem(
                        'created_by',
                        response.data.firstname + ' ' + response.data.lastname,
                    );
                } catch (error) {
                    console.log(error.message);
                }
                this.setState({
                    valid_credintials: true,
                });
            })
            .catch(e => {
                console.log(e.response.data)
                this.setState({
                    valid_credintials: null,
                    error_message: e.response.data
                });
            });
    }

    render() {
        if (
            this.state.valid_nfc === true ||
            this.state.valid_credintials === true
        ) {
            // this.cancelNFC();
            return <Home />;
        }


        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <View>
                        <Text style={styles.title}>
                            Welcome to {this.state.company_name}
                        </Text>
                    </View>
                    <View />
                    <View>
                        <Text style={styles.titleForm}>
                            Please log in into operator admin area
            </Text>
                    </View>
                    <View>
                        {this.state.error_message !== '' ? <Text style={styles.errorMessage}>{this.state.error_message}</Text> : null}
                        <Input
                            placeholder="Email"
                            leftIcon={<Icon name="at" size={24} color="black" />}
                            onChangeText={text => this.handlerEmail(text)}
                            value={this.state.email}
                        />
                        <Input
                            placeholder="Password"
                            leftIcon={<Icon name="key" size={24} color="black" />}
                            onChangeText={text => this.handlerPassword(text)}
                            secureTextEntry={true}
                        />

                        <Button
                            title="Login"
                            onPress={() => this.logInWithEmailAndPassword()}
                            large
                            icon={<Icon name="arrow-right" size={15} color="white" />}
                        />
                    </View>

                </SafeAreaView>
            </>
        );
    }

    triggerNFC = async () => {
        try {
            await NfcManager.registerTagEvent();
        } catch (e) {
            console.warn('EXCEPTION', e);
            NfcManager.unregisterTagEvent().catch(() => 0);
        }
    };
}

export default App;
