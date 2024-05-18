import { useState } from "react"
import axios from 'axios'
import Swal from "sweetalert2"
import load from "load-script";
import { useNavigate } from "react-router-dom";
function Userreg() {
    const navigate = useNavigate()
    load('assets/script.js', function (err, script) {
        if (err) {
            // print useful message
        } else {
            console.log(script.src);// Prints 'foo'.js'
            // use script
            // note that in IE8 and below loading error wouldn't be reported
        }
    });
    let [Email, setEmail] = useState("")
    let [Password, setPassword] = useState("")
    let [Repassword, setRepassword] = useState("")
    let [Fullname, setFullname] = useState("")
    let [Mobilenumber, setMobilenumber] = useState("")
    let [otp, setotp] = useState("")
    let [address, setaddress] = useState("")
    let [city, setcity] = useState("")
    let [pincode, setpincode] = useState("")
    let [gender, setgender] = useState("")

    function register(e) {
        e.preventDefault()
        console.log(`${Email} ${Password} ${Repassword} ${Fullname} ${Mobilenumber} ${otp} ${address} ${city} ${pincode} ${gender}`)
        let formData = new FormData()
        formData.append('email', Email)
        formData.append('password', Repassword)
        formData.append('fullname', Fullname)
        formData.append('mobile_number', Mobilenumber)
        formData.append('otp', otp)
        formData.append('address', address)
        formData.append('city', city)
        formData.append('pincode', pincode)
        formData.append('gender', gender)

        axios.post('http://localhost:3001/userreg', {
            "email": Email,
            "password": Repassword,
            "fullname": Fullname,
            "mobile_number": Mobilenumber,
            "otp": otp,
            "address": address,
            "city": city,
            "pincode": pincode,
            "gender": gender

        })
            .then(res => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'regestration successful',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            navigate('/Userlogin')

    }
    return (
        <>
            <div className="container-md justify-content-center" id="userreg">
                <div className="container p-0">
                    <div className="row no-gutters height-self-center">
                        <div className="col-sm-12 align-self-center page-content rounded">
                            <div className="row m-0">
                                <div className="col-sm-12 sign-in-page-data">
                                    <div className="sign-in-from bg-primary rounded">
                                        <h3 className="mb-0 text-center text-white">User Sign Up</h3>
                                        <form className="mt-4 form-text" id={"usersignup"} onSubmit={(event) => register(event)}>
                                        <div className="form-group ">
                                                <label htmlFor="">Full Name </label>
                                                <input onChange={(e) => setFullname(e.target.value)} required={true} type="text" className="form-control" id="Fullname" name="Fullname" placeholder="Example: Amit Kumar" />
                                            </div>
                                            <div className="form-group ">
                                                <label className="" htmlFor="">Email</label>
                                                <input onChange={(e) => setEmail(e.target.value)} required={true} type="text" className="form-control" id="Email" name="Email" placeholder="Example:abc@123" />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor="">Password</label>
                                                <input onChange={(e) => setPassword(e.target.value)} required={true} minLength={6} maxLength={10} type="Password" className="form-control" id="Password" name="Password" placeholder="Password" />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor="">Re-enter Password</label>
                                                <input onChange={(e) => setRepassword(e.target.value)} required={true} equalTo={'#Password'} type="Password" className="form-control" id="Repassword" name="Repassword" placeholder="Re-enter Password" />
                                            </div>
                                           
                                            <div className="form-group ">
                                                <label htmlFor="">Mobile Number </label>
                                                <input onChange={(e) => setMobilenumber(e.target.value)}
                                                    required={true}
                                                    minLength={10} maxLength={10}
                                                    type="tel" className="form-control" id="Mobilenumber" name="Mobilenumber"
                                                    placeholder="9417######" />
                                            </div>
                                            {/* <div className="form-group ">
                                                <label htmlFor=""> OTP </label>
                                                <input onChange={(e) => setotp(e.target.value)} data-rule-required={true} type="number" className="form-control" id="otp" name="otp" placeholder="otp" />
                                            </div> */}
                                            <div className="form-group ">
                                                <label htmlFor=""> Address </label>
                                                <input onChange={(e) => setaddress(e.target.value)} required={true} type="text" className="form-control" id="address" name="address" placeholder="address" />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor=""> City </label>
                                                <input onChange={(e) => setcity(e.target.value)} required={true} type="text" className="form-control" id="city" name="city" placeholder="city" />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor=""> pincode </label>
                                                <input onChange={(e) => setpincode(e.target.value)} required={true} type="number" className="form-control" id="pincode" name="pincode" placeholder="pincode" />
                                            </div>

                                            <select onChange={(e) => setgender(e.target.value)} required={true} className="custom-select " id="gender" name="gender">
                                                <option defaultValue>Choose Gender</option>
                                                <option value="MALE">MALE</option>
                                                <option value="FEMALE">FEMALE</option>
                                            </select>
                                            <div>
                                                <button id="submitbtn" type="submit" className="btn mt-3 btn-white d-block w-100 mb-2 ">Sign-Up</button>
                                            </div>


                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <section className="sign-in-page">
            <div className="container p-0">
                <div className="row no-gutters height-self-center">
                  <div className="col-sm-12 align-self-center page-content rounded">
                    <div className="row m-0">
                      <div className="col-sm-12 sign-in-page-data">
                          <div className="sign-in-from bg-primary rounded">
                              <h3 className="mb-0 text-center text-white">Sign Up</h3>
                              <p className="text-center text-white">Enter your email address and password to access admin panel.</p>
                              <form className="mt-4 form-text">
                                  <div className="form-group">
                                      <label for="exampleInputEmail1">Your Full Name</label>
                                      <input type="email" className="form-control mb-0" id="exampleInputEmail1" placeholder="Your Full Name">
                                  </div>
                                  <div className="form-group">
                                      <label for="exampleInputEmail2">Email address</label>
                                      <input type="email" className="form-control mb-0" id="exampleInputEmail2" placeholder="Enter email">
                                  </div>
                                  <div className="form-group">
                                      <label for="exampleInputPassword1">Password</label>
                                      <input type="password" className="form-control mb-0" id="exampleInputPassword1" placeholder="Password">
                                  </div>
                                  <div className="d-inline-block w-100">
                                      <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                          <input type="checkbox" className="custom-control-input" id="customCheck1">
                                          <label className="custom-control-label" for="customCheck1">I accept <a href="#" className="text-light">Terms and Conditions</a></label>
                                      </div>
                                  </div>
                                  <div className="sign-info text-center">
                                      <button type="submit" className="btn btn-white d-block w-100 mb-2">Sign Up</button>
                                      <span className="text-dark d-inline-block line-height-2">Already Have Account ? <a href="sign-in.html" className="text-white">Log In</a></span>
                                  </div>
                              </form>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </section> */}



        </>

    )
}

export default Userreg