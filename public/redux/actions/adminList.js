import {addNewAdminList, deleteAdminList, getAllAdminList} from "../../services/shortlink";
import { SuccessMessage} from "./tosastify";

export const GetAllAdminList = (id, search) => async dispatch => {
    try {
        const res = await getAllAdminList(id, search);
        ;
       await dispatch({type: "INITIAL_ADMIN_LIST", payload: res.data.data})
    } catch (e) {

    }
};

export const AddNewUser = (user) => async (dispatch, getState) => {
    const allUser = [...getState().adminListReducer];
    let updateAllUser = [...allUser];

    try {
        const {data, status} = await addNewAdminList(user);
        if (status === 200) {
           await dispatch({type: "ADD_ADMIN_LIST", payload: [...updateAllUser, data.data]});
           await dispatch(SuccessMessage("کاربر جدید با موفقیت ساخته شد"))
        }
    } catch (e) {
       await dispatch({type: "ADD_ADMIN_LIST", payload: [...allUser]});
    }
};

export const DeleteAdminUser = (userId) => async (dispatch, getState) => {


    const allAdminUser = [...getState().adminListReducer];

    let updateAllAdminUser = [...allAdminUser];

    const filter = updateAllAdminUser.filter(message => message.id !== userId);

    updateAllAdminUser = [...filter];

    try {
       await dispatch({type: "DELETE_ADMIN_LIST", payload: [...updateAllAdminUser]});
        const res = await deleteAdminList(userId);

        if (res.data.statusCode === 0) {
           await dispatch(SuccessMessage("کاربر با موفقیت حذف شد"))
        }
    } catch (e) {
       await dispatch({type: "DELETE_ADMIN_LIST", payload: [allAdminUser]});
    }
}