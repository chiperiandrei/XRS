import React, { useEffect, useState } from "react";
import { WelcomeContainer, WelcomeRightSide, WelcomeLeftSide, TitleImageEvent, BoxLeft, BoxRight, BoxCenter, ImageSetupGrid, Lately, Submit, WelcomeCenterSide } from "../assets/styles/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { updateToken } from "../actions/userActions";
const WelcomeComponent = props => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user_information)
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (ok === true) {
            handleDefaultAvatar();
        }
    }, [ok]);
    const handleDefaultAvatar = async () => {

        await Axios.post('http://localhost:5000/api/ums/profile/default_avatar', {}, {
            headers: {
                "auth-token": localStorage.getItem("user_info").substr(1, localStorage.getItem("user_info").length - 2)
            }
        })
            .then((response) => {
                userInfo.photoPath = "avatars/default.png";
                const token = JSON.stringify(response.data.token)
                localStorage.setItem("user_info", token)
                dispatch(updateToken(response.data.token))
                setOk(true)
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
    if (userInfo.photoPath !== '') {
        return <WelcomeContainer>
            <WelcomeLeftSide>Profile</WelcomeLeftSide>
            <WelcomeCenterSide>
                <img src={`http://localhost:5000/${userInfo.photoPath}`} alt="iamginie" width="100%" height="100%" />
            </WelcomeCenterSide>
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
