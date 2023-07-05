import React from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {Form, Formik} from "formik";
import Input from "../utils/formik/input";
import * as Yup from "yup";

const EditModal = ({modal, cancel, submit}) => {


    const handelSubmit = async (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
        submit(values)
    };

    const initialValues = {
        newPassword: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        newPassword: Yup.string().min(6, "رمز عبور باید حداقل حاوی سه کاراکتر باشد").required('لطفا رمز عبور خود را وارد کنید').trim(),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), ''], 'رمز عبور با تکرار رمز عبور برابر نیست').required('لطفا تکرار رمز عبور خود را وارد کنید').trim()
    });

    return (
        <Modal isOpen={modal} fade={false} toggle={cancel} className="modal-f">
            <ModalHeader toggle={cancel}>
                ویرایش رمز کاربر
            </ModalHeader>
            <ModalBody>
                <Formik initialValues={initialValues}
                        onSubmit={handelSubmit}
                        validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Input name="newPassword" type="password" label="رمز عبور جدید"/>
                            <Input name="confirmPassword" type="password" label="تکرار رمز عبور جدید"/>
                            <div className="text-center">
                                <button className="btn bt-ice-blue bt-ice-blue-modal" type="submit">تایید</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </ModalBody>

        </Modal>
    );
};

export default EditModal;