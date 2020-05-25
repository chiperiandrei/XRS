let borrows = []
export const borrowReducer = (state = borrows, action) => {
    switch (action.type) {
        case 'ADD_BORROW':
            borrows.push(action.payload)
            return borrows
        case 'RESET_BORROW':
            borrows = []
            return borrows
        default:
            return state
    }
}
