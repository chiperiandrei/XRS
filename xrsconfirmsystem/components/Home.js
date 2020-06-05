import React from 'react';
import { Alert, AsyncStorage, Image, StyleSheet, Text, TouchableOpacity, View, BackHandler } from 'react-native';
import axios from 'axios';
import { Colors } from "react-native/Libraries/NewAppScreen";
import Return from "./Return";
import { Button } from 'react-native-elements';
import Confirm from "./Confirm";
import AddUsersAccessCard from "./AddUsersAccessCard";
import AddCard from "./AddCards";

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
        height: '28%',
        width: '80%',
        left: '5%',
        top: '30%'
    },
    textButton: {
        fontSize: 25,
        color: 'white',
        left: '25%',
        top: '13%'
    },
    buttonReserve: {
        backgroundColor: 'green',
        borderRadius: 5,
        marginBottom: 20,
        height: 60
    },
    buttonReturn: {
        backgroundColor: 'red',
        borderRadius: 5,
        height: 60
    },
    container: {
        display: "flex",
        flexDirection: "column",
        marginTop: 20
    },

    buttonAsignNFCID: {
        marginTop: 20,
        borderRadius: 5,
        height: 60
    },
});


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company_name: '',
            created_by: '',
            showReturn: false,
            showConfirm: false,
            showEditUsers: false,
            addCards: false,
        };
    }
    backAction = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: async () => {
                    let keys = ['company_name', 'created_by'];
                    AsyncStorage.multiRemove(keys, (err) => {
                        return BackHandler.exitApp()

                    });

                }
            },], {
            cancelable: false
        }
        )
        return true;
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        AsyncStorage.getItem("company_name").then((value) => {
            this.setState({ "company_name": value });
        })
            .then(res => {
                //
            });
        AsyncStorage.getItem("created_by").then((value) => {
            this.setState({ "created_by": value });
        })
            .then(res => {
                //
            });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        if (this.state.showReturn) {
            return <Return />
        }
        else
            if (this.state.showConfirm) {
                return <Confirm />
            }
            else
                if (this.state.showEditUsers) {
                    return <AddUsersAccessCard />
                } else
                    if (this.state.addCards) {
                        return <AddCard />
                    } else
                        return (<>
                            <View style={{ padding: 20 }}>
                                <Image
                                    style={{ width: 50, height: 50 }}
                                    source={require('../assets/img/logo.png')} />
                                <Text style={styles.title}>{this.state.company_name} Objects Management</Text>
                                <Text style={styles.title}>Hello, {this.state.created_by}</Text>
                            </View>


                            <View style={styles.container}>
                                <Button
                                    buttonStyle={styles.buttonReserve}
                                    icon={{ name: 'check' }}
                                    title='Confirm Reserve'
                                    onPress={() => {
                                        this.setState({ showConfirm: true });
                                    }} />
                                <Button
                                    buttonStyle={styles.buttonReturn}
                                    icon={{ name: 'check', type: 'font-awesome' }}
                                    title='Confirm Return'
                                    onPress={() => {
                                        this.setState({ showReturn: true });
                                    }} />
                                {/* <Button
                                    buttonStyle={styles.buttonAsignNFCID}
                                    icon={{ name: 'id-card', type: 'font-awesome' }}
                                    title='Asign Access Card for Users'
                                    onPress={() => {
                                        this.setState({ showEditUsers: true });
                                    }} /> */}
                                <Button
                                    buttonStyle={styles.buttonAsignNFCID}
                                    icon={{ name: 'id-card', type: 'font-awesome' }}
                                    title='Add Access Cards'
                                    onPress={() => {
                                        this.setState({ addCards: true });
                                    }} />
                            </View>

                        </>
                        );
    }

}

export default Home;
