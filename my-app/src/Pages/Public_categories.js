import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Publicsidebar from "./Components/Publicsidebar";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
function Public_categories() {
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
    return (
        <>
            <Publicsidebar />


            <Navbar />

            <div className="content-page" id="content-page" >
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="iq-card">
                                <div class="iq-card-header d-flex justify-content-between">
                                    <div class="iq-header-title">
                                        <h4 class="card-title">Category Lists</h4>
                                    
                                    <table className={"table table-bordered table-lg"}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>category_name</th>
                                                <th>description</th>
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


                <Footer />
            </>
            );
}
            export default Public_categories