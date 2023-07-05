import {useState} from 'react';
import {useDispatch} from "react-redux";
import {SuccessMessage} from "../../../redux/actions/tosastify";

const HandlePagination = (event) => {

    const [currPage, setCurrPage] = useState(1);
    const [se, setSe] = useState("");

    const dispatch = useDispatch();
    const handleActiveLink = async (id,api,message) => {
        const isActive=document.getElementById(id).checked;
        try {
            const res = await api(id);
            if (res.data.statusCode === 0) {
                if (!isActive) {
                    dispatch(SuccessMessage(`${message} غیر فعال شد`))
                }
                else{
                    dispatch(SuccessMessage(`${message} فعال شد`))
                }
            }
        } catch (e) {

        }
    };
    const handleCurrentPage = (page) => {
        window.scrollTo(0, 0);
        dispatch(event(page, se));
        setCurrPage(page)
    };
    const handleNextPage = () => {
        window.scrollTo(0, 0);
        dispatch(event(currPage + 1, se));
        setCurrPage(currPage + 1)
    };
    const handlePrevPage = () => {
        window.scrollTo(0, 0);
        dispatch(event(currPage - 1, se));
        setCurrPage(currPage - 1)
    };

    const handleFilter = () => {
        dispatch(event(currPage, ""));
        setCurrPage(1);
        setSe("")
    };
    const handleSendData = (values, actions) => {
        if(actions)
        {
            actions.setSubmitting(false);
        }
        setSe(values.search);
        dispatch(event(currPage, values.search));
    };

    return {
        se, setSe, currPage, handleCurrentPage,
        handleNextPage, handlePrevPage, handleFilter, handleSendData,handleActiveLink
    };
};

export default HandlePagination;