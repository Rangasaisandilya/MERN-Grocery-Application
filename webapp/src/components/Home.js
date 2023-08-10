import React from "react";


const Home =()=>{
    return(
        <React.Fragment>
            <div className="landing-page">
                <div className="wrapper">
                    <div className="d-flex flex-column text-center justify-content-center align-items-center h-100">
                        <h2 className="display-3 animated slideInDown">
                            <i className="fa fa-shopping-cart"/> Grocery management</h2>
                        <p className="lead px-3 animated slideInUp">grocery product management system where user can add update and delete the products</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;