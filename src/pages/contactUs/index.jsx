import React from 'react';
import {SuccessMessage} from "../../../public/redux/actions/tosastify";
import {contactUs} from "../../../public/services/shortlink";
import {useDispatch} from "react-redux";
import {Form, Formik} from "formik";
import TextArea from "../../../public/components/utils/formik/textArea";
import * as Yup from "yup";
import Input from "../../../public/components/utils/formik/input";

const Index = ({history}) => {

    const dispatch = useDispatch();

    const initialValues = {
        fullName: '',
        email: '',
        subject: '',
        text: '',
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().min(3, "نام و خانوادگی باید حداقل حاوی سه کاراکتر باشد").required('لطفا نام و نام خانوادگی خود را وارد کنید').trim(),
        email: Yup.string().email('ایمیل وارد شده نامعتبر میباشد').required('لطفا ایمل خود را وارد کنید').trim(),
        subject: Yup.string().min(3, "موضوع باید حداقل حاوی سه کاراکتر باشد").required('لطفا موضوع خود را وارد کنید').trim(),
        text: Yup.string().required('لطفا توضیحات خود را وارد کنید').trim(),
    });

    const handelSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
        try {
            const res = await contactUs(values);
            if (res.data.statusCode === 0) {
                dispatch(SuccessMessage("درخواست شما با موفقیت ارسال شد"));

                history.push("/")
            }
        } catch (e) {
        }
    };

    return (
        <section className="create">
            <div className="contactUs-content min-w-ar col-md-4 card">
                <div className="header-title">
                    <h4 className="text-center">تماس با ما</h4>
                </div>
                <Formik initialValues={initialValues}
                        onSubmit={handelSubmit}
                        validationSchema={validationSchema}>

                    {(props) => (
                        <Form>
                            <div className="form-row">
                                <Input name="fullName" classes={"col-md-6"} type="text" label="نام و نام خانوادگی"/>
                                <Input name="email" classes={"col-md-6"} type="email" label="ایمیل"/>
                            </div>
                            <Input name="subject" type="text" label="موضوع"/>
                            <TextArea name="text" type="text" label="توضیحات"/>
                            <div className="text-center">
                                <button type="submit" className="btn bt-ice-blue">ثبت</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
};

export default Index;