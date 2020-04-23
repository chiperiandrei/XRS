export const saveCompanyInfo = (company) => {
    return {
        type: 'SAVE_INFO',
        payload: company
    }
}
export const deleteCompanyInfo = () => {
    return {
        type: 'DELETE_INFO'
    }
}
