import { useState } from "react"
import axios from 'axios'
import Swal from "sweetalert2"
import load from "load-script";
import Adminsidebar from "./Components/Adminsidebar";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function Categories() {
    load('assets/script.js', function (err, script) {
        if (err) {
            // print useful message
        } else {
            console.log(script.src);// Prints 'foo'.js'
            // use script
            // note that in IE8 and below loading error wouldn't be reported
        }
    });
    
    let [category_name, setcategory_name] = useState("")
    let [description, setdescription] = useState("")

    function insertcategory(e) {
        e.preventDefault()
        console.log(`${category_name} ${description}`)
        let formData = new FormData()
        formData.append('category_name', category_name)
        formData.append('description', description)

        axios.post('http://localhost:3001/add-category', {
            "category_name": category_name,
            "description": description,

        })
            .then(res => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'category added successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }
    return (
        <>
        <Adminsidebar/>
        <Navbar/>
            {/* <div className="container-md justify-content-center">
                <h1 className="offset-md-4 align-middle">ADD NEW CATEGORY</h1>
                <div className="jumbotron ">
                    <form className="bg-info text-dark " id={"category"} onSubmit={(event) => insertcategory(event)}>
                        <div className="form-group col-md-4 offset-md-4">
                            <label className="" htmlFor=""> Category Name </label>
                            <input onChange={(e) => setcategory_name(e.target.value)} data-rule-required={true} type="text" className="form-control  " id="category_name" name="category_name" placeholder="add name to the category" />
                        </div>
                        <div className="form-group col-md-4 offset-md-4">
                            <label className="" htmlFor=""> Description </label>
                            <input onChange={(e) => setdescription(e.target.value)} data-rule-required={true} type="text" className="form-control form-control-lg " id="description" name="description" placeholder="add description" />
                        </div>

                    </form>


                    <div>
                        <button 
                        onClick={insertcategory} 
                        id="submitbtn" type="button" className="btn btn-success offset-md-4 ">Submit</button>
                    </div>
                </div>
            </div> */}
            <div id="content-page" className="content-page">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-sm-12">
                     <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                           <div className="iq-header-title">
                              <h4 className="card-title">Add Category</h4>
                           </div>
                        </div>
                        <div className="iq-card-body">
                           <form   id={"categoryadd"} onSubmit={(event) => insertcategory(event)}>
                              <div className="form-group">
                                 <label>Category Name:</label>
                                 <input  onChange={(e) => setcategory_name(e.target.value)} required={true}  type="text" className="form-control"/>
                              </div>
                              <div className="form-group">
                                 <label>Book Description:</label>
                                 <textarea  onChange={(e) => setdescription(e.target.value)} required={true} className="form-control" rows="4"></textarea>
                              </div>
                              <button type="submit" id="submitbtn" className="btn btn-primary">Submit</button>
                           </form>
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

export default Categories