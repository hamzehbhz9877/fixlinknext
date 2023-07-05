import React from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';

const DeleteModal = ({modal, submit, cancel, dataIn, state}) => {


    const stateD = () => {
        let res;
        switch (state) {
            case 1:
                res = "حذف پیام";
                break;
            case 2:
                res = "حذف کاربر";
                break;
            case 3:
                res = "حذف اطلاعیه";
                break;
            default:
                res = "حذف لینک";
                break;
        }
        return res
    };


    return (
        <Modal isOpen={modal} fade={false} toggle={cancel} className="modal-f">
            <ModalHeader toggle={cancel}>
                {stateD()}
            </ModalHeader>
            <ModalBody className="rtl">
                <p>آیا میخواهید {dataIn} را حذف کنید؟</p>
                <div className="text-center">
                    <button className="btn bt-ice-blue bt-ice-blue-modal" type="submit" onClick={submit}>تایید</button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default DeleteModal;