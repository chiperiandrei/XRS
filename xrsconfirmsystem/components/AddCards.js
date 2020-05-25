import React from 'react';
import { View, Text, ToastAndroid, Alert, Image, Button, StyleSheet, BackHandler, FlatList, ActivityIndicator, Vibration } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import axios from 'axios';
import { Colors } from "react-native/Libraries/NewAppScreen";
import Home from './Home';
import Axios from 'axios';
import { SECRET_CODE, ADD_CARDS_API } from "react-native-dotenv";
import Modal from 'react-native-modal';
import FlashMessage from "react-native-flash-message";

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
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        fontSize: 30,
        paddingTop: '2%'
    },
    successMessage: {
        color: 'green',
        textAlign: 'center',
        fontSize: 30,
        paddingTop: '2%'
    },
    signCard: {
        color: 'red',
        textAlign: 'center',
        fontSize: 30,
        paddingTop: '2%'
    },
});

class AddCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            back: false,
            ADMINNFCID_CLIENT: '',
            error: null,
            message: false,
            scannedTAG: false,
        };
    }
    scanNFCcard() {
        const trigger = this.triggerNFC();

        NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            this.setState({ ADMINNFCID_CLIENT: tag.id });
            this.setState({ scannedTAG: true });
            Vibration.vibrate(2);
            NfcManager.unregisterTagEvent().catch(() => 0);
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
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        this.triggerNFC()
        this.scanNFCcard()

    }

    componentWillUnmount() {
        this.backHandler.remove();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }
    handleTagAdd = () => {
        console.log(ADD_CARDS_API)
        Axios.post(`${ADD_CARDS_API}`, {
            tagid: `${this.state.ADMINNFCID_CLIENT}`
        }
            , {
                headers: {
                    'token': `${SECRET_CODE}`
                }
            })
            .then(res => this.setState({ message: res.data }))
            .catch(err => this.setState({ error: err.response.data }))
    }
    handleBackButton = () => {
        this.setState({
            back: true
        })
    }
    handleReloadPage = () => {
        this.setState({
            scannedTAG: false,
            ADMINNFCID_CLIENT: '',
            back: false,
            error: null,
            message: false,
        }, this.componentDidMount)
    }


    render() {
        if (this.state.back) {
            return <Home />
        } else
            return (<>
                <View>
                    <Modal isVisible={this.state.scannedTAG} animationIn='bounceInDown'>
                        {this.state.ADMINNFCID_CLIENT !== '' && this.state.message === false && this.state.error === null ? <Text style={{ fontSize: 30, color: 'white' }}>Your card is identified by ID</Text> : null}

                        {this.state.ADMINNFCID_CLIENT !== '' && this.state.message === false && this.state.error === null ? <Text style={styles.signCard}>{this.state.ADMINNFCID_CLIENT}</Text> : null}
                        {this.state.message !== false ? <Text style={styles.successMessage}>{this.state.message}</Text> : null}
                        {this.state.error !== null ? <Text style={styles.errorMessage}>{this.state.error}</Text> : null}
                        {this.state.message !== false ? <Button title='Back' onPress={this.handleBackButton}></Button> : null}
                        {this.state.error !== null ? <Button title='Retry' onPress={this.handleReloadPage}></Button> : null}

                        {this.state.error === null && this.state.message === false ? <Button onPress={this.handleTagAdd} title='AddCard'></Button> : null}
                    </Modal>
                    <Text style={styles.title}>Scan your card</Text>
                    <Image
                        style={{ width: 300, height: 500 }}
                        source={require('../assets/img/nfc-reading-motion.gif')} /></View></>
            );
    }

}

export default AddCards;
