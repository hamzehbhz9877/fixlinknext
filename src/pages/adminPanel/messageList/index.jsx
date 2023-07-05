import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DeleteMessageList, GetAllMessageList} from "../../../../public/redux/actions/messageList";
import Paginate from "../../../../public/components/utils/pagination";
import DeleteModal from "../../../../public/components/modal/deleteModal";
import ShowInfoModal from "../../../../public/components/modal/showInfoModal";
import HandlePagination from "../../../../public/components/utils/pagination/handlePagination";
import SearchPanel from "../../../../public/components/searchPanel/searchPanel";
import NoInfo from "../../../../public/components/noinfoTabel/noInfo";
import _ from "lodash";

const Index = () => {

    const selector = useSelector(state => state.messageListReducer);
    const dispatch = useDispatch();

    const [dataIn, setDataIn] = useState(null);
    const [modal, setModal] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        dispatch(GetAllMessageList(currPage, ""))
    }, []);

    const submit = () => {
        setModal(false)
        dispatch(DeleteMessageList(dataIn));
    };
    const open = (message) => {
        setModal(true);
        setDataIn(message)
    };
    const cancel = () => {
        setModal(false);
        setDataIn(null)
    };
    const openInfo = (Info) => {
        setModalShow(true);
        setDataIn(Info)
    };
    const cancelInfo = () => {
        setModalShow(false);
        setDataIn(null)
    };


    const {
        se, currPage,
        handleCurrentPage, handleNextPage, handlePrevPage, handleSendData,handleFilter
    } = HandlePagination(GetAllMessageList);


    return (
        <>
            <section className="dashboard-table">
                <SearchPanel title={"پیام"} label={"کاربر"} handleSendData={handleSendData} handleFilter={handleFilter} se={se}/>
                <div className="table-overflow">
                    <table id="example1" className="table table-striped table-bordered" width="100%">
                        <thead>
                        <tr>
                            <th width="200px">نام کاربری</th>
                            <th width="150px">نام و نام خانوادگی</th>
                            <th width="200px">ایمیل</th>
                            <th width="150px">موضوع</th>
                            <th width="200px">تاریخ</th>
                            <th width="100px">متن</th>
                            <th width="100px">نمایش</th>
                            <th width="60px">حذف</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            !_.isEmpty(selector) && selector.contactUs.map((message, index) =>
                                <tr key={index}>
                                    <td>{message.userName}</td>
                                    <td>{message.fullName}</td>
                                    <td>{message.email}</td>
                                    <td>{message.subject}</td>
                                    <td>{message.createAtPersian}</td>
                                    <td style={{
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        direction: "ltr",
                                    }}>
                                        {message.text}
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => openInfo({
                                            userName: message.userName,
                                            fullName: message.fullName,
                                            email: message.email,
                                            subject: message.subject,
                                            text: message.text,
                                        })}>
                                            نمایش
                                        </button>
                                    </td>
                                    <td>
                                        <button style={{background: "transparent"}}
                                                onClick={() => open(message.id)}>
                                            <i className="fa fa-trash" style={{color: "rgb(219,219,219)"}}/>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {!_.isEmpty(selector) && _.isEmpty(selector.contactUs) && <NoInfo /> }
                </div>
                {
                    (selector.pages && selector.pages > 1) ? <Paginate pageNumber={selector.pages} handleCurrentPage={handleCurrentPage}
                              nextPage={handleNextPage}
                              prevPage={handlePrevPage}
                              currentPage={currPage}
                    />:""
                }
            </section>
            {modal && <DeleteModal modal={modal} cancel={cancel} submit={submit} dataIn={dataIn} state={1}/>}
            {modalShow && <ShowInfoModal modal={modalShow} cancel={cancelInfo} dataIn={dataIn}/>}
        </>
    );
};

export default Index;