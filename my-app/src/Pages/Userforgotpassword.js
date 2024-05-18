import { useState } from "react";
import axios from "axios";


// import {useNavigate} from "react-router-dom";
import load from "load-script";
import Publicsidebar from "./Components/Publicsidebar";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";


function Userforgotpassword() {
    load('../js/script.js', function (err, script) {
        if (err) {
            // print useful message
        } else {
            console.log(script.src);// Prints 'foo'.js'
            // use script
            // note that in IE8 and below loading error wouldn't be reported
        }
    });
    // let navigate=useNavigate();
    let [email, setEmail] = useState("");

    function handleuserrecoverpassword(e) {
        e.preventDefault();

        console.log(`${email}`);

        let formData = new FormData();
        formData.append("email", email);

        axios.post("http://localhost:3001/user-forgot-password-action", formData).then(res => {
            console.log(res.data);

            if (res.data === "Invalid Email") {
                alert(res.data);
            } else if (res.data === "error") {
                alert(res.data);
            } else {
                alert("Email Sent Successfully.");
                // navigate("/user-home");

            }
        });

    }

    return (
        <>


            <Publicsidebar />
            <Navbar />


            {/* <section className="checkout-section ptb-95 mobile-padding"> */}
            <div id="content-page" className="content-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <form className="main-form full" id={"forgotuserpassword"}
                                        onSubmit={(event) => handleuserrecoverpassword(event)}>
                                        <div className="row">
                                            <div className="iq-card-body">
                                                <div className="form-group">
                                                    <h2 className="heading">Forgot Your Password?</h2>
                                                </div>
                                                <p>Please Enter Your Email You Use to Login</p>
                                            </div>

                                            <div className="form-group">
                                                <div className="input-box">
                                                    <label htmlFor="email">Email</label>
                                                    <input onChange={(e) => setEmail(e.target.value)}
                                                        type="email" data-rule-required={"true"}
                                                        id={"email"} name={"email"} />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <button name="submit" type="submit"
                                                    className="btn btn-color right-side">Forgot
                                                    Password
                                                </button>
                                            </div>
                                            <div className="form-group"><a title="Forgot Password" style={{ fontWeight: "600" }}
                                                className="forgot-password mtb-20"
                                                href="/Userlogin">Back
                                                to Login</a>
                                                <hr />
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </section> */}
            <Footer />



        </>
    )
}

export default Userforgotpassword;