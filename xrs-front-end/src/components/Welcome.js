import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../actions/userActions";
import { BoxCenter, BoxLeft, BoxRight, ImageSetupGrid, Lately, Submit, TitleImageEvent, WelcomeCenterSide, WelcomeContainer, WelcomeLeftSide, WelcomeRightSide } from "../assets/styles/Dashboard";
import BorrowsHistory from "./BorrowsHistory";
import EditProfile from "./EditProfile";
import { addBorrow ,resetBorrow} from "../actions/borrowActions";
const WelcomeComponent = props => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user_information)
    const [avatar, setAvatar] = useState(null);
    const [current_borrow, setCurrent_borrow] = useState([])
    useEffect(() => {
        if (userInfo)
            Axios.get('https://xrs-borrow-management.herokuapp.com/api/borrows/' + userInfo.id, {
                headers: {
                    "auth-token": localStorage.getItem("user_info").substr(1, localStorage.getItem("user_info").length - 2),
                }
            }).then(res => {
                setCurrent_borrow(res.data)
                dispatch(resetBorrow())
                res.data.map(product => {
                    Axios.get('https://xrs-product-management.herokuapp.com/api/products/' + product.product, {
                        headers: {
                            "auth-token": localStorage.getItem("user_info").substr(1, localStorage.getItem("user_info").length - 2),
                        }
                    }).then(res => {
                        console.log(res.data)
                        dispatch(addBorrow(res.data))
                    })
                        .catch(err => console.log(err))
                })

            })
                .catch(err => console.log(err))

    }, []);

    const handleAvatar = async () => {
        const splitify = userInfo.id
        const formData = new FormData();
        formData.append('avatar', avatar);
        await Axios.post('https://xrs-users-management.herokuapp.com/api/ums/profile/avatar/' + splitify, formData, {
            headers: {
                "auth-token": localStorage.getItem("user_info").substr(1, localStorage.getItem("user_info").length - 2),
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                userInfo.photoPath = "avatars/default.png";
                const token = JSON.stringify(response.data.token)
                localStorage.setItem("user_info", token)
                dispatch(updateToken(response.data.token))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
    const handleDefaultAvatar = async () => {

        await Axios.post('https://xrs-users-management.herokuapp.com/api/ums/profile/default_avatar', {}, {
            headers: {
                "auth-token": localStorage.getItem("user_info").substr(1, localStorage.getItem("user_info").length - 2)
            }
        })
            .then((response) => {
                userInfo.photoPath = "avatars/default.png";
                const token = JSON.stringify(response.data.token)
                localStorage.setItem("user_info", token)
                dispatch(updateToken(response.data.token))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
    if (userInfo.photoPath !== '') {
        return <WelcomeContainer>
            <WelcomeLeftSide>
                <h1>Welcome, {userInfo.firstname} {userInfo.lastname}</h1>
                <img src={`https://xrs-users-management.herokuapp.com/${userInfo.photoPath}`} alt="avatar" id="avatar" />
                {current_borrow !== null ? <h1 id="no-borrows">You have {current_borrow.length} borrows</h1> : null}


            </WelcomeLeftSide>
            <WelcomeCenterSide>
                <EditProfile userInfo={userInfo} />
            </WelcomeCenterSide>
            <WelcomeRightSide><BorrowsHistory /></WelcomeRightSide>
        </WelcomeContainer>
    }
    else {
        return <ImageSetupGrid>
            <TitleImageEvent>We want to made your profile nicest</TitleImageEvent>
            <BoxLeft>
                <span>Choose a photo</span>
                <input type="file" id="avatar" name="avatar" accept="image/*" onChange={e => setAvatar(e.target.files[0])} />
                <Submit onClick={handleAvatar} > Upload</Submit>
            </BoxLeft>
            <BoxCenter>OR</BoxCenter>
            <BoxRight>
                <Lately onClick={handleDefaultAvatar}>Or choose another lately</Lately>

            </BoxRight>
        </ImageSetupGrid>
    }
};


export default WelcomeComponent;
