
export const messageListReducer = (state = {}, action) => {
    switch (action.type) {
        case "INITIAL_MESSAGE":
            return {...action.payload};
        case "DELETE_MESSAGE":
            return { ...action.payload };
        default:
            return state;
    }
};
