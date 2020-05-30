import React from 'react';
import { View, Text, ToastAndroid, Alert, Image, Button, StyleSheet, BackHandler, FlatList, ActivityIndicator, Vibration } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import axios from 'axios';
import { Colors } from "react-native/Libraries/NewAppScreen";
import Home from './Home';
import Axios from 'axios';
import { GET_USERS, SECRET_CODE, ADD_NFC_TAG } from "react-native-dotenv";
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

class AddUsersAccessCard extends React.Component {
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
    fetchUsers = () => {
        this.setState({ loading: true });
        Axios.post(`${GET_USERS}`, null, {
            headers: {
                token: `${SECRET_CODE}`
            }
        })
            .then(response => {
                this.setState({
                    data: response.data,
                    error: null,
                    loading: false,
                });
                this.arrayholder = response.data;
            })
            .catch(e => console.log(e))
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        this.fetchUsers();

    }

    componentWillUnmount() {
        this.backHandler.remove();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }
    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Search for...."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />
        );
    };
    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.email.toUpperCase()} ${item.lastName.toUpperCase()} ${item.firstName.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };
    separatorBoxes = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };
    _onPressItem = (item) => {
        this.scanNFCcard()
        this._showModal(item);
    };
    _showModal = (item) => this.setState({
        modal_active: true,
        user_firstName: item.firstName,
        user_lastName: item.lastName,
        user_email: item.email,
        user_avatarpath: item.avatarPath,
    })
    _handleItem = ({ item }) => (
        <ListItem
            leftAvatar={{ source: { uri: 'https://xrs-users-management.herokuapp.com/' + item.avatarPath } }}
            title={`${item.firstName} ${item.lastName}`}
            subtitle={item.email}
            onPress={() => this._onPressItem(item)}
        />
    )
    closeFlashMessage() {
        this.setState({
            flashMessage: false
        })
    }

    saveChanges = () => {
        Axios.post(`${ADD_NFC_TAG}${this.state.user_email}`, {
            tag: this.state.ADMINNFCID_CLIENT
        }, {
            headers: {
                token: `${SECRET_CODE}`
            }
        })
            .then(res => {
                this.setState({
                    flashMessage: true,
                    confirm_message: res.data
                }, () => { setTimeout(() => this.closeFlashMessage(), 3000) })
            })
            .catch(err => {
                this.setState({
                    flashMessage: true,
                    confirm_message: err
                }, () => { setTimeout(() => this.closeFlashMessage(), 3000) })
            })
        this.setState({ modal_active: false, ADMINNFCID_CLIENT: null })
    }


    render() {
        if (this.state.back) {
            return <Home />
        } else
            return (<>
                <Modal testID={'modal'} isVisible={this.state.modal_active} animationIn='bounceInDown'>
                    {this.state.ADMINNFCID_CLIENT !== null ?
                        <View style={styles.content}>
                            <Image
                                style={styles.tinyLogo}
                                source={{ uri: 'https://xrs-users-management.herokuapp.com/' + this.state.user_avatarpath }}
                            />
                            <Text style={styles.contentTitle}>{this.state.user_firstName}</Text>
                            <Text style={styles.contentTitle} >{this.state.user_lastName}</Text>
                            <Text style={styles.contentTitle}>{this.state.user_email}</Text>
                            {/* <Text style={styles.contentTitle}>{this.state.user_avatarpath}</Text> */}
                            <Text>{this.state.ADMINNFCID_CLIENT !== null ? 'TAG ID ' + this.state.ADMINNFCID_CLIENT : null}</Text>
                            <Button testID={'close-button'} onPress={this.saveChanges} title="SAVE" />

                        </View>
                        :
                        <View style={styles.content}>
                            <Image
                                style={styles.tinyLogo}
                                source={{ uri: 'https://xrs-users-management.herokuapp.com/' + this.state.user_avatarpath }}
                            />
                            <Text style={styles.contentTitle}>{this.state.user_firstName}</Text>
                            <Text style={styles.contentTitle} >{this.state.user_lastName}</Text>
                            <Text style={styles.contentTitle}>{this.state.user_email}</Text>
                            {/* <Text style={styles.contentTitle}>{this.state.user_avatarpath}</Text> */}
                            <Text>{this.state.ADMINNFCID_CLIENT !== null ? this.state.ADMINNFCID_CLIENT : null}</Text>
                            {/* <Button testID={'close-button'} onPress={this.scanNFCcard()} title="SCAN" /> */}
                            <Image
                                style={{ width: 200, height: 200 }}
                                source={require('../assets/img/nfc-reading-motion.gif')} />

                        </View>}
                </Modal>
                <View style={{ padding: 20 }}>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={require('../assets/img/logo.png')} />
                    <Text style={styles.title}>Asign Users Access Card</Text>
                </View>
                <View>
                    {this.state.flashMessage == true ?
                        <Text>{this.state.confirm_message}</Text>
                        :
                        null
                    }
                    <FlatList
                        data={this.state.data}
                        renderItem={this._handleItem}
                        keyExtractor={item => item.email}
                        ItemSeparatorComponent={this.separatorBoxes}
                        ListHeaderComponent={this.renderHeader}

                    /></View>
            </>
            );
    }

}

export default AddUsersAccessCard;
