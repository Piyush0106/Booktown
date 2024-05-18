import { useState } from "react"
import axios from 'axios'
import Swal from "sweetalert2"
import {Link, useNavigate} from "react-router-dom";
import Publicsidebar from "./Components/Publicsidebar";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
// import load from "load-script";
// imprt useNavigate



function Adminlogin(){
    const navigate = useNavigate()
    {// load('public\js\script.js', function (err, script) {
    //     if (err) {
    //         // print useful message
    //     } else {
    //         console.log(script.src);// Prints 'foo'.js'
    //         // use script
    //         // note that in IE8 and below loading error wouldn't be reported
    //     }
    // });
    }
    let [email, setemail] = useState("")
    let [password, setpassword] = useState("")
    function handlelogin(e){
     e.preventDefault();
    let formData = new FormData();
    formData.append('email', email)
    formData.append('password', password)
    console.log(`${email} ${password}`)
    axios.post("http://localhost:3001/admin-login", formData)
    .then(res => {

        if (res.data === "invalid") {
            Swal.fire({
                title: 'Error',
    text: "invalid entry",
    icon: 'warning',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok'
            })
        } else {
            console.log(res)
            Swal.fire({
                icon: 'success',
                title: 'admin LOgin successfully',
                showConfirmButton: false,
                timer: 1500

                
            })
navigate('/Admin_home')
        }
    })
    
    
    }



return(
<>
<Publicsidebar/>
<Navbar/>
<div id="content-page" className="content-page">
                <div className="container-fluid">
<section className="sign-in-page">
    <div className="container p-0">
        <div className="row no-gutters height-self-center">
          <div className="col-sm-12 align-self-center page-content rounded">
            <div className="row m-0">
              <div className="col-sm-12 sign-in-page-data">
                  <div className="sign-in-from bg-primary rounded">
                      <h3 className="mb-0 text-center text-white">Admin Sign-in</h3>
                      <p className="text-center text-white">Enter your email address and password to access admin panel.</p>
                      <form className="mt-4 form-text" id="adminlogin"  onSubmit={(event) => handlelogin(event)}>
                          <div className="form-group">
                              <label for="exampleInputEmail1">Email address</label>
                              <input type="email" onChange={(e) => setemail(e.target.value)} className="form-control mb-0" id="Email" placeholder="Enter email"/>
                          </div>
                          <div className="form-group">
                              <label for="exampleInputPassword1">Password</label>
                              {/* <a className="float-right text-dark">Forgot password?</a> */}
                              <input type="password" onChange={(e) => setpassword(e.target.value)} data-rule-required={true} className="form-control mb-0" id="Password" placeholder="Password"/>
                          </div>
                          {/* <div className="d-inline-block w-100">
                              <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                  <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                  <label className="custom-control-label" for="customCheck1">Remember Me</label>
                              </div>
                          </div> */}
                          <div className="sign-info text-center">
                              <button id="submitbtn" type="submit" className="btn btn-white d-block w-100 mb-2">Sign in</button>
                              <span className="text-dark dark-color d-inline-block line-height-2"> Don't have an admin account ? <Link className="nav-link"
                                        to="/adminreg"><a  className=" text-white">Sign up</a></Link></span>
                          </div>
                      </form>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</section>
</div>
    </div>
<Footer/>
</>
)

}
export default Adminlogin