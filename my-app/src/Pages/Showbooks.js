import axios from "axios";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "./Components/Navbar"
import {FaTrashAlt, FaUserEdit} from "react-icons/fa";
import {FcFullTrash} from "react-icons/fc";
import Updatebook from "./Updatecategories";

import Swal from "sweetalert2";
import Categories from "./Categories";
import Adminsidebar from "./Components/Adminsidebar";
import Footer from "./Components/Footer";

function Showbooks() {
    let navigate = useNavigate();

    let [Books, setBooks] = useState([]);

    function fetchbooks() {
        axios.get("http://localhost:3001/get-book")
            .then(res => {
                console.log(res.data);
                setBooks(res.data);
            })
    }

    useEffect(() => {
        fetchbooks();
    }, []);

    // DELETE
    function deletebook(book_name) {
         console.log(book_name);

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
                axios.get(`http://localhost:3001/delete-book?book_name=${book_name}`)
                    .then(res => {
                        // console.log(res.data);

                        if (res.data === "deleted") {
                            fetchbooks();

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
    function Updatebook(book_id) {
        // navigate("/edit-book/" + bookid);
            // navigate(`/Updatecategories/${book_id}`);
            navigate(`/Updatebook/${book_id}`);
        }
        //add
        function addbook() {
           
                navigate(`/Booksadd`);
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
                                        <h4 class="card-title">Book List</h4>
                <button onClick={() => addbook()}  type="button" className=" align-self-end btn btn-sm iq-bg-success col-md-4 offset-md-4 mt-2 mb-2">Add</button>

                <table className={"table table-borderless table-responsive-md table-striped text-center"}>
                    <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th colSpan={2}>Controls</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        Books.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><img src={"http://localhost:3001/"+value.book_image} height="50"/></td>
                                    {/* <td>{value.book_image}</td> */}
                                    <td>{value.book_name}</td>
                                    <td>{value.category_name}</td>
                                    <td>{value.book_description}</td>
                                    <td>{value.book_author}</td>
                                    <td>{value.book_price}</td>
                                    {/* <th>book_image</th>
                        <th>book_name</th>
                        <th>book_category</th>
                        <th>book_description</th>
                        <th>book_author</th>
                        <th>book_price</th> */}
                                   
                                    <td>

                                        <FaTrashAlt onClick={() => deletebook(value.book_name)}
                                                    className={"text-danger"}/>
                                    </td>

                                    <td>
                                        <FaUserEdit className={"text-warning"}
                                                    onClick={() => Updatebook(value.book_id)}/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
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

export default Showbooks;