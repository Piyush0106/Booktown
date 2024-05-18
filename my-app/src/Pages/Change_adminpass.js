import { useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"
import load from "load-script";
import Adminsidebar from "./Components/Adminsidebar";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
function Change_adminpass(){
    load('assets/script.js', function (err, script) {
        if (err) {
            // print useful message
        } else {
            console.log(script.src);// Prints 'foo'.js'
            // use script
            // note that in IE8 and below loading error wouldn't be reported
        }
    });
    let [oldpassword, setoldpassword] = useState("")
    let [newpassword, setnewpassword] = useState("")
    let [confirmpassword, setconfirmpassword] = useState("")

     function handlepassword(e){
        e.preventDefault()
        console.log(`${oldpassword} ${newpassword} ${confirmpassword}`)
        let formData = new FormData()
        formData.append('oldpassword', oldpassword)
        formData.append('newpassword', newpassword)
        formData.append('confirmpassword', confirmpassword)
         axios.post('http://localhost:3001/admin-change-password-action',formData)
         .then(res => {
            console.log(res.data)

            if (res.data === "invalidpassword") {
                // alert('Invalid Old Password');
                Swal.fire({
                    icon: 'warning',
                    title: 'Invalid Old Password',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if(res.data === "notmatch") {
                // alert('New Pass & Confirm Pass must be same.');
                Swal.fire({
                    icon: 'warning',
                    title: 'New Pass & Confirm Pass must be same.',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if(res.data === "notsame") {
                // alert('New Pass & Confirm Pass must be same.');
                Swal.fire({
                    icon: 'warning',
                    title: 'New Pass & Old Pass must not be same.',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else{
                // alert('Success')
                Swal.fire({
                    icon: 'success',
                    title: 'Success.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
     }
    return(
        <>
        <Adminsidebar/>
        <Navbar/>
        <div id="content-page" className="content-page">
            <div className="container-fluid">
        {/* <div className="container-md justify-content-center" id="adpasschange"> */}
                {/* <div className="container p-0"> */}
                    <div className="row no-gutters height-self-center">
                        <div className="col-sm-12 align-self-center page-content rounded">
                            <div className="row m-0">
                                <div className="col-sm-12 sign-in-page-data">
                                    <div className="sign-in-from bg-primary rounded">
                                        <h3 className="mb-0 text-center text-white">Update Password</h3>
                                        <form className="mt-4 form-text" id={"adpasschange"} onSubmit={(event) => handlepassword(event)}>
                                               
    
                                            <div className="form-group ">
                                                <label htmlFor="">Old-Password</label>
                                                <input onChange={(e) => setoldpassword(e.target.value)} required={true}  type="Password" className="form-control" id="olPassword" name="olPassword" placeholder="Old-Password" />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor="">New-Password</label>
                                                <input onChange={(e) => setnewpassword(e.target.value)} required={true} minLength={6}  type="Password" className="form-control" id="nPassword" name="nPassword" placeholder="New-Password" />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor="">Confirm-Password</label>
                                                <input onChange={(e) => setconfirmpassword(e.target.value)} required={true} equalTo="#Password" type="Password" className="form-control" id="conpassword" name="conpassword" placeholder="Re-enter Password" />
                                            </div>
                                            
                                           
                
                                            <div>
                                                <button id="submitbtn" type="submit" className=" btn mt-3 btn-white d-block w-100 mb-2 ">Update</button>
                                            </div>


                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default Change_adminpass