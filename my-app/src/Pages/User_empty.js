import { Link } from "react-router-dom"
import Usersidebar from "./Components/Usersidebar"
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"

function User_empty() {
    return (
        <>
            <Usersidebar />
            <Navbar />
           
            <div className="content-page" id="content-page" >
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="iq-card">
                                <div className="col-sm-12 text-center align-self-center">
                                    <div className="iq-error position-relative">
                                        <img src="assets/images/error/404.png" className="img-fluid iq-error-img" alt="" />
                                        <h2 className="mb-0 mt-4">Oops! This Page is Empty.</h2>
                                        <p>There are No Orders to Show</p>
                                        {/* <Link className="nav-link" to="/" ><a className="btn btn-secondary mt-3"><i className="ri-home-4-line"></i>Back to Home</a></Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <Footer />

        </>
    )
}
export default User_empty