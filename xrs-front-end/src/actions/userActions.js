export const logInUser = (user) => {
    return {
        type: 'LOGIN_USER',
        payload: user
    }
}
export const logOutUser = () => {
    return {
        type: 'LOGOUT_USER'
    }
}
