const INITIAL_STATE = {
    idUser: null,
    invoice: '',
    date: '',
    total_price: '',
    shipping: '',
    ongkir: '',
    detail: '',
    status: ''
}

export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SHOW_TRANSACTION":
            return { ...state, ...action.payload };
        default:
            return state
    }
} 