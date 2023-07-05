import React, {useEffect, useState} from 'react';
import {changePasswordUsers, toggleActiveUsers} from "../../../../public/services/shortlink";
import {SuccessMessage} from "../../../../public/redux/actions/tosastify";
import Paginate from "../../../../public/components/utils/pagination";
import {useDispatch, useSelector} from "react-redux";
import DeleteModal from "../../../../public/components/modal/deleteModal";
import {DeleteUserList, GetAllUserList} from "../../../../public/redux/actions/userList";
import EditModal from "../../../../public/components/modal/editModal";
import HandlePagination from "../../../../public/components/utils/pagination/handlePagination";
import SearchPanel from "../../../../public/components/searchPanel/searchPanel";
import NoInfo from "../../../../public/components/noinfoTabel/noInfo";
import _ from "lodash";

const Index = () => {

    const selector = useSelector(state => state.userListReducer);
    const dispatch = useDispatch();

    const [dataIn, setDataIn] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    useEffect(() => {
        dispatch(GetAllUserList(currPage, ""))
    }, []);

    const submitDelete = () => {
        dispatch(DeleteUserList(dataIn));
        setModalDelete(false)
    };
    const cancelDelete = () => setModalDelete(false);
    const openDelete = (id) => {
        setModalDelete(true);
        setDataIn(id)
    };
    const openEdit = () => {
        setModalEdit(true);
    };

    const cancelEdit = () => {
        setModalEdit(false);
        setDataIn(null)
    };
    const submitEdit = async (data) => {
        try {
            const res = await changePasswordUsers(data);
            if (res.data.statusCode === 0) {
                dispatch(SuccessMessage("رمز با موفقیت تغییر کرد"))
            }
        } catch (e) {
        }
        setModalEdit(false)
    }


    const {
        se, currPage,
        handleCurrentPage, handleNextPage, handlePrevPage, handleFilter, handleSendData,handleActiveLink
    } = HandlePagination(GetAllUserList);




    return (
        <>
            <section className="main-userDashboardTable dashboard-table">
                <SearchPanel title={"کاربر"} label={"کاربر"} handleSendData={handleSendData} handleFilter={handleFilter}
                             se={se}/>
                <div className="table-overflow">
                    <table id="example1" className="table table-striped table-bordered" width="100%">
                        <thead>
                        <tr>
                            <td width="200px">نام کاربری</td>
                            <th width="150px">نام و نام خانوادگی</th>
                            <td width="200px">ایمیل</td>
                            <th width="120px">تعداد لینک ها</th>
                            <th width="200px">تاریخ</th>
                            <th width="80px">وضعیت</th>
                            <th width="60px">حذف</th>
                            <th width="120px">ویرایش رمز</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            !_.isEmpty(selector) && selector.userResponseDto.map((user, index) =>
                                <tr key={index}>
                                    <td>{user.userName}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.countLink}</td>
                                    <td>{user.createAtPersian}</td>
                                    <td>
                                        <label className="switch">
                                            <input id={user.id}
                                                onClick={() => handleActiveLink(user.id,toggleActiveUsers,"کاربر")}
                                                type="checkbox"
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
                                    <td>
                                        <button style={{background: "transparent"}}
                                                onClick={() => openEdit(user.id)}>
                                            <i className="fa fa-edit" style={{color: "rgb(219,219,219)"}}/>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {!_.isEmpty(selector) && _.isEmpty(selector.userResponseDto) && <NoInfo/>}
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
            {modalDelete && <DeleteModal modal={modalDelete} cancel={cancelDelete} submit={submitDelete}
                                         dataIn={dataIn} state={2}/>}
            {modalEdit && <EditModal modal={modalEdit} cancel={cancelEdit} submit={submitEdit}/>}
        </>
    );
};

export default Index;