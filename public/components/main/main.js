import React, {useEffect, useState} from 'react';
import {sendUrl, statistics} from "../../services/shortlink";
import {ErrorMessage, SuccessMessage} from "../../redux/actions/tosastify";
import {useDispatch} from "react-redux";
import {ClearUser} from "../../redux/actions/user";
import {useRouter} from "next/router";
import {Field, Form, Formik} from "formik";
import WInout from "../utils/formik/wInput";
import * as Yup from "yup";
import _ from "lodash";

const Main = () => {

    const [homeInfo, setHomeInfo] = useState({});
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const history = useRouter()

    useEffect(() => {

        const expireDate = localStorage.getItem("date");

        if (expireDate) {
            if (new Date(expireDate) < new Date()) {
                localStorage.clear();
                dispatch(ClearUser());
                history.replace("/login")
            }
        }
    }, []);


    useEffect(() => {
        const getHomeInfo = async () => {
            try {
                const res = await statistics();
                if (res.data.statusCode === 0) {
                    setHomeInfo(res.data.data)
                }
            } catch (e) {
            }
        }
        getHomeInfo()
    }, []);

    const handelSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
        try {
            const res = await sendUrl(values);

            const route = () => history.replace("/shortLink");
            const data = res.data.data;

            switch (data.statusLink) {
                case 0:
                    dispatch(SuccessMessage("لینک کوتاه شده آماده است"));
                    localStorage.setItem("shortLink", data.shortLink);
                    localStorage.setItem("qr", data.qr);
                    route();
                    break;
                case 1:
                    dispatch(SuccessMessage("این لینک قبلا ساخته شده است"));
                    localStorage.setItem("shortLink", data.shortLink);
                    localStorage.setItem("qr", data.qr);
                    route();
                    break;
                case 2:
                    dispatch(ErrorMessage("لینک نانعتبر است"));
                    break;
                case 3:
                    dispatch(ErrorMessage("این لینک توسط شخص دیگری انتخاب شده است"));
                    break;
                case 4:
                    dispatch(ErrorMessage("لینک داده شده حاوی محتوای مستهجن می باشد"));
                    break;
                default:
                    break;
            }

        } catch (e) {
        }

    };
    const initialValues = {
        bigLink: '',
        shortLink:''
    };

    const validationSchema = Yup.object({
        bigLink: Yup.string().url("لینک وارد شده نامعتبر میباشد").required('لطفا لینک اصلی خود را وارد کنید').trim(),
    });

    return (
        <section className="create">
            <div className="min-w col-md-6 mx-auto main-content">
                <h1 className="text-center" style={{fontSize:"22px"}}>لینک خود را وارد کنید</h1>
                <Formik initialValues={initialValues} onSubmit={handelSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <WInout name="bigLink" type="url" label={"کوتاه کن"} placeholder="https://FixLink.ir/sample"/>
                            {show &&
                            <Field name="shortLink">
                                {({field}) => (
                                    <div className="form-group">
                                        <div className="input-group mx-auto custom-link">
                                            <input type="text" placeholder="abc" {...field} className="form-control"/>
                                            <div className="input-group-prepend">
                                                <div className="input-group-text short-link-prepend">
                                                    https://Fixlink.ir/
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Field>
                            }
                            {!show && <div className="d-flex flex-column align-items-center custom-link-btn">
                                <button className="btn bt-ice-blue bt-ice-blue-custom" onClick={() => setShow(true)}>لینک
                                    دلخواه
                                </button>
                                <span className="pt-1" style={{color: "white"}}>
                             <i className="far fa-angle-double-down fa-2x"/></span>
                            </div>}
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="card-list">
                <div className="card banner">
                    <div className="card-body">
                        <div className="link-icon">
                            <i className="fa fa-link"/>
                        </div>
                        <div>
                            <h6 className="card-title">لینک های دائمی</h6>
                            <p className="card-text">{!_.isEmpty(homeInfo) ? homeInfo.countPermanentLink : "..."}</p>
                        </div>

                    </div>
                </div>
                <div className="card banner">
                    <div className="card-body">
                        <div className="link-icon">
                            <i className="fa fa-users"/>
                        </div>
                        <div>
                            <h6 className="card-title">تعداد کاربر ها</h6>
                            <p className="card-text">{!_.isEmpty(homeInfo) ? homeInfo.countUsers : "..."}</p>
                        </div>

                    </div>
                </div>
                <div className="card banner">
                    <div className="card-body">
                        <div className="link-icon">
                            <i className="fa fa-link"/>
                        </div>
                        <div>
                            <h6 className="card-title">لینک های موقت</h6>
                            <p className="card-text">{!_.isEmpty(homeInfo) ? homeInfo.countTemporaryLink : "..."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main