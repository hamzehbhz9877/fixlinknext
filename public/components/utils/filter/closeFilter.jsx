import React from 'react';

const CloseFilter = ({search, se, reset, handleFilter}) => {

    const handleReset = () => {
        console.log("filter");
        reset();
        handleFilter()
    };
    return (
        search &&
        <span className="close-filter" onClick={!se ? () => reset() : handleReset}><i
            className="fas fa-times red-close"/></span>
    );
};

export default CloseFilter;