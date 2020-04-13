
export const usersReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.payload
        default:
            return state
    }
}