
export const qrCode = (state = {}, action) => {
    switch (action.type) {
        case "INITIAL":
            return {...action.payload};
        default:
            return state;
    }
};
