import CartActionTypes from "./action-types";

export const addProductToCart = (payload) => ({
    type: CartActionTypes.ADD_PRODUCT,
    payload,
});

export const removeProductToCart = (payload) => ({
    type: CartActionTypes.DELETE_PRODUCT,
    payload,
});