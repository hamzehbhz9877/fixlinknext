import React from 'react';
import {forgetPassword} from "../../../public/services/shortlink";
import {ErrorMessage, SuccessMessage} from "../../../public/redux/actions/tosastify";
import {useDispatch} from "react-redux";
import {Form,Formik} from "formik";
import Input from "../../../public/components/utils/formik/input";
import * as Yup from "yup";

const Index = () => {


    const dispatch=useDispatch();

    const initialValues={
        email:''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('ایمیل وارد شده نامعتبر میباشد').required('لطفا ایمل خود را وارد کنید').trim(),
    });

    const handelSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
        try {
            const res = await forgetPassword({email:values.email});
            if (res.data.statusCode === 0) {
                dispatch(SuccessMessage("ایمیل فراموشی رمز برای شما ارسال شد"))
            }
        } catch (e) {
            dispatch(ErrorMessage("خطای ناشناخته ای رخ داده است"))
        }
    };

    return (
        <section className="create">
            <div className="forget-password-content min-w-al col-md-4 card">
                <div className="header-title">
                    <h4 className="text-center">تغییر رمز عبور</h4>
                </div>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handelSubmit}>
                  {(props)=>{
                         return <Form>
                              <Input name="email" type="email" label="ایمیل"/>
                              <div className="text-center">
                                  <button type="submit" className="btn bt-ice-blue">تایید</button>
                              </div>
                          </Form>
                      }
                  }
              </Formik>
            </div>
        </section>
    );
};

export default Index;