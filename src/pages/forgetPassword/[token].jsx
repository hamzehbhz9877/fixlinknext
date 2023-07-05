import React from 'react';
import {submitForgetPassword} from "../../../public/services/shortlink";
import {ErrorMessage, SuccessMessage} from "../../../public/redux/actions/tosastify";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {Form, Formik} from "formik";
import Input from "../../../public/components/utils/formik/input";
import * as Yup from "yup";

const Token = () => {
    const router = useRouter();
    const dispatch=useDispatch();

    const initialValues = {
        newPassword: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        newPassword: Yup.string().min(6, "پسورد باید حداقل حاوی شش کاراکتر باشد").required('لطفا رمز عبور را وارد کنید').trim(),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), ''], "رمز عبور با تکرار رمز عبور برابر نیست").required('لطفا تکرار رمز عبور را وارد کنید').trim()
    });

    const handelSubmit = async (values, actions) => {
        const {token} = router.query;
        actions.setSubmitting(false);
        actions.resetForm();
        try {
            const res = await submitForgetPassword({...values,token});
            if (res.data.statusCode === 0) {
                dispatch(SuccessMessage("رمز عبور شما با موفقیت تغییر یافت"));
                router.replace("/login")
            }
            else {
                dispatch(ErrorMessage(res.data.Message))
            }
        } catch (e) {
        }
    };

    return (
        <section className="create">
            <div className="submit-fp-content min-w-al col-md-4 card">
                <div className="header-title">
                    <h4 className="text-center">تغییر رمز عبور</h4>
                </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handelSubmit}>
                    {(props)=>{
                           return <Form>
                                <Input name="newPassword" type="password" label="رمز عبور"/>
                                <Input name="confirmPassword" type="password" label="تکرار رمز عبور"/>
                                <div className="text-center">
                                    <button type="submit" className="btn bt-ice-blue">ورود</button>
                                </div>
                            </Form>
                        }
                    }
                </Formik>
            </div>
        </section>
    );
};

export default Token;