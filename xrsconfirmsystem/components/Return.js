import React from 'react';
import { View, Text, Alert, Image, StyleSheet, BackHandler, Vibration, FlatList } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import Home from './Home';
import Axios from 'axios';
import { SECRET_CODE, GET_USER_BY_TAG, RETURN_API, PRODUCTS_API } from "react-native-dotenv";
import { ListItem, SearchBar, Badge, ButtonGroup, Button } from 'react-native-elements';


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
            confirmed: false,
            data: [],
            checked: false
        };
        this.arrayholder = [];

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
    returnItem = item => {
        console.log(item)
    }
    _handleItem = ({ item }) => (
        <ListItem

            leftAvatar={{ source: { uri: 'https://xrs-products-management.herokuapp.com/' + item.images[0] } }}
            title={`${item.name}`}
            subtitle={item.category}
            buttonGroup={{ buttons: ['Return'], onPress: () => this.returnItem(item) }}

        />
    )

    scanNFCcard = async () => {
        const trigger = this.triggerNFC();
        NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, this.discoverTag);
    }
    discoverTag = async (tag) => {
        try {
            this.setState({ ADMINNFCID_CLIENT: tag.id });
            Vibration.vibrate(2);
            NfcManager.unregisterTagEvent();
            const { data: { id: user_id } } = await Axios.post(`${GET_USER_BY_TAG}${tag.id}`, {}, {
                headers: {
                    'token': `${SECRET_CODE}`
                }
            })

            const { data: products } = await Axios.get(`${RETURN_API}${user_id}`, {
                headers: {
                    'token': `${SECRET_CODE}`
                }
            })

            let promises = [];
            products.forEach(element => {
                promises.push(this.getProductInfo(element))
            });


            const response_array = await Promise.all(promises)
            this.setState({ data: response_array, confirmed: true })

        } catch (error) {
            console.log("error", error);
        }

    }
    getProductInfo = async product => {

        try {
            const res = await Axios.get(PRODUCTS_API + product, {
                headers: {
                    'token': `${SECRET_CODE}`
                }
            })
            return res.data;
        } catch (error) {
            throw error;
        }
    }






    triggerNFC = async () => {
        try {
            await NfcManager.registerTagEvent();
        } catch (e) {
            console.warn('EXCEPTION', e);
            NfcManager.unregisterTagEvent();
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
                        <Text style={styles.titleConfirmed}>Select products to return</Text>

                        <FlatList
                            data={this.state.data}
                            renderItem={this._handleItem}
                            keyExtractor={item => item._id}
                            ItemSeparatorComponent={this.separatorBoxes}
                            ListHeaderComponent={this.renderHeader}

                        />
                        {/* <Image
                            style={{ marginTop: 100, height: 400, width: 400 }}
                            source={require('../assets/img/return.gif')} /> */}
                    </View>}

            </>
            );

    }

}

export default Return;
