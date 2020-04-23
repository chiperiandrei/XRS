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

export const updateToken = (token) => {
    return {
        type: 'UPDATE_TOKEN',
        payload: token
    }
}
export const forceUpdate = () => {
    return {
        type: 'LOAD_USERINFO_FROM_LOCALSTORAGE'
    }
}