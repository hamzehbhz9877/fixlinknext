import React from 'react';
import CloseFilter from "../utils/filter/closeFilter";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

const SearchPanel = ({title, handleSendData, label, handleFilter, se, userPanelDashboard, userPanelqrCode}) => {

    const initialValues = {
        search: '',
    };
    const validationSchema = Yup.object({
            search: (userPanelDashboard || userPanelqrCode) ?
                Yup.string().url("لینک وارد شده نامعتبر میباشد").required('لطفا فیلد مورد نظر خود را را وارد کنید').trim()
                : Yup.string().required('لطفا فیلد مورد نظر خود را را وارد کنید').trim()

        })
    const handelSubmit = async (values, actions) => {
        if (userPanelDashboard || userPanelqrCode) {
            const data = {
                search: values.search.split(".ir/")[1]
            };
            handleSendData(data, actions)
        } else {
            handleSendData(values, actions)
        }
    };

    return (
        <div className="d-flex justify-content-between flex-wrap align-items-center search-wrapper">
            <div>
                <h3> جدول {title} ها </h3>
                <p> در این قسمت شما میتوانید جزییات دقیق {title} های
                    قرار داده شده را مشاهده کنید</p>
            </div>
            <div className="search-filter card">
                <Formik initialValues={initialValues}
                        onSubmit={handelSubmit}
                        validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field name="search">
                                {({
                                      field,
                                      form: {handleReset},
                                      meta,
                                  }) => (
                                    <>
                                        <div className="d-flex sed">
                                            <div className="form__div flex">
                                                <CloseFilter se={se} handleFilter={handleFilter} search={meta.value}
                                                             reset={handleReset}/>
                                                <input type={(userPanelDashboard || userPanelqrCode) ? "url" : "text"}
                                                       className={`form__input padding-search-close ${(userPanelDashboard || userPanelqrCode)?"s-left":""} ${meta.error && meta.touched ? "error" : ""} ${meta.touched && !meta.error ? "success" : ""}`}
                                                       placeholder=" " {...field} />
                                                <label htmlFor="" className="form__label">{label}</label>
                                                {meta.touched && meta.error && (
                                                    <span className="error error-panel">{meta.error}</span>
                                                )}
                                            </div>
                                            <div className="btn-search-panel">
                                                <button type="submit" style={{fontSize: "13px"}}
                                                        className="btn bt-filter">جستجو
                                                </button>
                                            </div>
                                        </div>

                                    </>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SearchPanel;