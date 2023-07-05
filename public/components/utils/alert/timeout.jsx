import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";

const TimeoutAlert = props => {
    const dispatch = useDispatch();

    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);
    const ref = useRef(null);

    const handleStartTimer = () => {
        ref.current = setInterval(() => {
            setWidth(prev => {
                if (prev < 100) {
                    return prev + .5;
                }
                clearInterval(ref.current);
                return prev;
            });
        }, 25);

    };

    const handlePauseTimer = () => {
        clearInterval(ref.current);
    };

    const handleCloseNotification = () => {
        handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            dispatch({
                type: "REMOVE_NOTIFICATION",
                id: props.id
            })
        }, 300)
    };

    useEffect(() => {
        if (width === 100) {
            handleCloseNotification()
        }
    }, [width])

    useEffect(() => {
        handleStartTimer();
        return () => {
            handlePauseTimer();
        }
    }, []);

    const icon = () => {
        let icon = "";
        if (props.type === "success") {
            icon = "fa-check-circle"
        } else {
            icon = "fa-exclamation-circle"
        }
        return icon
    };

    return (
        <div className={`alert-wrapper  ${
            props.type === "success" ? "success" : "error"
        } ${exit ? "hide" : ""}`} onMouseEnter={handlePauseTimer}
             onMouseLeave={handleStartTimer}
             onClick={handleCloseNotification}>
            <span className={`fa ${icon()} check`}/>
            <span>
                <p className="msg">{props.message}</p>
            </span>
            <button className="close-btn">
                <span className="fa fa-times" style={{fontSize:"16px"}}/>
            </button>
            <div style={{width: `${width}%`}} className="bar"/>
        </div>
    );
};

export default TimeoutAlert;