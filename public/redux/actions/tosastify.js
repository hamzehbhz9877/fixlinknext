import {v4} from "uuid";

export const SuccessMessage = (message) => async dispatch=>
    dispatch({
    type: "ADD_NOTIFICATION",
    payload: {
        id: v4(),
        type: "success",
        message: message,
    }
})

export const ErrorMessage = (message) => async dispatch=>
    dispatch({
    type: "ADD_NOTIFICATION",
    payload: {
        id: v4(),
        type: "error",
        message: message,
    }
})

