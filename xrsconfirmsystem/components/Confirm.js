import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image, Button, StyleSheet,BackHandler } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import axios from 'axios';
import { Colors } from "react-native/Libraries/NewAppScreen";
import Home from './Home';


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


class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            DURATION: 100,
            NFC_ID: "",
            back: false,
        };
    }

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

    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        if (this.state.back) {
            return <Home />
        } else
            return (<>
                <View style={{ padding: 20 }}>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={require('../assets/img/logo.png')} />
                    <Text style={styles.title}>CONFIRM PAGE</Text>
                </View>
                <View><Text>Hello</Text></View>
            </>
            );
    }

}

export default Confirm;
