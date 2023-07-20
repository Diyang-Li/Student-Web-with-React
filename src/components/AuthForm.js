import React, {useRef, useState} from 'react';
import AuthPage from "../pages/AuthPage";
import {useLoginMutation, useRegisterMutation} from "../store/api/authApi";
import {useDispatch} from "react-redux";
import {login} from "../store/reducer/authSlice";
import {useNavigate} from 'react-router-dom';


const AuthForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    //Register
    const  [regFn, {error:regError}] = useRegisterMutation();
    const [loginFn, {error: loginError}] = useLoginMutation();
    // console.log(register)

    const usernameInp = useRef();
    const pwdInp = useRef();
    const emailInp = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e)=>{
        e.preventDefault();
        const username = usernameInp.current.value;
        const password = pwdInp.current.value;

        if(isLoginForm){
            loginFn({
                identifier: username,
                password
            }).then(res =>{
                if(!res.error){
                    // console.log(res.data.jwt)
                    dispatch(login(
                        {
                        token: res.data.jwt,
                        user: res.data.user
                    }))

                    navigate('/profile',{replace: true})
                }
            });
        }else{
            const email = emailInp.current.value;
            // console.log(email);
            regFn({
                username,
                password,
                email
            }).then(res =>{
                if (!res.error){
                    setIsLoginForm(true);
                }
            });
        }
    }
    const changeToSignupHandler = (e)=>{
        e.preventDefault();
        setIsLoginForm(prevState => !prevState);
    }

    return (
        <div>
            <p style={{color:"red"}}>
                {regError && regError.data.error.message}
                {loginError && loginError.data.error.message}
            </p>
            <h2>{isLoginForm? "Login":"Signup"}</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input ref={usernameInp} type={"text"} placeholder={"Username"}/>
                </div>
                <div>
                    {
                        !isLoginForm && <input type={"email"} ref={emailInp} placeholder={"Email"}/>
                    }
                </div>

                <div>
                    <input ref={pwdInp} type={"password"} placeholder={"Password"}/>
                </div>
                <div>
                    {
                        isLoginForm? <button>Login</button>:<button>Signup</button>
                    }
                    <a href={"#"} onClick={changeToSignupHandler}>
                        {
                            isLoginForm?"Signup":"Login"
                        }
                    </a>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;