import React from 'react';
import {changePassword} from "../../services/shortlink";
import {LogoutPP} from "../logoutPP";
import {Form, Formik} from "formik";
import Input from "../utils/formik/input";
import * as Yup from "yup";
import {useRouter} from "next/router";


const ChangePassword = () => {


    const router = useRouter();
    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        oldPassword: Yup.string().min(6, "پسورد باید حداقل حاوی شش کاراکتر باشد").required('لطفا رمز عبور را وارد کنید').trim(),
        newPassword: Yup.string().min(6, "رمز عبور جدید باید حداقل حاوی شش کاراکتر باشد").required('لطفا رمز عبور جدید را وارد کنید').trim(),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), ''], "رمز عبور جدید با تکرار رمز عبور جدید برابر نیست").required('لطفا تکرار رمز عبور جدید را وارد کنید').trim()
    });
    const handelSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
        try {
            const res = await changePassword(values);
            if (res.data.statusCode === 0) {
                LogoutPP(router);
            }
        } catch (e) {
        }

    };

    return (
        <section className="create">
            <div>
                <div className="text-center">
                    <h3>تغییر رمز عبور</h3>
                    <p>در این قسمت شما میتوانید رمز عبور خود را در صورت نیاز تغییر دهید</p>
                </div>
                <div className="login-content min-w-al col-md-4">
                    <div className="header-title">
                        <h4 className="text-center un-after">تغییر رمز</h4>
                    </div>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handelSubmit}>
                        {(props) => {
                            return <Form>
                                <Input name="oldPassword" type="password" label="رمز فعلی"/>
                                <Input name="newPassword" type="password" label="رمز عبور جدید"/>
                                <Input name="confirmPassword" type="password" label="تکرار رمز عبور جدید"/>
                                <div className="text-center">
                                    <button type="submit" className="btn bt-ice-blue submit-test">ثبت</button>
                                </div>
                            </Form>
                        }
                        }
                    </Formik>
                </div>
            </div>

        </section>
    );
};

export default ChangePassword