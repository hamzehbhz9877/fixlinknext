import {createNotification, deleteNotification, editNotification, getAllNotification,} from "../../services/shortlink";
import {SuccessMessage} from "./tosastify";

export const GetAllPost = (id, value) => async dispatch => {
    try {
        const res = await getAllNotification(id, value);
        await dispatch({
            type: "INITIAL_NOTIFICATION",
            payload: {notifications: res.data.data.notifications, pages: res.data.data.pages}
        })
    } catch (e) {

    }
};

export const CreateNewNotification = (notification) => async (dispatch, getState) => {
    const allNotification = {...getState().postReducer};
    let updateAllNotification = [...allNotification.notifications];
    try {
        const res = await createNotification(notification);
        ;
        if (res.data.statusCode === 0) {
            await dispatch({
                type: "ADD_NOTIFICATION_POST", payload: {
                    ...allNotification, notifications: [...updateAllNotification, {...res.data.data}]
                }
            });
            await dispatch(SuccessMessage("اطلاعیه جدید با موفقیت ساخته شد"))
        }
    } catch (e) {
        await dispatch({type: "ADD_NOTIFICATION_POST", payload: {...allNotification}});
    }
};

export const DeleteNotification = (notificationId) => async (dispatch, getState) => {

    const allNotification = {...getState().postReducer};

    let updateAllNotification = [...allNotification.notifications];

    const filter = updateAllNotification.filter(notification => notification.id !== notificationId);

    updateAllNotification = [...filter];


    try {
        await dispatch({
            type: "REMOVE_NOTIFICATION_POST",
            payload: {...allNotification, notifications: updateAllNotification}
        });
        const res = await deleteNotification(notificationId);
        ;
        if (res.data.statusCode === 0) {
            await dispatch(SuccessMessage("اطلاعیه با موفقیت حذف شد"))
        }
    } catch (e) {
        await dispatch({type: "REMOVE_NOTIFICATION_POST", payload: {...allNotification}});
    }
};

export const EditNotification = (notification, id) => async (dispatch, getState) => {

    const allNotification = {...getState().postReducer};

    const updateAllNotification = [...allNotification.notifications];
    const notificationIndex = updateAllNotification.findIndex(notification => notification.id === id);
    let findUser = updateAllNotification[notificationIndex];
    findUser = {...notification};
    updateAllNotification[notificationIndex] = findUser;

    try {
        dispatch({type: "EDIT_NOTIFICATION_POST", payload: {...allNotification, notifications: updateAllNotification}});
        const {status} = await editNotification(notification);
        if (status === 200) {
            await dispatch(SuccessMessage("اطلاعیه جدید با موفقیت ویرایش شد"))
        }
    } catch (e) {
        dispatch({type: "EDIT_NOTIFICATION_POST", payload: {...allNotification}});
    }
};


export const IncreasePage = () => async (dispatch, getState) => {
    const allNotification = {...getState().postReducer};
    dispatch({type: "EDIT_NOTIFICATION_POST", payload: {...allNotification, pages: allNotification.pages + 1}});
};