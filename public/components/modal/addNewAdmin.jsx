import React from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import NewAdminRegister from "../newAdminRegister/newAdminRegister";


const AddNewAdmin = ({modal, cancel, submit}) => {

    const handelSubmit = async (values, actions) => {
        submit(values)
        actions.setSubmitting(false);
        actions.resetForm();
    };

    return (

        <Modal isOpen={modal} fade={false} toggle={cancel} className="modal-f">
            <ModalHeader toggle={cancel}>
                افزودن کاربر جدید
            </ModalHeader>
            <ModalBody>
                <NewAdminRegister handelSubmit={handelSubmit}/>
            </ModalBody>
        </Modal>

    );
};

export default AddNewAdmin;