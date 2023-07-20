import {createSlice} from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return {
                isLogged: false,
                token: '',
                user: null
            }
        }else{
            return {
                isLogged: true,
                token: localStorage.getItem('token'),
                user: JSON.parse(localStorage.getItem('user'))
            }
        }


    },
    reducers: {
        login(state, action) {
            // console.log(action.token)
            state.isLogged = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            // console.log(state.isLogged)
            // console.log(state.user)
            localStorage.setItem('token', state.token);
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        logout(state, action) {
            state.isLogged = false;
            state.token = '';
            state.user = null;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
});

export const {login, logout} = authSlice.actions;