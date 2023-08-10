

import React from "react";
import {Link} from "react-router-dom";
const Navbar =()=>{
    return(
        <React.Fragment>
            <nav className="navbar navbar-dark bg-success navbar-expand-sm">
                <div className="container">
                    <Link to='/' className="navbar-brand">
                        <i className="fa fa-shopping-cart"/> Grocery Management</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to='/' className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/products' className="nav-link">Products</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to='/admin' className="nav-link text-white">Admin</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default  Navbar;