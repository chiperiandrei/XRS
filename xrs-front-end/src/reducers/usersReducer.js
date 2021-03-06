import jwt from "jwt-decode";


export const usersReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            localStorage.setItem('user_info', JSON.stringify(action.payload))
            const user = jwt(action.payload)
            return user
        case 'LOAD_USERINFO_FROM_LOCALSTORAGE':
            return jwt.parse(JSON.parse(localStorage.getItem('user_info')))
        case 'LOGOUT_USER':
            localStorage.setItem('user_info', null)
            state = null;
            return state
        case 'UPDATE_TOKEN':
            const newUser = jwt(action.payload)
            return newUser
        default:
            return state
    }
}
