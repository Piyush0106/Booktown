import axios from "axios";
// import React from "react";
import { useContext } from "react";
import Swal from "sweetalert2"
import { CartContext } from "../../App";
// const CartContext = React.createContext();
import { useNavigate } from "react-router-dom";
function Cards(props) {
    // console.log(props);
    let navigate = useNavigate();

    let { setCartcount, UpdateCount } = useContext(CartContext);

    function addtocart(book_id) {
        // console.log('clicked');
        // console.log(product_id);
        axios.get(`http://localhost:3001/add-to-cart?book_id=${book_id}`)
            .then(res => {
              
                    Swal.fire({
                        title: 'Item Added to Cart',
            
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'})
                console.log(res.data);
                // UpdateCount();
                setCartcount(res.data.length)
            //     else{
            //         if(res.data==="logintouser"){
            //         navigate('/Userlogin')
            //     }
            // }
            })
    }

    //************************************** */

    // VIEW**********************************

    function View (book_id) {

            navigate(`/Book_details/${book_id}`);
        }

    //**************************************** */
    return (

       
        <div className="col-sm-6 col-md-4 col-lg-3">

            <div className="iq-card iq-card-block iq-card-stretch iq-card-height search-bookcontent">

                <div className="iq-card-transparent mb-0">
                    {/* <div class="iq-card-transparent mb-0"> */}
                    <div className="iq-card-body p-0">

                        <div className="d-flex align-items-center">
                            <div className="col-6 p-0 position-relative image-overlap-shadow">
                                <a href=""><img className="img-fluid rounded w-100" src={"http://localhost:3001/" + props.book_image} alt="" /></a>

                                <div className="view-book">
                                    <a className="btn btn-sm btn-white"
                                     onClick={() => View(props.book_id)}
                                    >View Book</a>
                                </div>

                            </div>
                            <div className="col-6">
                                <div className="mb-2">
                                    <h6 className="mb-1">{props.book_name}</h6>
                                    <p className="font-size-13 line-height mb-1">{props.book_author}</p>
                                    <div className="d-block">
                                        <span className="font-size-13 text-warning">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </span>
                                    </div>
                                    <p className="font-size-13 line-height mb-1">{props.book_category}</p>
                                </div>
                                <div className="price d-flex align-items-center">
                                    {/* <span className="pr-1 old-price">$99</span> */}
                                    <h6><b> {"₹" + props.book_price}</b></h6>
                                </div>
                                <div className="iq-product-action">
                                    <a onClick={() => { addtocart(props.book_id) }}
                                    >
                                        <i className="ri-shopping-cart-2-fill text-primary" ></i>
                                    </a>
                                    {/* <a href="javascript:void();" className="ml-2"><i className="ri-heart-fill text-danger"></i></a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cards