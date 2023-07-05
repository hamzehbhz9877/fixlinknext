import React, {useState} from 'react';
import PanelSidebar from "../panelsSidebar/panelSidebar";
import PanelHeader from "../panelHeaders/panelHeader";

const Panels = ({items, ...props}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    return (
        <>
            <header className="panel-header">
                <PanelHeader open={handleOpen}/>
            </header>
            <main className="main-panel">
                <div className="panel">
                    <PanelSidebar items={items} open={open}
                                  close={handleClose} name="panel"/>
                    {props.children}
                </div>
            </main>
        </>

    );
};

export default Panels;