const activePanel = (state = "choose_diary", action) => {
    switch (action.type) {
        case "SET_PANEL":
            return action.value;

        default:
            return state;
    }
};

export default activePanel