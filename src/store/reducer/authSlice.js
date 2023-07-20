import {createSlice} from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false,
        token: '',
        user: null
    },
    reducers: {
        login(state, action) {
            // console.log(action.token)
            state.isLogged = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            // console.log(state.isLogged)
            // console.log(state.user)
        },
        logout(state, action) {
            state.isLogged = false;
            state.token = '';
            state.user = null;
        }
    }
});

export const {login, logout} = authSlice.actions;