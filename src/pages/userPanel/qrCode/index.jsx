import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GetAllQrCode} from "../../../../public/redux/actions/qrCode";
import Paginate from "../../../../public/components/utils/pagination";
import HandlePagination from "../../../../public/components/utils/pagination/handlePagination";
import SearchPanel from "../../../../public/components/searchPanel/searchPanel";
import NoInfo from "../../../../public/components/noinfoTabel/noInfo";
import _ from "lodash"


const Index = () => {
    const selector = useSelector(state => state.qrCode);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAllQrCode(1, ""))
    }, []);

    const {
        se, currPage,
        handleCurrentPage, handleNextPage, handlePrevPage, handleSendData,handleFilter
    } = HandlePagination(GetAllQrCode);

    return (
        <>
            <section className="dashboard-table">
                <SearchPanel title={"ها Qr"} label={"آدرس لینک"} handleSendData={handleSendData} handleFilter={handleFilter} se={se} userPanelqrCode/>
                <div className="table-overflow">
                    <table id="example1" className="table table-striped table-bordered" width="100%">
                        <thead>
                        <tr>
                            <th width="100px">qr</th>
                            <th width="300px">لینک اصلی</th>
                            <th width="200px">لینک کوتاه</th>
                            <th width="100px">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            !_.isEmpty(selector) && selector.links.map((link, index) =>
                                <tr key={index}>
                                    <td>
                                        <span>
                                            <img src={"data:image/png;base64," + link.qr} width="40px"
                                                 height="40px"
                                                 alt=""/>
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                               {link.bigLink}
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {"https://fixLink.ir/" + link.shortLink}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn bt-link-download">
                                                <a href={`data:image/png;base64,${link.qr}`}
                                                   download="Id.jpeg">دانلود</a>
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
            </section>
        </>
    );
};

export default Index;