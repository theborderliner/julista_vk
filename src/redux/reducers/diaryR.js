const diary = (state = "", action) => {
    switch (action.type) {
        case "SET_DIARY":
            return action.value;
        default:
            return state;
    }
};

export default diary;