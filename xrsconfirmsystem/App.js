import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import axios from 'axios';


class App extends React.Component {
    componentDidMount() {
        NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            Alert.alert('Hello', tag.id, [{
                text: 'Ask me later', onPress: () => {
                    axios
                        .get('https://api.thecatapi.com/v1/images/search')
                        .then(response => {
                            console.log(response.data[0].url);
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
        return (
            <View style={{padding: 20}}>
                <Text>XRS Confirm Products</Text>
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
