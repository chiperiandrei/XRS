import React from 'react';
import {View, Text, TouchableOpacity, Alert, Image, Vibration} from 'react-native';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import axios from 'axios';
import NativeImageLoader from "react-native/Libraries/Image/NativeImageLoader";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            DURATION: 100
        }
    }

    componentDidMount() {
        NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            Vibration.vibrate(this.state.DURATION);
            Alert.alert('Hello', tag.id, [{
                text: 'Ask me later', onPress: () => {
                    axios
                        .get('https://api.thecatapi.com/v1/images/search')
                        .then(response => {
                            this.setState({image: response.data[0].url})
                        });
                },
            }]);
            NfcManager.unregisterTagEvent().catch(() => 0);
        });
    }

    componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }

    render() {
        if (this.state.image == "")
            this.state.image = 'https://web.uri.edu/visit/files/CAMK-Aerials-169.jpg';
        return (
            <View style={{padding: 20}}>
                <Image
                    style={{width: 50, height: 50}}
                    source={require('./assets/img/logo.png')}/>
                <Text style={{color: 'dodgerblue', fontFamily: 'Squada One, cursive', fontWeight: 'bold'}}>XRS Confirm
                    Products</Text>
                <TouchableOpacity
                    style={{
                        padding: 10,
                        width: 200,
                        margin: 20,
                        borderWidth: 1,
                        borderColor: 'black',
                    }}
                    onPress={this._test}>
                    <Text>Salut</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        padding: 10,
                        width: 200,
                        margin: 20,
                        borderWidth: 1,
                        borderColor: 'black',
                    }}
                    onPress={this._cancel}>
                    <Text>Cancel Test</Text>
                </TouchableOpacity>
                <Text>{this.state.image}</Text>
                <Image source={{uri: this.state.image}}
                       style={{width: 200, height: 200}}
                />
            </View>
        );
    }

    _cancel = () => {
        NfcManager.unregisterTagEvent().catch(() => 0);
    };

    _test = async () => {
        try {
            await NfcManager.registerTagEvent();
        } catch (ex) {
            console.warn('ex', ex);
            NfcManager.unregisterTagEvent().catch(() => 0);
        }
    };
}

export default App;
