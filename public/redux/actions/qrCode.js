import {getAllQrCode} from "../../services/shortlink";

export const GetAllQrCode = (id, value) => async dispatch => {
    try {
        const res = await getAllQrCode(id,value);
        ;
       await dispatch({type: "INITIAL", payload: res.data.data})
    } catch (e) {

    }
};