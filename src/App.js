import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import AuthForm from "./components/AuthForm";
import {useSelector} from "react-redux";
import NeedAuth from "./components/NeedAuth";
import Profile from "./components/Profile";
const App = () => {
    const auth = useSelector(state => state.auth);
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