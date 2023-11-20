import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, updateProduct, updateProductForm } from "../../Store/actions";

const UpdateProduct = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedProduct } = useSelector((state) => state.ProductReducer);
    const { id } = useParams();
    // changeInput
    let changeInput = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        dispatch(updateProductForm(key, value));
    };

    let changeImage = async (event) => {
        let imageFile = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.addEventListener('load', () => {
            if (reader.result) {
                dispatch(updateProductForm("image", reader.result));
            } else {
                alert('Error Occurred');
            }
        });
    };

    const submitProduct = (event) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(updateProduct(id, selectedProduct, navigate, swal));
    }

    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [id])
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
                                            name="name"
                                            className="form-control"
                                            value={selectedProduct?.name}
                                            placeholder="product name"
                                            onChange={changeInput}
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            name="price"
                                            type="text"
                                            required
                                            className="form-control"
                                            value={selectedProduct?.price}
                                            placeholder="product price"
                                            onChange={changeInput}
                                        />
                                    </div>

                                    <div className="form-group mt-3">
                                        <input
                                            name="quantity"
                                            type="text"
                                            required
                                            className="form-control"
                                            value={selectedProduct?.quantity}
                                            placeholder="product quantity"
                                            onChange={changeInput}
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <textarea
                                            name='info'
                                            className="form-control"
                                            required
                                            value={selectedProduct?.info}
                                            placeholder="product info"
                                            rows="3"
                                            onChange={changeInput}
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
                                                selectedProduct?.image &&
                                                <img src={selectedProduct?.image} alt="" width="20"
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