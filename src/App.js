import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import AuthForm from "./components/AuthForm";
import {useDispatch, useSelector} from "react-redux";
import NeedAuth from "./components/NeedAuth";
import Profile from "./components/Profile";
import {logout} from "./store/reducer/authSlice";
import useAutoLogout from "./hooks/useAutoLogout";
const App = () => {
    useAutoLogout();
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}/>
                    <Route path={'/profile'} element={<NeedAuth><Profile/></NeedAuth>}/>
                    <Route path={'/auth-form'} element={<AuthForm/>}></Route>
                </Routes>
            </Layout>

        </div>
    );
};

export default App;