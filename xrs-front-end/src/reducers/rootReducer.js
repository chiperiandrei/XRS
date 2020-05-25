import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { companyInfoReducer } from './companyInfoReducer';
import { borrowReducer } from './borrowReducer'

export const rootReducer = combineReducers({
    user_information: usersReducer,
    company_info: companyInfoReducer,
    borrows: borrowReducer
});