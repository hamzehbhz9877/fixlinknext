import {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {ClearUser} from "../redux/actions/user";
import {SuccessMessage} from "../redux/actions/tosastify";
import {logoutUser} from "../services/shortlink";

export const LogoutPP = (history) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const logout = async () => {
            try {
                const res = await logoutUser();
                if (res.data.statusCode === 0) {
                    localStorage.clear();
                    dispatch(ClearUser());
                    dispatch(SuccessMessage("رمز شما با موفقیت تغییر کرد"));
                    history.push("/account/login")
                }
            } catch (e) {
            }
        };
        logout()
    }, [history])

    return null
};

