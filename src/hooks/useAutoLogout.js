import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {logout} from "../store/reducer/authSlice";

const useAutoLogout = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    useEffect(() => {
        const timeout = auth.expirationTime - Date.now();
        // if already samall then 600, just return directly
        if (timeout < 600) {
            dispatch(logout());
            return;
        }
        // else count seconds
        const timer = setTimeout(() => {
            dispatch(logout());
        }, timeout);

        return () => {
            // to avoid more then one timer
            clearTimeout(timer);
        }
    }, [auth])
}

export default useAutoLogout;