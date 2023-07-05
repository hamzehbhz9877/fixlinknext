import React from "react";
import {useDispatch} from "react-redux";
import {ErrorMessage, SuccessMessage} from "../../../public/redux/actions/tosastify";
import {AddUser} from "../../../public/redux/actions/user";
import {LoginUser} from "../../../public/services/userService";
import {useRouter} from "next/router";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Input from "../../../public/components/utils/formik/input";
import ActiveLink from "../../../public/components/NavLink/activeLink";
import _ from "lodash"
const Index = () => {

    const dispatch = useDispatch();
    const router = useRouter();


    const initialValues = {
        userName: '',
        password: ''
    };

    const validationSchema = Yup.object({
        userName: Yup.string().min(3, "نام کاربری باید حداقل حاوی سه کاراکتر باشد").required('لطفا نام کاربری خود را وارد کنید').trim(),
        password: Yup.string().min(6, "پسورد باید حداقل حاوی شش کاراکتر باشد").required('لطفا پسورد خود را وارد کنید').trim(),
    });

    const handelSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
        try {
            const res = await LoginUser(values);
            const date = new Date();
            if (res.data.statusCode === 0) {
                dispatch(SuccessMessage("شما با موفقیت وارد حساب کاربری خود شدید"));
                localStorage.setItem("token", res.data.data.jwt);
                localStorage.setItem("user", res.data.data.userName);
                localStorage.setItem("date", date.setDate(date.getDate() + 1));
                if (res.data.data.role)
                    localStorage.setItem("Ro", res.data.data.role);
                dispatch(AddUser({username: res.data.data.userName}));

                router.replace("/");
            } else {
                dispatch(ErrorMessage(res.data.Message))
            }
        } catch (e) {
        }
    };
    if (typeof window !== 'undefined') {
        const state=localStorage.getItem('user');
        if (!_.isEmpty(state)) {
            router.push("/")
            return null
        }
    }
    return (
        <section className="create">
            <div className="login-content min-w-al col-md-4 card">
                <div className="header-title">
                    <h4 className="text-center un-after">ورود به حساب کاربری</h4>
                </div>
                <Formik initialValues={initialValues}
                        onSubmit={handelSubmit}
                        validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Input name="userName" type="text" label="نام کاربری یا رمز عبور"/>
                            <Input name="password" type="password" label="رمز عبور"/>
                            <div className="text-center">
                                <button type="submit" className="btn bt-ice-blue submit-test">ورود</button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="text-center tyu">
                    <div className="have-account">

                        <ActiveLink  activeClassName="" href="/register">
                            <a  className="nav-link register">ثبت نام</a>
                        </ActiveLink>
                    </div>
                    <div className="forget-password">
                        <p>رمز عبور خود را فراموش کردید؟</p>
                        &nbsp;
                        <ActiveLink className="register" activeClassName="" href="/forgetPassword">
                            <a className="nav-link"> کلیک کنید</a>
                        </ActiveLink>
                    </div>
                </div>
            </div>
        </section>
    )
};


export default Index