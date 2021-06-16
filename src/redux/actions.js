import {REGISTER_USER,LOGIN_USER} from './actionTypes';

export const registerUser = content => ({
    type: REGISTER_USER,
    payload: {
        content
    }
})