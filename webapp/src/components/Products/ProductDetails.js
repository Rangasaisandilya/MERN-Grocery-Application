import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const ProductDetails = () => {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [errormessage, setErrorMessage] = useState('')

    const handledelete = (data) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let dataurl = `${process.env.REACT_APP_HOST_URL}/${data}`
                    axios.delete(dataurl).then(() => {
                        swal({
                            title: "Product deleted!",
                            icon: "success",
                            button: "Ok",
                        });
                        getProducts();
                    }).catch(() => {
                        swal({
                            title: "Something went wrong!",
                            icon: "Error",
                            button: "Ok",
                        });
                    })
                }
            });
    }

    const handleUpdate = (data) => {
        navigate(`/update-product/${data}`)
    }

    let getProducts = () => {
        axios.get(`${process.env.REACT_APP_HOST_URL}`).then((response) => {
            setProducts(response.data.products);
        }).catch((error) => {
            console.log(error.message);
        })
    }

    useEffect(() => {
        getProducts()
    }, [])
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
                    </React.Fragment>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductDetails;