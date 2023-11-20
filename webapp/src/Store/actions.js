import Axios from "axios";
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FETCH_ALL_PRODUCTS_FAILURE, FETCH_ALL_PRODUCTS_REQUEST, FETCH_ALL_PRODUCTS_SUCCESS, FETCH_PRODUCT_FAILURE, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_FORM, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "./actionTypes"


let dataURL = `${process.env.REACT_APP_HOST_URL}`;

export const fetchAllProducts = () => {
    return dispatch => {
        dispatch({ type: FETCH_ALL_PRODUCTS_REQUEST });
        Axios.get(dataURL).then((response) => {
            dispatch({ type: FETCH_ALL_PRODUCTS_SUCCESS, payload: response.data.products })
        }).catch((error) => {
            dispatch({ type: FETCH_ALL_PRODUCTS_FAILURE, payload: error })
        });
    }
}


// update product Form
export const updateProductForm = (key, value) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_PRODUCT_FORM, payload: { key, value } });
    };
};

// fetch a single product
export const fetchProduct = (productId) => {
    return (dispatch) => {
        dispatch({ type: FETCH_PRODUCT_REQUEST });
        let dataURL = `${process.env.REACT_APP_HOST_URL}/${productId}`;
        Axios.get(dataURL).then((response) => {
            dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data.product });
        }).catch((error) => {
            dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error });
        });
    };
};

export const createProduct = (product, navigate, swal) => {
    return dispatch => {
        dispatch({ type: CREATE_PRODUCT_REQUEST });
        Axios.post(dataURL, product).then((response) => {
            dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response.data.product });
            swal({
                title: "Product Added!",
                icon: "success",
                button: "Ok",
            });
            navigate('/admin')
        }).catch((error) => {
            dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error });
            swal({
                title: "Something went wrong!",
                icon: "error",
                button: "Ok",
            });
        })
    }
}


// updateProduct
export const updateProduct = (productId, selectedProduct, navigate, swal) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        let dataURL = `${process.env.REACT_APP_HOST_URL}/${productId}`;
        Axios.put(dataURL, selectedProduct).then((response) => {
            dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data.product });
            swal({
                title: "Product Updated!",
                icon: "success",
                button: "Ok",
            });
            navigate('/admin');
        }).catch((error) => {
            dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error });
            swal({
                title: "Something went wrong!",
                icon: "error",
                button: "Ok",
            });
        });
    };
};

// deleteProduct
export const deleteProduct = (productId, swal) => {
    return (dispatch) => {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        let dataURL = `${process.env.REACT_APP_HOST_URL}/${productId}`;
        Axios.delete(dataURL).then((response) => {
            dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: response.data.product });
            swal({
                title: "Product deleted!",
                icon: "success",
                button: "Ok",
            });
            dispatch(fetchAllProducts()); // fetch all product once delete is done
        }).catch((error) => {
            dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error });
            swal({
                title: "Something went wrong!",
                icon: "error",
                button: "Ok",
            });
        });
    };
};