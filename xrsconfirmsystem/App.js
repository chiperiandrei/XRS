import React from 'react';
import {
    AsyncStorage,
    Alert,
    Button,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Vibration,
    View
} from 'react-native';
import {Colors,} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import Home from './components/Home';

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
        paddingTop: '2%'
    },
    titleForm: {
        textAlign: 'center',
        paddingTop: '10%',
        fontSize: 30,
        paddingBottom: '10%'
    },
    textInput: {
        borderColor: 'dodgerblue',
        borderWidth: 1,
        borderRadius: 1,
        width: '90%',
        left: '1.2%',
        marginBottom: 10
    }
});

class App extends React.Component {
    savedCompanyName: string;

    constructor() {
        super();
        this.state = {
            exists: false,
            company_name: '',
            created_by: '',
            email: '',
            ADMINNFCID_CLIENT: '',
            valid_nfc: false
        };
        this.savedCompanyName = '';
    }

    validate = (email) => {
        console.log(email);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({email: email});
            return false;
        } else {
            this.setState({email: email});
        }
    };
    cancelNFC = () => {
        NfcManager.unregisterTagEvent().catch(() => 0);
    };


    componentDidMount() {
        const trigger = this.triggerNFC();
        NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            this.setState({ADMINNFCID_CLIENT: tag.id});
            Vibration.vibrate(this.state.DURATION);
            NfcManager.unregisterTagEvent().catch(() => 0);
        });

        axios.get('https://xrs-files-management.herokuapp.com/api/files/setup')
            .then(async response => {
                this.setState({
                    exists: response.data.value,
                    company_name: response.data.company_name,
                    created_by: `${response.data.operatorLname} ${response.data.operatorFname}`,
                    email: response.data.email,
                    year: response.data.date_created
                });
                try {
                    await AsyncStorage.setItem('company_name', response.data.company_name);
                } catch (error) {
                    console.log(error.message);
                }
                try {
                    await AsyncStorage.setItem('created_by', response.data.operatorLname);
                } catch (error) {
                    console.log(error.message);
                }
            })
            .catch(err => console.log(err));
        axios.post('https://xrs-files-management.herokuapp.com/api/files/verifyNFC', {NFCID: this.state.ADMINNFCID_CLIENT})
            .then(response => {
                console.log(response)
            }).catch(e => console.log(e));
    }

    logInWithEmailAndPassword(email, password) {

    }

    render() {

        if (this.state.ADMINNFCID_CLIENT === this.state.ADMINNFCID_SERVER && this.state.ADMINNFCID_SERVER !== '' && this.state.ADMINNFCID_CLIENT !== '') {
            this.cancelNFC();
            return <Home/>
        } else if (this.state.ADMINNFCID_SERVER !== '' && this.state.ADMINNFCID_CLIENT !== '') {
            Alert.alert('Tag error', 'Your ACCESS CARD IS INVALID', [{
                text: 'Close'
            }]);
        }
        return <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <View><Text style={styles.title}>Welcome to {this.state.company_name}</Text>
                </View>
                <View><Text style={styles.titleForm}>Please log in into operator admin area</Text></View>
                <View>
                    <Text>Email</Text>
                    <TextInput style={styles.textInput} placeholder="Email..."
                               onChangeText={(text) => this.validate(text)}/>

                    <Text>Password</Text>
                    <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Password..."/>
                    <Button
                        title="Login"
                        onPress={() => Alert.alert('Hello', 'Login form bro', [{
                            text: 'Close'
                        }])}
                    />
                </View>
                <View><Text style={styles.title}>Or place your ACCESS CARD on back of the phone after press the
                    following button</Text>
                </View>
            </SafeAreaView>
        </>

    };

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
