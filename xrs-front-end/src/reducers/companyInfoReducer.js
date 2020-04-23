export const companyInfoReducer = (state = null, action) => {
    switch (action.type) {
        case 'SAVE_INFO':
            window.sessionStorage.setItem("company_info",JSON.stringify(action.payload))
            // localStorage.setItem("company_info", JSON.stringify(action.payload))
            return action.payload
        case 'DELETE_INFO':
            localStorage.setItem("company_info", null)
            state = null;
            return state
        default:
            return state
    }
}
