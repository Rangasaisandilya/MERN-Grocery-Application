import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const UpdateProduct = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        image: '',
        info: ''
    })


    const twoWaybind = (key, value) => {

        setProduct({
            ...product,
            [key]: value
        })

    }

    let changeImage = async (event) => {
        let imageFile = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.addEventListener('load', () => {
            if (reader.result) {
                setProduct({
                    ...product,
                    image: reader.result
                });
            } else {
                alert('Error Occurred');
            }
        });
    };

    const submitProduct = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let dataurl = `${process.env.REACT_APP_HOST_URL}/${id}`
        axios.put(dataurl, product).then((result) => {
            swal({
                title: "Product Updated!",
                icon: "success",
                button: "Ok",
            });
            setProduct({
                name: '',
                price: '',
                quantity: '',
                image: '',
                info: ''
            })
            navigate('/admin')
        }
        ).catch((error) => {
            swal({
                title: "Something went wrong!",
                icon: "error",
                button: "Ok",
            });
        })

    }

    useEffect(() => {
        let dataurl = `${process.env.REACT_APP_HOST_URL}/${id}`
        axios.get(dataurl).then((response) => {
            setProduct(response.data.product)
        })
    }, [])
    return (
        <React.Fragment>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <p className="h4 text-success">Update Product</p>
                        <p className="lead">Please update the product details in the below mentioned section with the name price quantity information and product image</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-header bg-dark text-white">
                                <p className="h4">Enter the Product details </p>
                            </div>
                            <div className="card-body">
                                <form onSubmit={(event) => submitProduct(event)}>
                                    <div className="form-group ">
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            value={product?.name}
                                            placeholder="product name"
                                            onChange={(event) => twoWaybind("name", event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            value={product?.price}
                                            placeholder="product price"
                                            onChange={(event) => twoWaybind("price", event.target.value)}
                                        />
                                    </div>

                                    <div className="form-group mt-3">
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            value={product?.quantity}
                                            placeholder="product quantity"
                                            onChange={(event) => twoWaybind("quantity", event.target.value)}
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <textarea
                                            className="form-control"
                                            required
                                            value={product?.info}
                                            placeholder="product info"
                                            rows="3"
                                            onChange={(event) => twoWaybind("info", event.target.value)}
                                        />
                                    </div>

                                    <div className="form-group mt-3">
                                        <div className="custom-file">
                                            <input
                                                className="form-control"
                                                onChange={changeImage}
                                                type="file"
                                                id="customFile" />
                                            <label className="custom-file-label" htmlFor="customFile">Product
                                                Image</label>
                                            {
                                                product.image &&
                                                <img src={product.image} alt="" width="20"
                                                    height="20" />
                                            }
                                        </div>
                                    </div>
                                    <button className="btn btn-secondary text-white mt-3">Submit</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: '60px' }} />
        </React.Fragment>
    )
}

export default UpdateProduct;