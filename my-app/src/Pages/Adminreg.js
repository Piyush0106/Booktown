import { useState } from "react"
import axios from 'axios'
import Swal from "sweetalert2"
import load from "load-script";
import { useNavigate } from "react-router-dom";

function Adminreg() {
    const navigate = useNavigate()
    load('assets/script.js', function (err, script) {
        if (err) {
            // print useful message
        } else {
            // console.log(script.src);// Prints 'foo'.js'
            // use script
            // note that in IE8 and below loading error wouldn't be reported
        }
    });

    let [Email, setEmail] = useState("")
    let [Password, setPassword] = useState("")
    let [Repassword, setRepassword] = useState("")
    let [Fullname, setFullname] = useState("")
    let [Mobilenumber, setMobilenumber] = useState("")
    let [admintype, setadmintype] = useState("")
    // function handleForm() {
    //     console.log(`${Email} ${Password} ${Repassword} ${Fullname} ${Mobilenumber} ${admintype}`)

    // }
    function register(e) {
        e.preventDefault()
        console.log(`${Email} ${Password} ${Repassword} ${Fullname} ${Mobilenumber} ${admintype}`)
        let formData = new FormData()
        formData.append('email', Email)
        formData.append('password', Repassword)
        formData.append('fullname', Fullname)
        formData.append('mobile_number', Mobilenumber)
        formData.append('admin_type', admintype)

        axios.post('http://localhost:3001/adminreg', {
            "email": Email,
            "password": Repassword,
            "fullname": Fullname,
            "mobile": Mobilenumber,
            "admin_type": admintype
        }).then(res => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'regestration successful',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

navigate('/Adminlogin')
        {// {
            //     email: setEmail ,
            //     password: setRepassword,
            //     fullname: setFullname, 
            //     mobile_number: setMobilenumber,
            //     admin_type:  setadmintype
            // // }).then((Response)=>{
            //     console.log(Response);


            // })
        }
    }
    return (
        <>
            <div className="container-md justify-content-center" id="adminreg">
                <div className="container p-0">
                    <div className="row no-gutters height-self-center">
                        <div className="col-sm-12 align-self-center page-content rounded">
                            <div className="row m-0">
                                <div className="col-sm-12 sign-in-page-data">
                                    <div className="sign-in-from bg-primary rounded">
                                        <h3 className="mb-0 text-center text-white">Admin Sign Up</h3>
                                        <form className="mt-4 form-text" id={"adsignup"} onSubmit={(event) => register(event)}>
                                               <div className="form-group ">
                                                <label htmlFor="">Full Name </label>
                                                <input onChange={(e) => setFullname(e.target.value)} minLength="2" required={true}
                                                 type="name" className="form-control" id="Fullname" name="Fullname" placeholder="Example: Amit Kumar" />
                                            </div>
                                            <div className="form-group ">
                                                <label className="" htmlFor="">Email</label>
                                                <input onChange={(e) => setEmail(e.target.value)} required={true} type="email" 
                                                className="form-control" id="Email" name="Email" placeholder="Example:abc@123" />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor="">Password</label>
                                                <input onChange={(e) => setPassword(e.target.value)} required={true}
                                                 minLength={6} maxLength={10} type="Password" className="form-control" 
                                                 id="Password" name="Password" placeholder="Password" />
                                            </div>
                                            <div className="form-group ">
                                                <label htmlFor="">Re-enter Password</label>
                                                <input onChange={(e) => setRepassword(e.target.value)} required={true} 
                                                data-rule-equalto="#Password" type="Password" className="form-control" id="Repassword" 
                                                name="Repassword" placeholder="Re-enter Password" />
                                            </div>
                                            
                                            <div className="form-group ">
                                                <label htmlFor="">Mobile Number </label>
                                                <input onChange={(e) => setMobilenumber(e.target.value)}
                                                   required={true}
                                                    minLength={10} maxLength={10} 
                                                    type="tel" className="form-control" id="Mobilenumber" name="Mobilenumber"
                                                    placeholder="9417######" />
                                            </div>
                                            <select onChange={(e) => setadmintype(e.target.value)}  required={true} className="custom-select " id="admintype" name="admintype">
                                                <option defaultValue>Select Admin Type</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Co-Admin">Co-Admin</option>
                                            </select>
                                            <div>
                                                <button id="submitbtn" type="submit" className=" btn mt-3 btn-white d-block w-100 mb-2 ">Sign-Up</button>
                                            </div>


                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="Container justify-content-center" id="adminreg">
                <h2 className="offset-md-4 align-middle text-dark">ADMIN REGISTRATION</h2>
                <form id={"signup"} onSubmit={(event) => register(event)}>
                    <div className=" form-group  bg-primary text-white border border-secondary">

                        <div className=" col-md-4 offset-md-4">

                            <label className="form-label">Email address</label>
                            <input onChange={(e) => setEmail(e.target.value)} data-rule-required='true' type="text" className="form-control" id="Email" name="adminid" />
                        
                        </div>
                        <div className="col-md-4 offset-md-4">
                            <label htmlFor="" className="form-label">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" data-rule-required='true' className="form-control" id="Password" name="Password" />
                            
                        </div>
                        <div className="col-md-4 offset-md-4">
                            <label htmlFor="" className="form-label"> Re-enter Password</label>
                            <input onChange={(e) => setRepassword(e.target.value)} type="password" data-rule-required='true' className="form-control" id="Repassword" name="Repassword" />
                           
                        </div>
                        <div className="col-md-4 offset-md-4">
                            <label htmlFor="" className="form-label"> FullName</label>
                            <input onChange={(e) => setFullname(e.target.value)} type="text" data-rule-required='true' className="form-control" id="Fullname" name="Fullname" />
                           
                        </div>
                        <div className="col-md-4 offset-md-4">
                            <label htmlFor="" className="form-label"> MobileNumber </label>
                            <input onChange={(e) => setMobilenumber(e.target.value)} type="text" data-rule-required='true' className="form-control" id="Mobilenumber" name="Mobilenumber" />
                            
                        </div>
                        <div className="col-md-4 offset-md-4">
                            <select  onChange={(e)=>setadmintype(e.target.value)} data-rule-required='true' className="custom-select" id="admintype" name="admintype">
                                <option value=''>select type </option>
                                <option value='admin'> Admin </option>
                                <option value="co-admin">Co-Admin</option>
                            </select>
                            <div>

                                <button onClick={register} id="submitbtn" type="button" className="btn btn-success offset-md-4 ">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div> */
            }



        </>

    )
}

export default Adminreg