import React from 'react';
import {useSelector} from "react-redux";
import {Route, Routes, Navigate, useLocation} from "react-router-dom";
const NeedAuth = (props) => {
    const auth = useSelector(state => state.auth);
    const location = useLocation();
    console.log(location)
    // 想返回到之前的目录,NeedAuth知道,因为就是NeedAuth 中的Navigate导过来的
    return auth.isLogged?props.children:<Navigate to={'/auth-form'} replace={true}></Navigate>
};

export default NeedAuth;