import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar"
import Publicsidebar from "./Components/Publicsidebar";
import Footer from "./Components/Footer";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { FcFullTrash } from "react-icons/fc";
import Updatebook from "./Updatecategories";

import Swal from "sweetalert2";
import Categories from "./Categories";
import Cards from "./Components/Cards";

function Public_books() {
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


    return (
        <>
            <Publicsidebar />


            <Navbar />

            <div className="content-page" id="content-page">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg-12">
                            <div class="iq-card">
                                <div className="iq-card-body">
                                    <h4 className="card-title">Books</h4>
                                    <div className="row">
                                        {/* <div className="col-sm-6 col-md-4 col-lg-3"> */}
                                        {/* <div className="iq-card iq-card-block iq-card-stretch iq-card-height search-bookcontent"> */}
                                        {/* <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <div className="iq-header-title"> */}

                                        {/* <div className="iq-card-body pb-0"> */}


                                        {
                                            Books.map((value, index) => {
                                                return (
                                                    <Cards
                                                        book_id={value.book_id}
                                                        book_image={value.book_image}
                                                        book_name={value.book_name}
                                                        book_category={value.category_name}
                                                        book_author={value.book_author}
                                                        book_price={value.book_price}
                                                    />
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}

            <Footer />
        </>
    );
}

export default Public_books;