import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleAdminList} from "../../../../public/services/shortlink";
import {AddNewUser, DeleteAdminUser, GetAllAdminList} from "../../../../public/redux/actions/adminList";
import DeleteModal from "../../../../public/components/modal/deleteModal";
import AddNewAdmin from "../../../../public/components/modal/addNewAdmin";
import NoInfo from "../../../../public/components/noinfoTabel/noInfo";
import HandlePagination from "../../../../public/components/utils/pagination/handlePagination";
import _ from "lodash";

const Index = () => {

        const selector = useSelector(state => state.adminListReducer);
        const loading = useSelector(state => state.loadingReducer);
        const dispatch = useDispatch();

        const [dataIn, setDataIn] = useState(null);

        const [modalNew, setModalNew] = useState(false);
        const [modalDelete, setModalDelete] = useState(false);

        //deleteAdmin
        const submitDelete = () => {
            setModalDelete(false)
            dispatch(DeleteAdminUser(dataIn));
        };

        const cancelDelete = () => {
            setModalDelete(false);
            setDataIn(null)
        }

        const openDelete = (id) => {
            setModalDelete(true);
            setDataIn(id)
        };


        //addNewAdmin
        const submitNew = async (data) => {
            await dispatch(AddNewUser(data))
            setModalNew(false)
        };

        const cancelNew = () => setModalNew(false);

        const openNew = () => {
            setModalNew(true);
        };


        useEffect(() => {
            dispatch(GetAllAdminList(1, ""))
        }, [dispatch]);


        const {handleActiveLink}=HandlePagination();


        return (
            <>
                <h3>لیست کاربران مدیر</h3>
                <section className="main-userDashboardTable dashboard-table">
                    <button className="btn bt-green" onClick={openNew}>
                        افزودن کاربر جدید
                    </button>
                    <div className="table-overflow">
                        <table id="example1" className="table table-striped table-bordered" width="100%">
                            <thead>
                            <tr>
                                <th width="200px">نام کاربری</th>
                                <th width="150px">نام و نام خانوادگی</th>
                                <th width="110px">تعداد لینک ها</th>
                                <th width="200px">تاریخ</th>
                                <th width="80px">وضعیت</th>
                                <th width="60px">حذف</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                !_.isEmpty(selector) && selector.map((user, index) =>
                                    <tr key={index}>
                                        <td>{user.userName}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.countLink}</td>
                                        <td>{user.createAtPersian}</td>
                                        <td>
                                            <label className="switch">
                                                <input id={user.id} onClick={() => handleActiveLink(user.id,toggleAdminList,"کاربر")} type="checkbox"
                                                       defaultChecked={user.isActive}/>
                                                <span className="slider round"/>
                                            </label>
                                        </td>
                                        <td>
                                            <button style={{background: "transparent"}}
                                                    onClick={() => openDelete(user.id)}>
                                                <i className="fa fa-trash" style={{color: "rgb(219,219,219)"}}/>
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {_.isEmpty(selector) && !loading && <NoInfo/>}
                    </div>
                    {modalNew && <AddNewAdmin modal={modalNew} cancel={cancelNew} submit={submitNew} dataIn={dataIn}/>}
                    {modalDelete && <DeleteModal state={2} modal={modalDelete} cancel={cancelDelete} submit={submitDelete}
                                                 dataIn={dataIn}/>}
                </section>
            </>
        );
    }
;

export default Index;