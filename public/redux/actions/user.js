export const AddUser = user => async dispatch => await dispatch({type: "SET_USER", payload: user});

export const ClearUser = () => async dispatch => await dispatch({type: "CLEAR_USER", payload: {}});