
export const userListReducer = (state = {}, action) => {
    switch (action.type) {
        case "INITIAL_USER":
            return {...action.payload};
        case "DELETE_USER":
            return { ...action.payload };
        default:
            return state;
    }
};
