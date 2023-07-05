import React, {useEffect, useState} from 'react';
import Paginate from "../../../../public/components/utils/pagination";
import DeleteModal from "../../../../public/components/modal/deleteModal";
import {useDispatch, useSelector} from "react-redux";
import HandlePagination from "../../../../public/components/utils/pagination/handlePagination";
import {
    CreateNewNotification,
    DeleteNotification,
    EditNotification,
    GetAllPost,
} from "../../../../public/redux/actions/post";


import SearchPanel from "../../../../public/components/searchPanel/searchPanel";
import NoInfo from "../../../../public/components/noinfoTabel/noInfo";
import _ from "lodash";

import dynamic from 'next/dynamic'

const EditNewNotification = dynamic(
    () => import("../../../../public/components/modal/editNewNotification"),
    {ssr: false}
)

const Index = () => {
    const selector = useSelector(state => state.postReducer);
    const dispatch = useDispatch();

    const [dataIn, setDataIn] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalNewEdit, setModalNewEdit] = useState(false);

    useEffect(() => {
        dispatch(GetAllPost(currPage, ""));
    }, []);

    const editSubmit = async (data) => {
        dispatch(EditNotification(data, data.id))
        setModalNewEdit(false)
    }
    const newSubmit = async (data) => {
        dispatch(CreateNewNotification(data));
        setModalNewEdit(false)
    }

    const cancelEditNew = () => setModalNewEdit(false);
    const openEditNew = (data) => {
        setDataIn(data);
        setModalNewEdit(true);
    };

    const submitDelete = () => {
        dispatch(DeleteNotification(dataIn));
        setModalDelete(false);
    };
    const cancelDelete = () => {
        setModalDelete(false);
    };

    const openDelete = (id) => {
        setModalDelete(true);
        setDataIn(id)
    };

    const {
        se, currPage,
        handleCurrentPage, handleNextPage, handlePrevPage, handleFilter, handleSendData
    } = HandlePagination(GetAllPost);


    return (
        <>
            <section className="main-userDashboardTable dashboard-table">
                <SearchPanel title={"اطلاعیه"} label={"اطلاعیه"} handleSendData={handleSendData}
                             handleFilter={handleFilter} se={se}/>
                <button className="btn bt-green" onClick={() => openEditNew({})}>
                    افزودن اطلاعیه جدید
                </button>
                <div className="table-overflow">
                    <table id="example1" className="table table-striped table-bordered" width="100%">
                        <thead>
                        <tr>
                            <td width="200px">عنوان</td>
                            <th width="200px">تاریخ</th>
                            <th width="60px">حذف</th>
                            <th width="90px">ویرایش</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            !_.isEmpty(selector) && selector.notifications.map((notification, index) =>
                                <tr key={index}>
                                    <td>{notification.title}</td>
                                    <td>{notification.createAtPersian}</td>
                                    <td>
                                        <button style={{background: "transparent"}}
                                                onClick={() => openDelete(notification.id)}>
                                            <i className="fa fa-trash" style={{color: "rgb(219,219,219)"}}/>
                                        </button>
                                    </td>
                                    <td>
                                        <button style={{background: "transparent"}}
                                                onClick={() => openEditNew(notification)}>
                                            <i className="fa fa-edit" style={{color: "rgb(219,219,219)"}}/>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {!_.isEmpty(selector) && _.isEmpty(selector.notifications) && <NoInfo/>}
                </div>

                {
                    (selector.pages && selector.pages > 1) ?
                        <Paginate pageNumber={selector.pages} handleCurrentPage={handleCurrentPage}
                                  nextPage={handleNextPage}
                                  prevPage={handlePrevPage}
                                  currentPage={currPage}
                        /> : ""
                }
            </section>
            {modalNewEdit && <EditNewNotification modal={modalNewEdit} cancel={cancelEditNew} submitEdit={editSubmit}
                                                  submitNew={newSubmit}
                                                  dataIn={dataIn}/>}
            {modalDelete && <DeleteModal modal={modalDelete} cancel={cancelDelete} submit={submitDelete} dataIn={dataIn}
                                         state={3}
            />}
        </>
    );
}

export default Index;
