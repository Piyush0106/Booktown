import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import Adminsidebar from "./Components/Adminsidebar"
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import Public from "./Components/Publicsidebar";
// import Publicsidebar from "./Components/Publicsidebar";


function Admin_home() {
    let [orderdetails, setOrderdetails] = useState([]);
    let navigate = useNavigate();

    function FetchOrderdetails() {
        axios.get("http://localhost:3001/fetch-order-details-admin")
            .then(res => {
                console.log(res.data);
                setOrderdetails(res.data);
                if(res.data==="no data"){
                    navigate("/Admin_empty")
                }
              
            })
    }
     
    function changeStatus(order_id, status) {
        axios.get("http://localhost:3001/changeOrderStatus?order_id=" + order_id + "&status=" + status)
            .then(res => {
                // console.log(res.data);
                FetchOrderdetails();
            })
    }

    useEffect(() => {
        FetchOrderdetails();
    }, []);
    return (
        <>
            {/* <div className='wrapper'> */}

            {/* Sidebar */}
            {/* <Publicsidebar/> */}
            <Adminsidebar />


            {/* Navbar */}
            <Navbar />

            {/* <div className="content-page" id="content-page" > */}

            <div className="content-page" id="content-page" >
                <div class="container-fluid">
                    <div class="row">
                    <div className="col-lg-12">
                            <div className="iq-card">
                                <div className="iq-card-body">
                                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src="assets/images/small/AD.png" className="d-block w-100" alt="#" />
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
                                        <h4 class="card-title">Orders</h4>
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
                                                    <th>Status </th>
                                                    {/* <th >Controls</th> */}
                                                </tr>
                                            </thead>

                                            <tbody>{

                                                orderdetails.length === 0 ? orderdetails.length :
                                                    orderdetails.length > 0 ?
                                                        orderdetails.map((value, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{value.date.replace("T", " ").replace(".000Z", " ").replace("18:30:00", " ")}</td>
                                                                    <td>{value.order_id}</td>

                                                                    <td>{value.billing_address}</td>
                                                                    <td>{value.payment_method}</td>
                                                                    <td>{value.total_amount}</td>
                                                                    {/* <td>{value.order_status}</td> */}

                                                                    <td>
                                                                        {
                                                                            value.order_status === "Rejected" ? <span
                                                                                className="badge bg-danger">{value.order_status}</span> : value.order_status === 'Approved' ? <span
                                                                                    className="badge bg-success">{value.order_status}</span> : <span
                                                                                        className="badge bg-info">{value.order_status}</span>
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            value.order_status === 'pending' ?
                                                                                <>
                                                                                    <button
                                                                                        className={"btn btn-sm btn-danger mr-3"}
                                                                                        //  style={{ borderRadius: "3px" }}
                                                                                        onClick={(e) => changeStatus(value.order_id, 'Rejected')}>Reject
                                                                                    </button>
                                                                                    {/* &nbsp; */}
                                                                                    <td>
                                                                                    <button
                                                                                        className={"btn btn-sm btn-success mr-3"}
                                                                                        
                                                                                        //  style={{ borderRadius: "3px" }}
                                                                                        onClick={(e) => changeStatus(value.order_id, 'Approved')}>Approve
                                                                                    </button>
                                                                                    </td>
                                                                                </>
                                                                                : ""
                                                                        }

                                                                    </td>
                                                                </tr>
                                                            )
                                                        }): ""
                                                    
                                            
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
            {/* </div> */}
            {/* </div> */}

            {/* Footer */}
            <Footer />
        </>
    )
}

export default Admin_home