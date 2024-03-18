import CartActionTypes from "./action-types";

const initialState = {
    cartProducts: [],   
}

const cartReducer = (state = initialState, action ) => {
    switch(action.type){
        case CartActionTypes.ADD_PRODUCT:
            return{
                ...initialState,
                cartProducts:[...state.cartProducts, action.payload]
            }
        case CartActionTypes.DELETE_PRODUCT:
            return{
                ...state,
                cartProducts: state.cartProducts.filter(cartProducts => cartProducts.id != action.payload)
            }
        default:
            return state
    }
}

export default cartReducer;