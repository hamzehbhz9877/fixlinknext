import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Form, Formik} from "formik";
import WInout from "../../../public/components/utils/formik/wInput";
import * as Yup from "yup";
import _ from "lodash"
import {shortViewerLink} from "../../../public/services/shortlink";
import {ErrorMessage, SuccessMessage} from "../../../public/redux/actions/tosastify";


const Index = () => {

    const [dataRes, setDataRes] = useState({});
    const dispatch = useDispatch();

    const initialValues = {
        viewerLink: '',
    };

    const validationSchema = Yup.object({
        viewerLink: Yup.string().url("لینک وارد شده نامعتبر میباشد").required('لطفا لینک کوتاه خود را وارد کنید').trim(),
    });
    const handelSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
        try {
            const res = await shortViewerLink(values.viewerLink.split(".ir/")[1]);
            console.log(res);
            if (res.data.data.statusLinkVisit === 0) {
                setDataRes(res.data.data);
                dispatch(SuccessMessage("اطلاعات با موفقیت دریافت شد"))

            } else {
                dispatch(ErrorMessage("لینک مورد نظر وجود ندارد"))
            }
        } catch (e) {

        }
    }

    return (
        <section className="create">
            <div className="min-w col-md-6 mx-auto viewer-statistics-content">
                <h3 className="text-center">آدرس کوتاه شده را وارد کنید</h3>
                <Formik initialValues={initialValues} onSubmit={handelSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <WInout name="viewerLink" type="url" label={"نمایش"}
                                    placeholder="https://Fixlink.ir/sample-short-url"/>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="card-list">
                {[
                    {key: "تعداد بازدید", value: dataRes.countVisit},
                    {key: "بازدید امروز", value: dataRes.visitToday},
                    {key: "بازدید این هفته", value: dataRes.visitThisWeek},
                    {key: "بازدید این ماه", value: dataRes.visitThisMonth},
                    {key: "تاریخ ساخت لینک", value: dataRes.createAt},
                    {key: "تاریخ آخرین بازدید", value: dataRes.lastDateVisit}
                ].map((value, index) => {
                    return (
                        <div className="card statistics" key={index}>
                            <div className="card-body">
                                <div>
                                    <h6 className="card-title">{value.key}</h6>
                                    <p className="card-text text-center">{_.isEmpty(dataRes) ? "..." :
                                        value.value!==null ? value.value : "..."}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>

    );
};

export default Index;