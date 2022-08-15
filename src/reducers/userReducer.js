const INITIAL_STATE = {
    iduser: null,
    username: '',
    email: '',
    age: null,
    city:'',
    role: '',
    status_id: null,
    status:'',
    cart: []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    console.log("Data dari Reducer,", action);
    // action.type tdk dpt diubah
    switch (action.type) {
        case "LOGIN_SUCCESS":
            // delete action.payload.password;  //Menghapus password
            return { ...state, ...action.payload }
        case "UPDATE_CART":
            return { ...state, cart: action.payload }
        case "CHECKOUT":
            return { ...state, transaction: action.payload }
        case "LOGOUT_SUCCESS":
            return INITIAL_STATE
        default:
            return state
    }
}