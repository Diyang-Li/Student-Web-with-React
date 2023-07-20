import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/reducer/authSlice";

const MainMenu = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        dispatch(logout());
    }
    return (
        <div>
            <ul>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                {
                    !auth.isLogged &&
                    <li>
                        <Link to={'/auth-form'}>Login/Sigup</Link>
                    </li>
                }

                {auth.isLogged &&
                    <>
                        <li>
                            <Link to={'/profile'}>{auth.user.username}</Link>
                        </li>
                        <li>
                            <Link
                                onClick={logoutHandler}
                                to={'/auth-form'}>Logout</Link>
                        </li>
                    </>

                }

            </ul>
        </div>
    );
};

export default MainMenu;