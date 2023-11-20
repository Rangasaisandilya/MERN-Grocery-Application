import React from "react";
import LoaderImage from '../assets/spinner.gif'

const Loader = () => {
    return (
        <React.Fragment>
            <div>
                <img src={LoaderImage} alt="" className="d-block m-auto" />
            </div>
        </React.Fragment>
    )
};
export default Loader;