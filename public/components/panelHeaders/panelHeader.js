import React from 'react';
import {useSelector} from "react-redux";
import ActiveLink from "../NavLink/activeLink";

const PanelHeader = ({open}) => {
    const selector = useSelector(state => state.userReducer);

    return (
        <div className="panel-navBar">
            <div className="mobile-menu" onClick={open}>
                <i className="fa fa-bars fa-2x"/>
            </div>
            <div className="panel-logo">
                <ActiveLink href="/" activeClassName="">
                    <img src="/images/logo.svg" alt="logo"/>
                </ActiveLink>
            </div>
            <div className="flex"/>
            <div className="profile">
                {selector.username ?
                    <p className="d-flex align-items-center">
                        <span className="welcome">کاربر</span>
                        &nbsp;<span className="user-dropdown">{selector.username}</span>&nbsp;
                        <span className="welcome">خوش آمدید</span>
                    </p>
                    : null
                }
            </div>
        </div>
    );
};

export default PanelHeader;