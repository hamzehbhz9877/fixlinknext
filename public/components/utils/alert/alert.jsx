import React from 'react';
import TimeoutAlert from "./timeout";
import {useSelector} from "react-redux";

const Notification = () => {
    const state = useSelector(state => state.notificationReducer);
    return (
        <div className="Alert">
                {
                    state.map((note) => {
                        return <TimeoutAlert key={note.id} {...note} />
                    })
                }
        </div>
    );
};

export default Notification;