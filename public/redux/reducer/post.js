export const postReducer = (state = {}, action) => {
    switch (action.type) {
        case "INITIAL_NOTIFICATION":
            return {...action.payload};
        case "ADD_NOTIFICATION_POST":
            return {...action.payload};
        case "REMOVE_NOTIFICATION_POST":
            return {...action.payload};
        case "EDIT_NOTIFICATION_POST":
            return {...action.payload};
        default:
            return state;
    }
};
