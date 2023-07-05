import { SuccessMessage,} from "./tosastify";
import {deleteMessageList, getAllMessageList} from "../../services/shortlink";


export const GetAllMessageList = (id,value) => async dispatch => {
    try {
        const res = await getAllMessageList(id,value);
       await dispatch({type: "INITIAL_MESSAGE", payload:{contactUs:res.data.data.contactUs,pages:res.data.data.pages}})
    } catch (e) {

    }

};

export const DeleteMessageList = (messageId) => async (dispatch, getState) => {

    const allContactUs = {...getState().messageListReducer};

    let updateAllContactUs = [...allContactUs.contactUs];

    const filter = updateAllContactUs.filter(message => message.id !== messageId);

    updateAllContactUs = [...filter];

    try {
       await dispatch({type: "DELETE_MESSAGE", payload: {...allContactUs, contactUs: updateAllContactUs}});
        const res = await deleteMessageList(messageId);
        if (res.data.statusCode === 0) {
        await  dispatch( SuccessMessage("پیام با موفقیت حذف شد"))
        }
    } catch (e) {
        await dispatch({type: "DELETE_MESSAGE", payload: {allContactUs}});
    }
}