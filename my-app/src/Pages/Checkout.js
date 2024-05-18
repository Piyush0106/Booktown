
import axios from "axios";
import { useContext, useState } from "react";
// import {CartContext} from "../App";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Usersidebar from "./Components/Usersidebar";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar"

function Checkout() {
    let navigate = useNavigate();
    let [cartproduct, setCartproduct] = useState([]);
    let [totalprice, setTotalprice] = useState(0);
    let [email, setEmail] = useState('');
    // let {cartcount, setCartcount} = useContext(CartContext);

    function GetcartProducts() {
        axios.get('http://localhost:3001/get-cart-products')
            .then(res => {
                console.log(res.data);
                setCartproduct(res.data.cart);
                setTotalprice(res.data.total);
                setEmail(res.data.user_email);
            })
    }

    useEffect(() => {
        GetcartProducts();
    }, [])

    function PlaceOrder() {
        navigate('/Placeorder/' + totalprice);
    }
    return (
        <>
            <Usersidebar />
            <Navbar />


            {/* <section className="ptb-95 mobile-padding"> */}
            {/* <div className="container"> */}
            <div className="content-page" id="content-page" >
                <div class="container-fluid">
                    <div className="row">
                    <div className="col-sm-6">
                        <div class="iq-card">
                            <div class="iq-card-header d-flex justify-content-between">
                                <div class="iq-header-title">
                                    <h4 class="card-title">Checkout</h4>
                                    <table className="table table-borderless table-responsive-md table-striped text-center">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Product Name</th>
                                                <th>Price</th>
                                                {/* <th>Discount(in%)</th> */}
                                                {/*<th>Quantity</th>*/}
                                                {/*<th>Sub Total</th>*/}
                                                <th>Quantity</th>
                                                {/* <th>Net Price</th> */}

                                                <th>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartproduct.map((value, index) => {
                                                    return (
                                                        <tr>
                                                            <td><a href="product-page.html">
                                                                <div className="product-image"><img alt="Tizzy"
                                                                    src={"http://localhost:3001/" + value.book_image} height="50" />
                                                                </div>
                                                            </a></td>
                                                            <td>
                                                                <div className="product-title"><a
                                                                    href="product-page.html">{value.book_name}</a>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span>{"₹" + value.book_price} </span>

                                                            </td>
                                                            <td>

                                                                <span className="mx-3">{value.quantity}</span>

                                                            </td>
                                                            {/* <td>

                                                            </td> */}
                                                            <td>
                                                                <div className="total-price price-box"><span
                                                                    className="price">{"₹" + value.totalprice}</span></div>
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
                        <div className="col-sm-6">
                     <div className="iq-card">
                        <div className="iq-card-body">
                                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                          
                                            <div className="carousel-item active">
                                                <img src="assets/images/small/MC.png" className="d-block w-100" />
                                            </div>
                                            
                                        </div>
                            </div>
                        </div>
                     </div>
                  </div>
                    </div>
                    <div className="mtb-30">

                        <div className="col-sm-6">
                            <div className="cart-total-table commun-table">
                                <div className="table-responsive">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td><b>Amount Payable</b></td>
                                                <td>
                                                    <div className="price-box"><span
                                                        className="price"><b>{"₹" + totalprice}</b></span></div>
                                                </td>
                                                <td>
                                                    <div className="col-sm-12">
                                                        <div className="input-box mb-20">
                                                            <button className={"btn btn-primary mt-5"} onClick={() => {
                                                                PlaceOrder()
                                                            }}>Place Order
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>


            {/* </section> */}

            <Footer />
        </>
    )
}
export default Checkout;