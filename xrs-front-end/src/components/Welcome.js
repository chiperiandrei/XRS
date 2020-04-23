import React, { useEffect, useState } from "react";
import { WelcomeContainer, WelcomeRightSide, WelcomeLeftSide, TitleImageEvent, BoxLeft, BoxRight, BoxCenter, ImageSetupGrid, Lately, Submit } from "../assets/styles/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { updateToken, forceUpdate } from "../actions/userActions";
import { useHistory } from "react-router-dom";

const useForceUpdate = () => useState()[1];
const WelcomeComponent = props => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user_information)
    const [user, setUser] = useState(userInfo.iat);

    useEffect(() => {
        console.log('actualizare vro')
    }, [user]);
    const handleDefaultAvatar = async () => {

        await Axios.post('http://localhost:5000/api/ums/profile/default_avatar', {
            info: 'infos'
        }, {
            headers: {
                "auth-token": localStorage.getItem("user_info").substr(1, localStorage.getItem("user_info").length - 2)
            }
        })
            .then((response) => {
                console.log(localStorage.getItem('user_info'))
                localStorage.setItem('user_info', JSON.stringify(response.data.token))
                userInfo.photoPath = "avatars/default.png";
                dispatch(updateToken(response.data.token))
                dispatch(forceUpdate())

            })
            .catch((error) => {
                console.log(error.response);
            });
    }
    if (userInfo.photoPath !== "") {
        return <WelcomeContainer>
            <img src={`http://localhost:5000/${userInfo.photoPath}`} alt="iamginie" />
            <WelcomeLeftSide>Profile</WelcomeLeftSide>
            <WelcomeRightSide>Actions</WelcomeRightSide>
        </WelcomeContainer>
    }
    else {
        return <ImageSetupGrid>
            <TitleImageEvent>We want to made your profile nicest</TitleImageEvent>
            <BoxLeft>
                <span>Choose a photo</span>
                <input type="file" id="avatar" name="avatar" accept="image/*" />
                <Submit>Upload</Submit>
            </BoxLeft>
            <BoxCenter>OR</BoxCenter>
            <BoxRight>
                <Lately onClick={handleDefaultAvatar}>Or choose another lately</Lately>
            </BoxRight>
        </ImageSetupGrid>
    }
};


export default WelcomeComponent;
