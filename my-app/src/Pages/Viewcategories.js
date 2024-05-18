import axios from "axios";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "./Components/Navbar"
import {FaTrashAlt, FaUserEdit} from "react-icons/fa";
import {FcFullTrash} from "react-icons/fc";
import Updatecategory from "./Updatecategories";
import Footer from "./Components/Footer";
import Adminsidebar from "./Components/Adminsidebar";
import Swal from "sweetalert2";
import Categories from "./Categories";

function Viewcategories() {
    let navigate = useNavigate();

    let [Categories, setcategories] = useState([]);

    function fetchcategories() {
        axios.get("http://localhost:3001/get-category")
            .then(res => {
                console.log(res.data);
                setcategories(res.data);
            })
    }

    useEffect(() => {
        fetchcategories();
    }, []);

    // DELETE
    function deletecategories(category_name) {
         console.log(category_name);
         

        Swal.fire({
            title: 'Are you sure to Delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`http://localhost:3001/delete-category?category_name=${category_name}`)
                    .then(res => {
                        // console.log(res.data);

                        if (res.data === "deleted") {
                            fetchcategories
                ();

                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    });
            }
        })


    }
//Update
    function Updatecategory(category_id) {
        // navigate("/edit-category/" + categoryid);
            // navigate(`/Updatecategories/${category_id}`);
            navigate(`/Updatecategories/${category_id}`);
        }
        function addcategory() {
            // navigate("/edit-category/" + categoryid);
                // navigate(`/Updatecategories/${category_id}`);
                navigate(`/Categories`);
            }
    return (
        <>

        <Adminsidebar/>
            <Navbar/>

            
            <div className="content-page" id="content-page" >
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="iq-card">
                                <div class="iq-card-header d-flex justify-content-between">
                                    <div class="iq-header-title">
                                        <h4 class="card-title">Category List</h4>
                <table className={"table table-borderless table-responsive-md table-striped text-center"}>
                    <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th colSpan={2}>Controls</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        Categories.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{value.category_name}</td>
                                    <td>{value.description}</td>
                                   
                                    <td>

                                        <FaTrashAlt onClick={() => deletecategories(value.category_name)}
                                                    className={"text-danger"}/>
                                    </td>

                                    <td>
                                        <FaUserEdit className={"text-warning"}
                                                    onClick={() => Updatecategory(value.category_id)}/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <button onClick={() => addcategory()}  type="button" className=" align-self-end btn btn-sm iq-bg-success col-md-4 offset-md-4 mt-2">Add</button>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            
            <Footer/>
        </>
    );
}

export default Viewcategories;