import React from 'react';
import { View, Text, Alert, Image, StyleSheet, BackHandler, Vibration } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import Home from './Home';
import Axios from 'axios';
import { SECRET_CODE, GET_USER_BY_TAG, RETURN_API } from "react-native-dotenv";


const styles = StyleSheet.create({
    title: {
        color: 'dodgerblue',
        textAlign: 'center',
        fontSize: 30,
        paddingTop: '2%'
    }, titleConfirmed: {
        color: 'red',
        textAlign: 'center',
        fontSize: 30,
        paddingTop: '2%'
    }
});

class Return extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            back: false,
            ADMINNFCID_CLIENT: null,
            confirmed: false
        };
    }

    // NFC AREA
    scanNFCcard() {
        const trigger = this.triggerNFC();

        NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            this.setState({ ADMINNFCID_CLIENT: tag.id });
            Vibration.vibrate(2);
            NfcManager.unregisterTagEvent().catch(() => 0);
            Axios.post(`${GET_USER_BY_TAG}${tag.id}`, {}, {
                headers: {
                    'token': `${SECRET_CODE}`
                }
            })
                .then(response => {
                    console.log(response.data)
                    Axios.post(`${RETURN_API}${response.data.email}`, null, {
                        headers: {
                            'token': `${SECRET_CODE}`
                        }
                    })
                        .then(res => {
                            this.setState({ confirmed: true })
                        })
                        .catch(err => err.response.data)
                })
                .catch(err => console.log(err.response.data))
        });
    }
    triggerNFC = async () => {
        try {
            await NfcManager.registerTagEvent();
        } catch (e) {
            console.warn('EXCEPTION', e);
            NfcManager.unregisterTagEvent().catch(() => 0);
        }
    };

    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => this.setState({ back: true }) }
        ]);
        return true;
    };

    componentDidMount() {
        this.scanNFCcard();
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );

    }

    componentWillUnmount() {
        this.backHandler.remove();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }

    render() {
        console.log(this.state.ADMINNFCID_CLIENT)
        if (this.state.back) {
            return <Home />
        } else
            return (<>
                {this.state.confirmed === false ?
                    <View>
                        <Text style={styles.title}>Scan your NFC CARD for return confirm</Text>
                        <Image
                            style={{ marginTop: 100 }}
                            source={require('../assets/img/nfc-reading-motion.gif')} /></View> :
                    <View>
                        <Text style={styles.titleConfirmed}>Products returned!</Text>
                        <Image
                            style={{ marginTop: 100, height: 400, width: 400 }}
                            source={require('../assets/img/return.gif')} /></View>}

            </>
            );

    }

}

export default Return;
