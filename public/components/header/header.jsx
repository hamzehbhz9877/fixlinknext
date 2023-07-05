import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import DropDownMenu from "../dropDownMenu/dropDownMenu";
import ActiveLink from "../NavLink/activeLink";
import {useRouter} from "next/router";

const Header = ({open}) => {
    const selector = useSelector(state => state.userReducer);
    const router = useRouter();
    const [role, setRole] = useState("");

    useEffect(() => {
        setRole(localStorage.getItem("Ro"))
    });


    const openMenu = () => {
        var menu = document.querySelector(".menu");
        var rot = document.querySelector(".angle");
        rot.classList.toggle("rotate");
        menu.classList.toggle("active-menu")
    };


    return (
        <>
            <div className="navBar">
                <div className="mobile-menu" onClick={open}>
                    <i className="fa fa-bars fa-2x"/>
                </div>
                <div>
                    <ActiveLink href="/" activeClassName="">
                        <img src="/images/logo.svg" alt="logo"/>
                    </ActiveLink>
                </div>

                <div className="flex"/>
                <ul className="navBar-item navBar-item-right">
                    <li>
                        <ActiveLink href="/" activeClassName="active">
                            <a className="nav-link"> کوتاه کننده لینک</a>
                        </ActiveLink>
                    </li>
                    <li>
                        <ActiveLink href="/viewerStatistics" activeClassName="active">
                            <a className="nav-link">آمار بازدید لینک</a>
                        </ActiveLink>
                    </li>
                    <li>
                        <ActiveLink href="/notification/[id]"
                                    as={`/notification/${router.asPath.startsWith("/notification") ? router.query.id : "1"}`}
                                    activeClassName="active">
                            <a className="nav-link">اطلاعیه</a>
                        </ActiveLink>
                    </li>
                    <li>
                        <ActiveLink href="/rules" activeClassName="active">
                            <a className="nav-link">قوانین</a>
                        </ActiveLink>
                    </li>
                    <li>
                        <ActiveLink href="/contactUs" activeClassName="active">
                            <a className="nav-link">تماس با ما</a>
                        </ActiveLink>
                    </li>
                </ul>
                <div className="flex"/>

                {selector.username ?
                    <DropDownMenu selector={selector} open={openMenu} role={role}/>
                    : <div>
                        <button className="btn login-btn">
                            <ActiveLink href="/login" activeClassName="active">
                                <span>ورود</span>
                            </ActiveLink>
                        </button>
                    </div>
                }
            </div>
        </>
    );
};

export default Header;