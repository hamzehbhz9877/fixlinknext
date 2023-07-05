import React from 'react';

const Backdrop = ({open,closeNav}) => {
    return (
        <div className={open ? "backdrop open" : "backdrop"} onClick={closeNav}/>
    );
};

export default Backdrop;