export const adminDashboard = (state = {
    dataR: {},
    dataResLine: [],
    dataResBot: []
}, action) => {
    switch (action.type) {
        case "GET_DATA":
            return {...action.payload};
        default:
            return state;
    }
};
