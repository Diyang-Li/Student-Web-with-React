import React from 'react';
import MainMenu from "./MainMenu";
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";

const Layout = (props) => {
    return (
        <div>
            <div>
                <MainMenu/>
                <hr/>
                {props.children}
            </div>
        </div>
    );
};

export default Layout;