export const adminListReducer = (state = [], action) => {
    switch (action.type) {
        case "INITIAL_ADMIN_LIST":
            return [...action.payload];
        case "ADD_ADMIN_LIST":
            return [...action.payload];
        case "DELETE_ADMIN_LIST":
            return [...action.payload];
        default:
            return state;
    }
};
