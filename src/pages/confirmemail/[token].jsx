import {useEffect} from 'react';
import {confirmEmail} from "../../../public/services/shortlink";
import {ErrorMessage, SuccessMessage} from "../../../public/redux/actions/tosastify";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";

const Index = () => {
    const router = useRouter();
    const dispatch=useDispatch();

    useEffect(() => {
        sendData()
    }, [router.query]);

    const sendData = async () => {
        const {token} = router.query;
        try {
            const res = await confirmEmail({token});

            if (res.data.statusCode === 0) {
                dispatch(SuccessMessage("حساب کاربری شما فعال شد لطفا وارد شوید"));
                router.replace("/login")
            } else {
                router.replace("/");
                dispatch(ErrorMessage(res.data.Message))
            }
        } catch (e) {
        }
    };

    return null

};

export default Index