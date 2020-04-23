import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { companyInfoReducer } from './companyInfoReducer';

export const rootReducer = combineReducers({
    user_information: usersReducer,
    company_info: companyInfoReducer
});