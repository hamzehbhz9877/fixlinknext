import React, {useEffect} from "react";
import {RegisterUser} from "../../../public/services/userService";
import {ErrorMessage} from "../../../public/redux/actions/tosastify";
import {useDispatch} from "react-redux";
import NewAdminRegister from "../../../public/components/newAdminRegister/newAdminRegister";
import {useRouter} from "next/router";
import ActiveLink from "../../../public/components/NavLink/activeLink";
import _ from "lodash"

const Index = () => {

        const router = useRouter();

        const dispatch = useDispatch();

        const handelSubmit = async (values, actions) => {
            actions.setSubmitting(false);
            actions.resetForm();
            try {
                const res = await RegisterUser(values);
                if (res.data.statusCode === 0) {
                    router.push("/submitAccount");
                } else {
                    dispatch(ErrorMessage(res.data.Message, dispatch))
                }
            } catch (e) {
                dispatch(ErrorMessage("خطای ناشناخته ای رخ داده است"))
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
                <div className="register-content col-md-7 min-w-ar card">
                    <div className="header-title">
                        <h4 className="text-center">ثبت نام</h4>
                    </div>
                    <NewAdminRegister handelSubmit={handelSubmit}/>
                    <div className="have-account text-center">
                        <p>آیا قبلا ثبت نام کرده اید؟</p>
                        &nbsp;
                        <ActiveLink activeClassName="" href="/login">
                            <a className="nav-link">وارد شوید</a>
                        </ActiveLink>
                    </div>
                </div>
            </section>
        )

    }
;
export default Index;