import React from "react";
import Pagination from "./pagination";

const Paginate = ({handleCurrentPage,nextPage,prevPage,pageNumber,currentPage}) => {
    return (
        <div className="rtl d-flex justify-content-center">
            <div className="container my-3">
                <div className="row">
                    <div className="col">
                        <Pagination pageNumber={pageNumber} handleCurrentPage={handleCurrentPage}
                                    nextPage={nextPage}
                                    prevPage={prevPage}
                                    currentPage={currentPage}
                                   />
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Paginate