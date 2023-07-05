import {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {ClearUser} from "../../../public/redux/actions/user";
import {SuccessMessage} from "../../../public/redux/actions/tosastify";
import {logoutUser} from "../../../public/services/shortlink";
import {useRouter} from "next/router";

const Index = () => {
    const dispatch = useDispatch();
    const router=useRouter();
    useEffect(() => {
        const logout = async () => {
            try {
                const res = await logoutUser();
                if (res.data.statusCode === 0) {
                    dispatch(ClearUser());
                    localStorage.clear();
                    dispatch(SuccessMessage("شما با موفقیت از حساب کاربری خود خارج شدید"))
                    router.push("/")
                }
            } catch (e) {
            }
        };
        logout()
    }, []);

    return null
};

export default Index