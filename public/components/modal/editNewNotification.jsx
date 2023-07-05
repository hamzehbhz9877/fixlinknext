import React, {useEffect} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import ReactHtmlParser from "react-html-parser";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Input from "../utils/formik/input";
import _ from "lodash"
import dynamic from "next/dynamic";

const Editor = dynamic(
    () => import('../ckConfig/editor'),
    {ssr: false}
)
const EditNewNotification = ({modal, cancel, submitEdit, submitNew, dataIn}) => {


    const handelSubmit = async (values, actions) => {

        actions.setSubmitting(false);
        actions.resetForm();
        ReactHtmlParser(values.text, (node) => {
            values.text = node.data
        });
        if (_.isEmpty(dataIn)) {
            console.log(values);
            submitNew(values);
            return null;
        }
        submitEdit({...values, id: dataIn.id, createAtPersian: dataIn.createAtPersian})
    };
    let initialValues = {
        title: '',
        text: ''
    };

    useEffect(() => {
        if (!_.isEmpty(dataIn)) {
            initialValues.title = dataIn.title;
            initialValues.text = dataIn.text;
        }
    }, []);


    const validationSchema = Yup.object({
        title: Yup.string().min(3, "عنوان باید حداقل حاوی سه کاراکتر باشد").required('لطفا عنوان خود را وارد کنید').trim(),
        text: Yup.string().required('لطفا متن خود را وارد کنید').trim(),
    });


    return (
        <Modal isOpen={modal} fade={false} toggle={cancel} className="modal-f">
            <ModalHeader toggle={cancel}>
                افزودن اطلاعیه جدید
            </ModalHeader>
            <ModalBody>
                <Formik initialValues={initialValues}
                        onSubmit={handelSubmit}
                        validationSchema={validationSchema}>
                    {(props) => {
                        const touched = () => {
                            props.setTouched({text: true, title: true})
                        };
                        const error = props.errors && props.touched.text;

                        return (
                            <Form>
                                <Input label="عنوان" name="title" type="text" onBlur={touched}/>
                                <Editor {...props} error={error} touched={touched}/>
                                <div className="text-center">
                                    <button className="btn bt-ice-blue bt-ice-blue-modal" type="submit">تایید
                                    </button>
                                </div>
                            </Form>
                        )
                    }

                    }
                </Formik>
            </ModalBody>
        </Modal>
    )
}

export default EditNewNotification;