import React, {useEffect, useState} from 'react';
import copy from "copy-to-clipboard"
import {Alert, Tooltip} from "reactstrap"
import Link from "next/link";
import ActiveLink from "../../../public/components/NavLink/activeLink";

const Index = () => {

    const [shortLink, setShortLInk] = useState("");
    const [copyTo, setCopyTo] = useState(false);
    const [qr, setQr] = useState("");
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(false);
    const [tooltipOpenBack, setTooltipOpenBack] = useState(false);
    const toggleBack = () => setTooltipOpenBack(!tooltipOpenBack);

    const [storage,setStorage] = useState("");

    useEffect(() => {
        const user=localStorage.getItem('user');
        setStorage(user)
    },[]);

    const handleCopy = () => {
        setCopyTo(true);
        setTooltipOpen(true);
        setTimeout(() => {
            setTooltipOpen(false);
            setCopyTo(false);
        }, 2000);
        copy("https://FixLink.ir/" + shortLink)
    };
    useEffect(() => {
        const shortLink = localStorage.getItem("shortLink");
        const qr = localStorage.getItem("qr");
        setShortLInk(shortLink);
        setQr(qr)
    }, []);


    return (
        <section className="create">
            <div className="short-link-content min-w-sr col-md-6 mb-3 card">
                <div className="header-title d-flex flex-column align-items-center">
                    <img src="/images/successLink.svg" className="mb-2" alt="successLink"/>
                    <h4 className="text-center">لینک کوتاه ساخته شد</h4>
                </div>
                <div className="input-group mb-1 short-link-input co-md-7 mx-auto">
                    <input value={"FixLink.ir/" + shortLink}
                           readOnly
                           className="form-control" style={{textAlign: "center"}}
                           id="myInput"/>
                    <div className="input-group-prepend">
                        <button onClick={handleCopy} className="btn bt-ice-blue bt-ice-blue-copy" id="copyText">
                            <i className="fa fa-copy"/>
                            &nbsp;
                            کپی
                        </button>
                    </div>
                </div>
                <Tooltip placement="left" isOpen={tooltipOpen} target="copyText" toggle={toggle}>
                    {copyTo && "کپی شد"}
                </Tooltip>
                <div className="text-center d-flex align-items-center flex-column">
                    <div className="my-3">
                        <img src={"data:image/png;base64," + qr} width="120px" height="120px" alt=""/>
                    </div>
                    <button className="btn bt-outline">
                        <a href={`data:image/png;base64,${qr}`}
                           download="Id.jpeg">
                            دانلود QR</a>
                    </button>

                </div>
                <div className="back-to-home">
                    <ActiveLink activeClassName="" href={"/"}>
                        <a className="nav-link">
                            <i className="fa fa-arrow-circle-left" aria-hidden="true" id="backToHome"/>
                        </a>
                    </ActiveLink>
                    <Tooltip placement="right" isOpen={tooltipOpenBack} target="backToHome" toggle={toggleBack}>
                        ساخت لینک جدید
                    </Tooltip>
                </div>
            </div>
            <Alert className="warning py-3 text-center mb-0 short-link-alert card">
                <p style={{margin: "0"}}>
                    <span className="text-warning"><i className="fa fa-warning"/></span>
                    &nbsp;
                    <span className="warning-text">توجه:</span>
                    &nbsp;
                    {
                        !storage ? <>
                            مدت فعال بودن لینک شما <span style={{color: "#19B5FE"}}>10</span> روز است برای
                            ساختن <span className="warning-text">لینک نامحدود</span>
                            &nbsp;
                            <Link href={"/register"}>ثبت نام</Link>
                            &nbsp;
                            کنید
                        </> : <>مدت فعال بودن لینک های شما دائمی میباشد</>
                    }
                </p>
            </Alert>
        </section>
    );
};

export default Index;
