import React from 'react';
import * as Yup from "yup";
import {Form, Formik} from "formik";
import Input from "../utils/formik/input";

const NewAdminRegister = ({handelSubmit}) => {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
        rePassword: ''
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().min(3, "نام کاربری باید حداقل حاوی سه کاراکتر باشد").required('لطفا نام خود را وارد کنید').trim(),
        lastName: Yup.string().min(3, "نام خانوادگی باید حداقل حاوی سه کاراکتر باشد").required('لطفا نام خانوادگی خود را وارد کنید').trim(),
        email: Yup.string().email('ایمیل وارد شده نامعتبر میباشد').required('لطفا ایمل خود را وارد کنید').trim(),
        userName: Yup.string().min(3, "نام کاربری باید حداقل حاوی سه کاراکتر باشد").required('لطفا نام کاربری خود را وارد کنید').trim(),
        password: Yup.string().min(6, "پسورد باید حداقل حاوی شش کاراکتر باشد").required('لطفا رمز عبور را وارد کنید').trim(),
        rePassword: Yup.string().oneOf([Yup.ref('password'), ''], "رمز عبور با تکرار رمز عبور برابر نیست").required('لطفا تکرار رمز عبور را وارد کنید').trim()
    });
    return (
        <div>
            <Formik initialValues={initialValues}
                    onSubmit={handelSubmit}
                    validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <div className="form-row">
                            <Input name="firstName" classes={"col-md-6"} type="text" label="نام "/>
                            <Input name="lastName" classes={"col-md-6"} type="text" label="نام خانوادگی"/>
                        </div>
                        <div className="form-row">
                            <Input name="userName" classes={"col-md-6"} type="text" label="نام کاربری"/>
                            <Input name="email" classes={"col-md-6"} type="email" label="ایمیل" />
                        </div>
                        <div className="form-row">
                            <Input name="password" classes={"col-md-6"} type="password" label="رمز عبور"/>
                            <Input name="rePassword" classes={"col-md-6"} type="password" label="تکرار رمز عبور"/>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn bt-ice-blue submit-test">ثبت نام</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewAdminRegister;