import React from 'react';
import ActiveLink from "../NavLink/activeLink";

const DropDownMenu = ({role, selector, open}) => {
    return (
        <div className="action">
            <div className="profile" onClick={open}>
                <p className="d-flex align-items-center">
                    <span className="welcome">کاربر</span>
                    &nbsp;<span className="user-dropdown">{selector.username}</span>&nbsp;
                    <span className="welcome">خوش آمدید</span>
                </p>
                <span className="angle"><i style={{fontSize: "20px"}} className="fal fa-angle-down"/></span>
            </div>
            <div className="menu">
                <ul>
                    {
                        (role === "Owner" || role === "Admin") && selector.username &&
                        localStorage.getItem("token")
                            ?
                            <>
                                <li className="dd-li">

                                    <ActiveLink href={"/adminPanel"} activeClassName="active">

                                        <a className="nav-link">
                                            <i className="fas fa-user-tie"/>
                                            <span>ورود به پنل مدیریت</span>
                                        </a>
                                    </ActiveLink>
                                </li>
                                <li className="dd-li">
                                    <ActiveLink href="/userPanel" activeClassName="active">
                                        <a className="nav-link">
                                            <i className="fa fa-user"/>
                                            <span>ورود به حساب کاربری</span>
                                        </a>
                                    </ActiveLink>
                                </li>
                            </>
                            : (role === null && selector.username && localStorage.getItem("token")) &&
                            <li className="dd-li">

                                <ActiveLink href="/userPanel" activeClassName="active">
                                    <a className="nav-link">
                                        <i className="fa fa-user"/>
                                        <span>ورود به حساب کاربری</span>
                                    </a>
                                </ActiveLink>
                            </li>
                    }
                    <li className="dd-li">
                        <ActiveLink href="/logout" activeClassName="active">
                            <a className="nav-link">
                                <i className="fa fa-sign-out"/>
                                <span>خروج</span>
                            </a>
                        </ActiveLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DropDownMenu;