const INITIAL_STATE= []

export const categoryReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case "SHOW_CATEGORY":
            return [...INITIAL_STATE,...action.payload]
        default:
            return state;
    }
}