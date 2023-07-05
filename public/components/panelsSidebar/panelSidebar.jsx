import React, {useEffect, useState} from 'react';
import Backdrop from "../utils/backdrop/backdrop";
import ActiveLink from "../NavLink/activeLink";

const PanelSidebar = ({items, open, close, name}) => {
    const [role, setRole] = useState("")
    useEffect(() => {
        const role = localStorage.getItem("Ro");
        setRole(role)
    }, [])
    return (
        <aside>
            <div className={!open ? `${name === "panel" ? "navigation" : "navigation-main"}` :
                `${name === "panel" ? "navigation open" : "navigation-main open"}`}>
                <div className="d-flex justify-content-end pt-3 px-2 close-menu">
                    <span onClick={close} id="btn-close">
                         <i className="fal fa-times"/>
                    </span>
                </div>
                <div className="navigation-menu-body">
                    <ul className="navigationApps">
                        {items.map((item, index) => {
                            if (item.to === "/adminPanel/adminList" && role === "Owner") {
                                return <li key={index}>
                                    <ActiveLink href={item.to} activeClassName="active-side-bar">
                                        <a className="nav-link">
                                            <i className={`fa ${item.fa}`}/>
                                            <span>{item.text}</span>
                                        </a>
                                    </ActiveLink>
                                </li>
                            } else if (item.to !== "/adminPanel/adminList") {
                                return <li key={index}>
                                    <ActiveLink href={item.to} activeClassName="active-side-bar">
                                        <a className="nav-link">
                                            <i className={`fa ${item.fa}`}/>
                                            <span>{item.text}</span>
                                        </a>
                                    </ActiveLink>
                                </li>
                            }
                        })
                        }
                        {
                            name === "panel" &&
                            <li>
                                <ActiveLink href="/logout" activeClassName="active-side-bar">
                                    <a className="nav-link">
                                        <i className="fa fa-sign-out"/>
                                        <span>خروج</span>
                                    </a>
                                </ActiveLink>
                            </li>
                        }
                    </ul>
                </div>
            </div>
            <Backdrop open={open} closeNav={close}/>
        </aside>
    );
};

export default PanelSidebar;