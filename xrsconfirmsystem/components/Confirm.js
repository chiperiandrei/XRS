import React from 'react';
import { View, Text, ToastAndroid, Alert, Image, Button, StyleSheet, BackHandler, FlatList, ActivityIndicator, Vibration } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import axios from 'axios';
import { Colors } from "react-native/Libraries/NewAppScreen";
import Home from './Home';
import Axios from 'axios';
import { GET_USERS, SECRET_CODE, ADD_NFC_TAG, GET_USER_BY_TAG } from "react-native-dotenv";
import { ListItem, SearchBar } from 'react-native-elements';
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
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    tinyLogo: {
        width: 150,
        height: 150,
        borderRadius: 50,
    },
    flashMessage: {
        position: 'absolute',
        backgroundColor: 'green',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        top: 0
    }
});

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            DURATION: 100,
            NFC_ID: "",
            back: false,
            loading: false,
            data: [],
            error: null,
            user_lastName: '',
            user_firstName: '',
            user_email: '',
            user_avatarpath: '',
            modal_active: false,
            ADMINNFCID_CLIENT: null,
            confirm_message: null,
            flashMessage: false
        };
        this.arrayholder = [];
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
                    Axios.post()
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
                <View>
                    <Text style={styles.title}>Scan your NFC CARD for borrow confirm</Text>
                    <Image
                        style={{ marginTop: 100 }}
                        source={require('../assets/img/nfc-reading-motion.gif')} /></View>
            </>
            );
    }

}

export default Confirm;
