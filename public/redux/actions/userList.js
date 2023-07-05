import {SuccessMessage,} from "./tosastify";
import {deleteUsers, getAllUsers} from "../../services/shortlink";


export const GetAllUserList = (id, value) => async dispatch => {
    try {
        const res = await getAllUsers(id,value);

        await dispatch({
            type: "INITIAL_USER",
            payload: {userResponseDto: res.data.data.userResponseDto, pages: res.data.data.pages}
        })
    } catch (e) {

    }
};

export const DeleteUserList = (userId) => async (dispatch, getState) => {

    const allUserList = {...getState().userListReducer};

    let updateAllUserList = [...allUserList.userResponseDto];

    const filter = updateAllUserList.filter(message => message.id !== userId);

    updateAllUserList = [...filter];

    try {
        await dispatch({type: "DELETE_USER", payload: {...allUserList, userResponseDto: updateAllUserList}});
        const res = await deleteUsers(userId);
        if (res.data.statusCode === 0) {
            dispatch(SuccessMessage("کاربر با موفقیت حذف شد"))
        }
    } catch (e) {
        await dispatch({type: "DELETE_USER", payload: {allUserList}});
    }
}