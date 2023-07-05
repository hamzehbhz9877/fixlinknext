import React from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {Form, Formik} from "formik";
import Input from "../utils/formik/input";

const ShowInfoModal = ({modal, cancel, dataIn}) => {
    const initialValues = {
        fullName: dataIn.fullName,
        email: dataIn.email,
        subject: dataIn.subject,
        text: dataIn.text
    };
    return (
        <Modal isOpen={modal} fade={false} toggle={cancel} className="modal-f">
            <ModalHeader toggle={cancel}>اطاعات پیام</ModalHeader>
            <ModalBody className="rtl">
                <Formik initialValues={initialValues} onSubmit={""}>
                    {(props) => (
                        <Form>
                            <Input name="fullName" type="text" label="نام و نام خانوادگی" readOnly/>
                            <Input name="email" type="email" label="ایمیل" readOnly/>
                            <Input name="subject" type="text" label="موضوع" readOnly/>
                            <Input name="text" type="text" label="توضیحات" readOnly/>
                            <div className="text-center">
                                <button className="btn bt-ice-blue bt-ice-blue-modal" type="submit" onClick={cancel}>بستن</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
        </Modal>
    );
};

export default ShowInfoModal;