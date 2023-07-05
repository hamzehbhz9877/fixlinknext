export const ShowLoading = () =>
    async dispatch => await dispatch({type: "SHOW"});

export const HideLoading = () =>
    async dispatch => await dispatch({type: "HIDE"});