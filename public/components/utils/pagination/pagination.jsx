import React from "react";


const Pagination = ({pageNumber, handleCurrentPage, currentPage, nextPage, prevPage}) => {


    var rows = new Array(pageNumber).fill(0).map( ( zero, index ) =>
        <li key={index} id={index} className={`page-item ${currentPage === index+1 ? "active-link" : ""}`}
             onClick={() => handleCurrentPage(index+1)}>
            <span  className="page-link">
                {index+1}
            </span>
        </li>
    );

    return (
        <div>
            <nav aria-label="...">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                        onClick={prevPage}>
                        <span className="page-link"
                           tabIndex={currentPage === 1 ? "-1" : "0"}
                           aria-disabled={currentPage === 1}>قبلی</span>
                    </li>
                    {rows}
                    <li className={`page-item ${currentPage === pageNumber ? "disabled" : ""}`}
                        onClick={nextPage}>
                        <span className="page-link">بعدی</span>
                    </li>
                </ul>
            </nav>

        </div>
    )
};
export default Pagination