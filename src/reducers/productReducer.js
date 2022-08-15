const INITIAL_STATE = {
    id: null,
    name: '',
    description: '',
    brand: '',
    category: '',
    price: '',
    stock: '',
    images: ''
}

export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SHOW_DETAILS":
            return { ...state, ...action.payload };
        default:
            return state
    }
}



