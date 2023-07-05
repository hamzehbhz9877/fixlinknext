
export const linkReducer = (state = {}, action) => {
    switch (action.type) {
        case "INITIAL":
            return {...action.payload};
        case "DELETE_LINK":
            return { ...action.payload }; //spread Operator
        default:
            return state;
    }
};
