import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FETCH_ALL_PRODUCTS_FAILURE, FETCH_ALL_PRODUCTS_REQUEST, FETCH_ALL_PRODUCTS_SUCCESS, FETCH_PRODUCT_FAILURE, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_FORM, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "./actionTypes";



const initialState = {
    loading: false,
    products: [],
    selectedProduct: {},
    errorMessage: ""

}
export const ProductReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_ALL_PRODUCTS_REQUEST:
        case CREATE_PRODUCT_REQUEST:
        case FETCH_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload
            }
        case FETCH_ALL_PRODUCTS_FAILURE:
        case CREATE_PRODUCT_FAILURE:
        case FETCH_PRODUCT_FAILURE:
        case UPDATE_PRODUCT_FAILURE:
        case DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };
        // CREATE a Product
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false
            };
        // Fetch a single Product
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedProduct: payload
            };
        // Update Product Form
        case UPDATE_PRODUCT_FORM:
            return {
                ...state,
                loading: false,
                selectedProduct: {
                    ...state.selectedProduct,
                    [payload.key]: payload.value
                }
            };
        // UPDATE PRODUCT
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false
            };
        // DELETE PRODUCT
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false
            };
        default: return state;

    }
}