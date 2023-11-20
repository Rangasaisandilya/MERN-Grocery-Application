import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchAllProducts } from "../../Store/actions";
import Loader from '../Loader';

const ProductDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.ProductReducer);

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, []);


    const handledelete = (data) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteProduct(data, swal))
            }
        });
    }

    const handleUpdate = (data) => {
        navigate(`/update-product/${data}`)
    }
    return (
        <React.Fragment>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <p className="h4 text-success">Product Details</p>
                        <p className="lead">Manage your products details here you can create edit and delete the
                            products based on your requirement</p>
                        <Link to='/create-product' className="btn btn-success">Create product</Link>
                    </div>
                </div>
                <div className="row mt-3">
                    <React.Fragment>

                        {
                            loading ? <Loader /> :
                                <>
                                    {
                                        products.length > 0 ?
                                            <table className="table table-hover text-center table-striped">
                                                <thead className="bg-dark text-white">
                                                    <tr>
                                                        <th>Product id</th>
                                                        <th>Product</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products?.length > 0 ?
                                                        <React.Fragment>
                                                            {
                                                                products.map((product) => {
                                                                    return (
                                                                        <tr key={product._id}>
                                                                            <td>{product._id.substring(product._id.length - 4)}</td>
                                                                            <td>
                                                                                <img src={product.image} alt="product-image" width="70"
                                                                                    height="70" />
                                                                            </td>
                                                                            <td>{product.name}</td>
                                                                            <td>&#8377;{product.price.toFixed(2)}</td>
                                                                            <td>{product.quantity} kgs</td>
                                                                            <td>
                                                                                <button className="btn btn-primary btn-sm me-2"
                                                                                    onClick={() => handleUpdate(product._id)}>Update
                                                                                </button>
                                                                                <button className="btn btn-danger btn-sm "
                                                                                    onClick={() => handledelete(product._id)}>Delete
                                                                                </button>
                                                                            </td>
                                                                        </tr>

                                                                    )
                                                                })
                                                            }
                                                        </React.Fragment> : <></>
                                                    }
                                                </tbody>


                                            </table> :
                                            <p className="h4 text-danger text-center">No Products Added click on create products to
                                                add the products</p>}
                                </>
                        }

                    </React.Fragment>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductDetails;