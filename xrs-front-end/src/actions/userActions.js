export const logInUser = (user) => {
    return {
        type: 'LOGIN_USER',
        payload: user
    }
}