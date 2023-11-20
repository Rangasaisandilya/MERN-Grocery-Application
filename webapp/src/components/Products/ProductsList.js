import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Store/actions";
import Loader from "../Loader";

let ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.ProductReducer);

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, []);

    return (
        <React.Fragment>
            <div className="container mt-3">
                <div className="row animated slideInLeft">
                    <div className="col">
                        <p className="h3 text-success">Products Page</p>

                    </div>
                </div>
                <div className="row animated zoomIn delay-1s">
                    {
                        loading ? <Loader /> : <>
                            {
                                products?.length > 0 ?
                                    <React.Fragment>
                                        {
                                            products.map((product) => {
                                                return (
                                                    <div key={product._id} className="col-md-3">
                                                        <div className="card">
                                                            <div className="card-header text-center bg-white">
                                                                <img src={product.image} alt="" width="150" height="150" />
                                                            </div>
                                                            <div className="card-body">
                                                                <ul className="list-group">
                                                                    <li className="list-group-item">
                                                                        Name : {product.name}
                                                                    </li>
                                                                    <li className="list-group-item">
                                                                        Price : &#8377; {product.price.toFixed(2)}
                                                                    </li>
                                                                    <li className="list-group-item">
                                                                        Qty : {product.quantity} Kgs
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </React.Fragment> : <React.Fragment>
                                        <div>
                                            <p className="h5 text-danger">---------------- No Products Available --------------</p>
                                        </div>
                                    </React.Fragment>
                            }
                        </>
                    }

                </div>
            </div>
        </React.Fragment>
    )
};
export default ProductList;
