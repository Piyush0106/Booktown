import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import Usersidebar from "./Components/Usersidebar"
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function User_home() {
    // let [Abc, setAbc] = useState([]);
    let [orderdetails, setOrderdetails] = useState([]);
    let navigate = useNavigate();
    // console.log(orderdetails.length)


    function FetchOrderdetails() {
        axios.get("http://localhost:3001/fetch-order-details")
            .then(res => {
                console.log(res.data);
                setOrderdetails(res.data);
                if (res.data === "no data") {
                    navigate("/User_empty")
                }

            })


    }




    useEffect(() => {
        FetchOrderdetails();
    }, []);

    return (
        <>

            <Usersidebar />



            <Navbar />




            <div className="content-page" id="content-page" >
                <div class="container-fluid">
                    <div class="row">
                        <div className="col-lg-12">
                            <div className="iq-card">
                                <div className="iq-card-body">
                                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src="assets/images/small/UD.png" className="d-block w-100" alt="#" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="iq-card">
                                <div class="iq-card-header d-flex justify-content-between">
                                    <div class="iq-header-title">
                                        <h4 class="card-title">Your Orders</h4>
                                        <table className={"table table-borderless table-responsive-md table-striped text-center"}>
                                            <thead>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th>Date of Order</th>
                                                    <th>Order ID</th>

                                                    {/* <th>Mobile No</th> */}
                                                    <th>Billing Address</th>
                                                    <th>Payment Method</th>
                                                    <th>Total Amount</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    orderdetails.map((value, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{value.date.replace("T", " ").replace(".000Z", " ").replace("18:30:00", " ")}</td>
                                                                <td>{value.order_id}</td>

                                                                {/* <td>{value.mobileno}</td> */}
                                                                <td>{value.billing_address}</td>
                                                                <td>{value.payment_method}</td>
                                                                <td>{value.total_amount}</td>
                                                                <td>{value.order_status}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        {/* <button onClick={() => addcategory()}  type="button" className=" align-self-end btn btn-sm iq-bg-success col-md-4 offset-md-4 mt-2">Add</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default User_home