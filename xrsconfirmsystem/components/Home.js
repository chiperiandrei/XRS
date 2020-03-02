import React from 'react';
import {View, Text, TouchableOpacity, Alert, Image, Button, StyleSheet, Vibration} from 'react-native';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import axios from 'axios';
import {Colors} from "react-native/Libraries/NewAppScreen";
import Return from "./Return";

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
    confirmReserve: {
        backgroundColor: 'green',
        height: '28%',
        width: '80%',
        left: '5%',
        top: '70%'
    },
    textButton: {
        fontSize: 25,
        color: 'white',
        left: '25%',
        top: '13%'
    },
    confirmReturn: {
        backgroundColor: 'black',
        height: '28%',
        width: '80%',
        left: '5%',
        top: '20%'
    }
});


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company_name: ''
        };
    }

    componentDidMount() {

        axios.get('https://xrs-files-management.herokuapp.com/api/files/setup')
            .then(response => this.setState({
                company_name: response.data.company_name
            }))
            .catch(err => console.log(err))
    }

    componentWillUnmount() {
    }

    render() {
        return (<>
                <View style={{padding: 20}}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={require('../assets/img/logo.png')}/>
                    <Text style={styles.title}>{this.state.company_name} Objects Management</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.confirmReserve}
                                      onPress={() => Alert.alert('Hello', 'Login form bro', [{
                                          text: 'Close'
                                      }])}>
                        <Text style={styles.textButton}>Confirm reserve</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.confirmReturn} onPress={() => {
                        return <Return/>
                    }}>
                        <Text style={styles.textButton}>Confirm return</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

}

export default App;
