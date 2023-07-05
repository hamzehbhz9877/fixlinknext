import React, {useState} from 'react';
import Header from "../header/header";
import Footer from "../footer/footer";
import PanelSidebar from "../panelsSidebar/panelSidebar";
import {MainItems} from "../panelsSidebar/navItems/mainItems";


const MainLayout = (props) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };


    return (
        <>
            <header className="header">
                <Header open={handleOpen}/>
            </header>
            <main className="main_container">
                <PanelSidebar items={MainItems} open={open}
                              close={handleClose} name="main"/>
                {props.children}
            </main>
            <Footer/>
            <div className="main_bg"/>
        </>
    );
};

export default MainLayout;