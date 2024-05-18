import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Usersidebar from "./Components/Usersidebar";
import { CartContext } from "../App";
// import {useEffect, useContext, useState} from "react";
// import {Link} from "react-router-dom";
// import {CartContext} from "../CartContext";
// import axios from "axios";
function Cart() {
    // let GrandTotal = 0;
    let [Abc, setAbc] = useState([]);
    let [cartproduct, setCartproduct] = useState([]);
    // let [updatequantity, setUpdatequantity] = useState([]);
    let [totalprice, setTotalprice] = useState(0);
    let { cartcount, setCartcount } = useContext(CartContext);
    let [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    let [newQty,setNewQty] = useState(0);

    let plusDisabled = false;
    let minusDisabled = false;

    // let totalPrice = 0;
    let navigate = useNavigate();
    function GetcartProducts() {
        axios.get('http://localhost:3001/get-cart-products')
            .then(res => {
                console.log(res.data);
                setAbc(res.data.cart);
                setCartproduct(res.data.cart);
                // setTotalprice(res.data.total);
               
            })
    }
     if(Abc.length==0 && 'no data'){
                    navigate("/Empty")
                }
    const updateQuantity=(book_id, action)=> {

        // axios.get("http://localhost:3001/add-to-cart?book_id=" + book_id + "&action=" + action)
        axios.get(`http://localhost:3001/add-to-cart?book_id=${book_id}&action=${action}`)
            .then(res => {
                // console.log(res.data);
                // GetcartProducts()
                console.log( typeof res.data.qty);
                GetcartProducts();
               setNewQty(res.data.qty);
                setTotalprice(res.data.total);

                plusDisabled = res.data === 'disableplus'
                minusDisabled = res.data === 'disableminus'

                console.log(plusDisabled);
               

            })
    }

    function RemoveItem(book_id) {

        console.log(book_id);
        axios.get(`http://localhost:3001/remove-cart-product?book_id=${book_id}`)
            .then(res => {
                if (res.data === "removed") {
                    Swal.fire({
                        title: 'Item Removed',

                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    })
                }
                console.log(res.data);
                setCartcount(cartcount - 1);
                GetcartProducts();

            });
    }
    function checkUserLogin() {
        axios.get('http://localhost:3001/checkout')
            .then(res => {
                console.log(res.data + ' ---');
                if (res.data === 'failed') {
                    setIsUserLoggedIn(false);
                    // loggedIn = false;
                } else {
                    setIsUserLoggedIn(true);
                    // loggedIn = true;
                }
            })
    }
    // let getQty = (book_id) => {


    //     return cartproduct.item[book_id];
    // }
    // INCREMENT
    //  let incrementQty = (book_id) => {
    //     let existingQty = cartproduct.item[book_id];

    //     if (existingQty < 5) {
    //         let cart = {cartproduct};
    //         cart.item[book_id] = existingQty + 1;
    //         cart.totalItems += 1;

    //         setCartcount(cart);
    //     }
    // }

    // DECREMENT
    // let decrementQty = (book_id) => {
    //     let existingQty = cartproduct.item[book_id];

    //     if (existingQty > 1) {
    //         let cart = {cartproduct};
    //         cart.item[book_id] = existingQty - 1;
    //         cart.totalItems -= 1;

    //         setCartcount(cart);
    //     }
    // }

    // TOTAL
    // let getTotal = (book_id, book_price) => {


    //     GrandTotal += (book_price * getQty(book_id));

    //     return book_price * getQty(book_id);
    // }
   


    useEffect(() => {
        GetcartProducts();
        checkUserLogin();
    }, [])
    function checkout() {
        console.log('checkout called');
        axios.get('http://localhost:3001/checkout')
            .then(res => {
                console.log(res.data + ' ---');
                if (res.data === 'failed') {
                    navigate('/user-login');
                } else {
                    navigate('/checkout');
                }
            })
    }

    // function Checkout() {
    //     console.log('checkout called');
    //     axios.get('http://localhost:3001/checkout')
    //         .then(res => {
    //             console.log(res.data);
    //             if (res.data === 'failed') {
    //                 navigate('/user-login');
    //             } else {
    //                 navigate('/checkout');
    //             }
    //         })
    // }



    //************************ */
    //    Swal.fire({
    //        title: 'Are you sure to Delete?',
    //        text: "You won't be able to revert this!",
    //        icon: 'warning',
    //        showCancelButton: true,
    //        confirmButtonColor: '#3085d6',
    //        cancelButtonColor: '#d33',
    //        confirmButtonText: 'Yes, delete it!'
    //    }).then((result) => {
    //        if (result.isConfirmed) {
    //            axios.get(`http://localhost:3001/delete-cart-item?book_name=${book_name}`)
    //                .then(res => {
    //                    // console.log(res.data);

    //                    if (res.data === "deleted") {
    //                        fetchcartitems
    //            ();

    //                        Swal.fire(
    //                            'Deleted!',
    //                            'Your file has been deleted.',
    //                            'success'
    //                        )
    //                    }
    //                });
    //        }
    //    })


    //    }
    return (
        <>
            <Usersidebar />
            <Navbar />
            <div className="content-page" id="content-page" >
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="iq-card">
                                <div class="iq-card-header d-flex justify-content-between">
                                    <div class="iq-header-title">
                                        <h4 class="card-title">Cart</h4>
                                       
                                        <table className={"table table-borderless table-responsive-md table-striped text-center"}>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Author</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>TotalPrice</th>
                                                    {/* <th colSpan={2}>Controls</th> */}
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    Abc.map((value, index) => {
                                                            // let plusDisabled = "";
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td><img src={"http://localhost:3001/" + value.book_image} height="50" /></td>
                                                               
                                                                <td>{value.book_name}</td>
                                                               
                                                                <td>{value.book_author}</td>
                                                                <td>{"₹" + value.book_price} </td>
                                                                <td>

                                                                    <button disabled={minusDisabled} id="btnMinus" data-icon="k" className="icon btn btn-primary btn-sm" 
                                                                    onClick={() => updateQuantity(value.book_id, 'minus')}> </button>

                                                                    <span id="lblQty" className="mx-3">{value.quantity}</span>
                                                                    
                                                                
                                                                    <button disabled={plusDisabled} id="btnPlus" data-icon="n" className="icon btn btn-primary btn-sm" 
                                                                    onClick={() => updateQuantity(value.book_id, 'plus')}></button>
                                                                </td>
                                                                <td> {"₹"+value.totalprice} </td>
                                                            
                                                                <td>
                                                                    {/* <button> */}

                                                                    <FaTrashAlt onClick={() => RemoveItem(value.book_id)}
                                                                        className={"text-danger"} />
                                                                    {/* </button> */}
                                                                </td>

                                                              
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>

                                        <button onClick={() => checkout()} type="button" className=" align-self-end btn btn-dark col-md-4 offset-md-4 mt-2">Checkout</button>
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
export default Cart