import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"
import load from "load-script";
import Adminsidebar from "./Components/Adminsidebar";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function Updatecategories() {
    // load('public\assets\js\script.js', function (err, script) {
    //     if (err) {
    //         // print useful message
    //     } else {
    //         console.log(script.src);// Prints 'foo'.js'
    //         // use script
    //         // note that in IE8 and below loading error wouldn't be reported
    //     }
    // });

    let { category_id } = useParams();
    let [category_name, setCategoryname] = useState("");
    let [description, setDescription] = useState("");

    function GetDetails() {
        axios.get(`http://localhost:3001/getcategorybyid?category_id=${category_id}`)
            .then(res => {
                console.log(res.data);

                let Category = res.data;
                setCategoryname(Category[0].category_name);
                setDescription(Category[0].description);

            })
    }

    useEffect(() => {
        GetDetails();
    }, [])

    function handleCategory(e) {
        e.preventDefault();

        console.log(`${category_name} ${description}`);

        let formData = new FormData();
        formData.append("category_name", category_name);
        formData.append("category_id", category_id);
        formData.append("description", description);

        axios.post("http://localhost:3001/update-category", {
            category_id,
            category_name,
            description
        })
            .then(res => {

                if (res.data === "required") {
                    Swal.fire({
                        title: 'Add fields',
            text: "fields can't be empty",
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
                        title: 'category Updated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })

                }
            })
    }
    return (
        <>
        <Adminsidebar/>
        <Navbar/>
            {/* <div className="container-md justify-content-center" >
                <h1 className="offset-md-4 align-middle">UPDATE CATEGORY</h1>
                <div className="jumbotron ">

                    <form className="bg-info text-dark " id={"category"} onSubmit={(event) => handleCategory(event)}>
                        <div className="form-group col-md-4 offset-md-4">
                            <label className="" htmlFor=""> Category Name </label>
                            <input value={category_name} onChange={(e) => setCategoryname(e.target.value)} data-rule-required={true} type="text" className="form-control  " id="category_name" name="category_name" placeholder="add name to the category" />
                        </div>
                        <div className="form-group col-md-4 offset-md-4">
                            <label className="" htmlFor=""> Description </label>
                            <input value={description} onChange={(e) => setDescription(e.target.value)} data-rule-required={true} type="text" className="form-control form-control-lg " id="description" name="description" placeholder="add description" />
                        </div>
                        <div className="form-group">
                           <input defaultValue={category_id} name={'category_id'}  hidden={true} id={'category_id'}/>
                        </div>


                    </form>


                    <div>
                        <button onClick={handleCategory} id="submitbtn" type="button" className="btn btn-success offset-md-4 ">Submit</button>
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
                              <h4 className="card-title">Update Category</h4>
                           </div>
                        </div>
                        <div className="iq-card-body">
                           <form   id={"categoryupdate"} onSubmit={(event) => handleCategory(event)}>
                              <div className="form-group">
                                 <label>Category Name:</label>
                                 <input value={category_name} onChange={(e) => setCategoryname(e.target.value)} required={true}  type="text" className="form-control"/>
                              </div>
                              <div className="form-group">
                                 <label>Book Description:</label>
                                 <textarea value={description} onChange={(e) => setDescription(e.target.value)} required={true} className="form-control" rows="4"></textarea>
                              </div>
                              <button type="submit"  id="submitbtn" className="btn btn-primary">Submit</button>
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
export default Updatecategories
    ;