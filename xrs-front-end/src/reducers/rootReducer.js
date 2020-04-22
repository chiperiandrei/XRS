import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';

export const rootReducer = combineReducers({
    user_information: usersReducer
});