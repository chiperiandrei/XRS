import React from "react";
import { WelcomeInfo } from '../assets/styles/HomeApplication';
const HomeApplication = props => {

    return <WelcomeInfo>
        <h1 id="title">Welcome to <span>{props.company.company_name}</span> Reserve System</h1>
        <div id="infos">
            <img src={require('../assets/img/nfc-reading-motion.gif')} id="nfc"/>
            <div>
                <h1>Features</h1>
                <ul>
                    <li>Different roles for users</li>
                    <li>All access is given by access cards</li>
                    <li>Using Android's NFC technology for borrows operations</li>
                    <li>Secure login with JWT Tokens</li>
                    <li>Build with REST API architecture</li>
                </ul>
            </div>
        </div>
    </WelcomeInfo>
};


export default HomeApplication;
