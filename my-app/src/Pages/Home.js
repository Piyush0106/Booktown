import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import Adminsidebar from "./Components/Adminsidebar"

// import Public from "./Components/Publicsidebar";
import Publicsidebar from "./Components/Publicsidebar";

import axios from "axios";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Components/Navbar"
// import Publicsidebar from "./Components/Publicsidebar";
// import Footer from "./Components/Footer";
// import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
// import { FcFullTrash } from "react-icons/fc";
// import Updatebook from "./Updatecategories";

// import Swal from "sweetalert2";
// import Categories from "./Categories";
import Cards from "./Components/Cards";

let Home = () => {
    // let navigate = useNavigate();

    let [Books, setBooks] = useState([]);

    function fetchbooks() {
        axios.get("http://localhost:3001/get-book")
            .then(res => {
                // console.log(res.data);

                if (res.data.length > 0) {
                    setBooks(res.data);
                }

            })
    }

    useEffect(() => {
        fetchbooks();
    }, []);
    return (
        <>
            <div className='wrapper'>

                {/* Sidebar */}
                <Publicsidebar />


                {/* Navbar */}
                <Navbar />


                <div id="content-page" className="content-page">
                    <div className="container-fluid">
                        <div className="row">
                            {/*  Upper*/}
                            <div className="col-lg-12">
                                <div className="iq-card">
                                    <div className="iq-card-body">
                                    {/* <h3 className="card-title align-self-centre"> Exclusive in store </h3> */}
                                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                            <ol className="carousel-indicators">
                                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                                            </ol>
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img src="assets/images/small/B1.png" className="d-block w-100" alt="#" />
                                                </div>
                                                <div className="carousel-item">
                                                    <img src="assets/images/small/B2.png" className="d-block w-100" alt="#" />
                                                </div>
                                                <div className="carousel-item">
                                                    <img src="assets/images/small/B3.png" className="d-block w-100" alt="#" />
                                                </div>
                                                <div className="carousel-item">
                                                    <img src="assets/images/small/B4.png" className="d-block w-100" alt="#" />
                                                </div>
                                                <div className="carousel-item">
                                                    <img src="assets/images/small/B5.png" className="d-block w-100" alt="#" />
                                                </div>
                                            </div>
                                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-12">
                                <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height rounded">
                                <h4 className="card-title justify-content-between"> Coming Soon </h4>
                                    <div className="iq-card-body">
                                    <div className="newrealease-contens">
                                        <ul id="newrealease-slider" className="list-inline p-0 m-0 d-flex align-items-center">
                                            <li className="item">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/marvel/m1.png" className="img-fluid w-100 rounded"
                                                        alt="" />
                                                </a>
                                            </li>
                                            <li className="item">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/marvel/m2.png" className="img-fluid w-100 rounded"
                                                        alt="" />
                                                </a>
                                            </li>
                                            <li className="item">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/marvel/m3.png" className="img-fluid w-100 rounded"
                                                        alt="" />
                                                </a>
                                            </li>
                                            <li className="item">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/marvel/m4.png" className="img-fluid w-100 rounded"
                                                        alt="" />
                                                </a>
                                            </li>
                                            <li className="item">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/marvel/m5.png" className="img-fluid w-100 rounded"
                                                        alt="" />
                                                </a>
                                            </li>
                                            <li className="item">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/marvel/m6.png" className="img-fluid w-100 rounded"
                                                        alt="" />
                                                </a>
                                            </li>
                                            <li className="item">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/marvel/m7.png" className="img-fluid w-100 rounded"
                                                        alt="" />
                                                </a>
                                            </li>
                                            <li className="item">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/marvel/m8.png" className="img-fluid w-100 rounded"
                                                        alt="" />
                                                </a>
                                            </li>
                                            <li className="item">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/marvel/m9.png" className="img-fluid w-100 rounded"
                                                        alt="" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                </div>


                            </div>



                            {/*Lower  */}
                            <div class="col-lg-12">
                                <div class="iq-card iq-card-block iq-card-stretch iq-card-height">
                                    <div className="iq-card-body">
                                        <h4 className="card-title justify-content-between">In Store </h4>
                                        <div className="row">

                                            {
                                                Books.length > 0 &&
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
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer */}
            <Footer />
        </>
    )
}

export default Home