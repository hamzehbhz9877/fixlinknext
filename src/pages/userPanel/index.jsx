import React, {useEffect, useState} from 'react';
import {toggleActiveLink} from "../../../public/services/shortlink";
import Paginate from "../../../public/components/utils/pagination";
import copy from "copy-to-clipboard";
import {Tooltip} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import {ClipBoard, DeleteLink, GetAllLink} from "../../../public/redux/actions/link";
import DeleteModal from "../../../public/components/modal/deleteModal";
import HandlePagination from "../../../public/components/utils/pagination/handlePagination";
import SearchPanel from "../../../public/components/searchPanel/searchPanel";
import NoInfo from "../../../public/components/noinfoTabel/noInfo";
import _ from "lodash"

const Index = () => {

    const selector = useSelector(state => state.linkReducer);
    const dispatch = useDispatch();
    const [dataIn, setDataIn] = useState(false);
    const [modal, setModal] = useState(false);


    useEffect(() => {
        dispatch(GetAllLink(currPage, ""))
    }, []);

    const {
        currPage,se,
        handleCurrentPage, handleNextPage, handlePrevPage, handleSendData,handleFilter
    } = HandlePagination(GetAllLink);

    const submit = () => {
        dispatch(DeleteLink(dataIn));
        setModal(false)
    };

    const cancel = () => setModal(false);

    const open = (shortLink) => {
        setModal(true);
        setDataIn(shortLink)
    };

    const handleCopyShortLink = (shortLink) => {
        document.getElementById(`${shortLink}`).innerText = "کپی شد";
        copy("https://fixLink.ir/" + shortLink);
    };

    const toggle = (id) => {
        dispatch(ClipBoard(id))
    };

    const{handleActiveLink}=HandlePagination()

    return (
        <>
            <section className="main-userDashboardTable dashboard-table">
                <SearchPanel title={"لینک"} label={"لینک کوتاه"} handleSendData={handleSendData} handleFilter={handleFilter} se={se} userPanelDashboard/>
                <div className="table-overflow">
                    <table id="example1" className="table table-striped table-bordered" width="100%">
                        <thead>
                        <tr>
                            <th width="300px">لینک اصلی</th>
                            <th width="250px">لینک کوتاه</th>
                            <th width="100px">تعداد بازدید</th>
                            <th width="150px">تاریخ ساخت</th>
                            <th width="80px">وضعیت</th>
                            <th width="60px">حذف</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            !_.isEmpty(selector) && selector.links.map((link, index) =>
                                <tr key={index}>
                                    <td>
                                        <span>
                                               {link.bigLink}
                                        </span>
                                    </td>
                                    <td>
                                        <button id={`TooltipExample${link.shortLink}`}
                                                type="button"
                                                onClick={(e) =>
                                                    handleCopyShortLink(link.shortLink)}
                                                className="btn bt-link-copy">
                                            {"https://FixLink.ir/" + link.shortLink}
                                        </button>
                                        <Tooltip placement="right" isOpen={link.tooltipOpen}
                                                 target={`TooltipExample${link.shortLink}`}
                                                 id={link.shortLink}
                                                 toggle={() => toggle(link.shortLink)}>
                                            کپی
                                        </Tooltip>
                                    </td>
                                    <td>
                                        <span>
                                            {link.referenceCount}
                                        </span>
                                    </td>
                                    <td><span>{link.createAt}</span></td>
                                    <td>
                                        <label className="switch">
                                            <input id={link.id} onClick={() => handleActiveLink(link.id,toggleActiveLink,"لینک")} type="checkbox"
                                                   defaultChecked={link.isActive}/>
                                            <span className="slider round"/>
                                        </label>
                                    </td>
                                    <td>
                                        <button style={{background: "transparent"}}
                                                onClick={() => open(link.shortLink)}>
                                            <i className="fa fa-trash fa-2x" style={{color: "rgb(219,219,219)"}}/>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {!_.isEmpty(selector) && _.isEmpty(selector.links) && <NoInfo/>}
                </div>
                {
                    (selector.pages && selector.pages > 1) ?
                    <Paginate pageNumber={selector.pages} handleCurrentPage={handleCurrentPage}
                              nextPage={handleNextPage}
                              prevPage={handlePrevPage}
                              currentPage={currPage}
                    />:""
                }

                {}

            </section>
            {modal && <DeleteModal modal={modal} cancel={cancel} state={4}
                                   submit={submit} dataIn={dataIn}/>}
        </>
    );
};

export default Index;