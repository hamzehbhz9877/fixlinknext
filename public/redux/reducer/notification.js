
export const notificationReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_NOTIFICATION":
            return [...state, {...action.payload}];
        case "REMOVE_NOTIFICATION":
            return state.filter(el => el.id !== action.id);
        default:
            return state;
    }
};
