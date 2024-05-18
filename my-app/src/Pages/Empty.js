import { Link } from "react-router-dom"

function Empty() {
    return (
        <>
{/* <!-- Wrapper Start --> */}
        <div className="wrapper">
            <div className="container p-0">
                <div className="row no-gutters height-self-center">
                    <div className="col-sm-12 text-center align-self-center">
                        <div className="iq-error position-relative">
                            <img src="assets/images/error/404.png" className="img-fluid iq-error-img" alt=""/>
                            <h2 className="mb-0 mt-4">Oops! The Cart is Empty.</h2>
                            <p>There are no products in the cart</p>
                            <Link className="nav-link" to="/" ><a className="btn btn-sm iq-bg-success col-md-4  mt-2"><i className="ri-home-4-line"></i>Back to Home</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Wrapper END --> */}

        </>
    )
}
export default Empty