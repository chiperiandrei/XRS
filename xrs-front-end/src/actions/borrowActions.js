export const addBorrow = (borrow) => {
    return {
        type: 'ADD_BORROW',
        payload: borrow
    }
}
export const resetBorrow = () => {
    return {
        type: 'RESET_BORROW'
    }
}
