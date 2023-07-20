import {createSlice} from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return {
                isLogged: false,
                token: '',
                user: null,
                expirationTime:0 // Login expire time
            }
        }else{
            return {
                isLogged: true,
                token: localStorage.getItem('token'),
                user: JSON.parse(localStorage.getItem('user')),
                expirationTime:+localStorage.getItem('expirationTime')
            }
        }


    },
    reducers: {
        login(state, action) {
            // console.log(action.token)
            state.isLogged = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            //get current time
            const currentTime = Date.now();
            //set valid login time
            const timeout = 1000 * 60;
            // console.log(state.isLogged)
            // console.log(state.user)
            state.expirationTime = currentTime+timeout;

            localStorage.setItem('token', state.token);
            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('expirationTime', state.expirationTime + "");
        },
        logout(state, action) {
            state.isLogged = false;
            state.token = '';
            state.user = null;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('expirationTime');
        }
    }
});

export const {login, logout} = authSlice.actions;