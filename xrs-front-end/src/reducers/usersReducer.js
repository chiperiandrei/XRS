const initialState = {
    users: [],
    loading: true
}
export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            const newState = Object.assign({},state);
            newState.users.push(action.payload)
            return newState
        case 'REMOVE_USER':
            return state
        default:
            return state
    }
}