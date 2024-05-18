import axios from "axios";
import { useState,useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Components/Footer";
import { CartContext } from "../App";
import Swal from "sweetalert2";
import Publicsidebar from "./Components/Publicsidebar";
import Navbar from "./Components/Navbar";
function Book_details(props){
   let {book_id} = useParams();
    let [book,setBook]=useState([]);
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
    function GetDetails(book_id) {
       console.log(book_id);
        axios.get(`http://localhost:3001/getbookbyid?book_id=${book_id}`)
            .then(res => {
                
                console.log(res.data);
                setBook(res.data);
                console.log(book);

            })
    }

    useEffect(() => {
        GetDetails(book_id);
        console.log(book_id);
    }, [])
    return(
        <>
        <Publicsidebar/>
        <Navbar/>
        {
           book.map((value) => {
              return(
                 <>
                             <div className="content-page" id="content-page" >
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="iq-card">
                                
                                <div class="iq-card-header d-flex justify-content-between align-items-center">
                           <h4 class="card-title mb-0">Books Description</h4>
                        </div>
                     
                                {/* <h1>Book Details</h1> */}
        
                <div className="iq-card-body pb-0">
                <div className="description-contens align-items-top row">
                   <div className="col-md-6">
                      <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                         <div className="iq-card-body p-0">
                            <div className="row align-items-center">
                               <div className="col-9">
                                  <ul id="description-slider" className="list-inline p-0 m-0  d-flex align-items-center">
                                     <li>
                                        <a href="javascript:void(0);">
                                        <img src={"http://localhost:3001/"+value.book_image} className="img-fluid w-100 rounded" alt=""/>
                                        </a>
                                     </li>
                                  </ul>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="col-md-6">
                      <div className="iq-card-transparent iq-card-block iq-card-stretch iq-card-height">
                         <div className="iq-card-body p-0">
                            <h3 className="mb-3" >{value.book_name}</h3>
                            <div className="price d-flex align-items-center font-weight-500 mb-2">
                               {/* <span className="font-size-20 pr-2 old-price">$99</span> */}
                               <span className="font-size-24 text-dark" >{"₹"+value.book_price}</span>
                            </div>
                            <div className="mb-3 d-block">
                               <span className="font-size-20 text-warning">
                               <i className="fa fa-star mr-1"></i>
                               <i className="fa fa-star mr-1"></i>
                               <i className="fa fa-star mr-1"></i>
                               <i className="fa fa-star mr-1"></i>
                               <i className="fa fa-star"></i>
                               </span>
                            </div>
                            <span className="text-dark mb-4 pb-4 iq-border-bottom d-block" >{value.book_description}</span>
                            {/* <div className="text-primary mb-4">Category: <span className="text-body" >{value.category_name}</span></div> */}
                            <div className="text-primary mb-4">Author: <span className="text-body" >{value.book_author}</span></div>
                            <div className="mb-4 d-flex align-items-center">                                       
                               <a onClick={() => { addtocart(value.book_id) }} className="btn btn-primary view-more mr-2">Add To Cart</a>
                               {/* <a href="book-pdf.html" className="btn btn-primary view-more mr-2">Read Sample</a> */}
                            </div>
                            {/* <div className="mb-3">
                               <a href="#" className="text-body text-center"><span className="avatar-30 rounded-circle bg-primary d-inline-block mr-2"><i className="ri-heart-fill"></i></span><span>Add to Wishlist</span></a>
                            </div> */}
                            {/* <div className="iq-social d-flex align-items-center">
                               <h5 className="mr-2">Share:</h5>
                               <ul className="list-inline d-flex p-0 mb-0 align-items-center">
                                  <li>
                                     <a href="#" className="avatar-40 rounded-circle bg-primary mr-2 facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                  </li>
                                  <li>
                                     <a href="#" className="avatar-40 rounded-circle bg-primary mr-2 twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                  </li>
                                  <li>
                                     <a href="#" className="avatar-40 rounded-circle bg-primary mr-2 youtube"><i className="fa fa-youtube-play" aria-hidden="true"></i></a>
                                  </li>
                                  <li >
                                     <a href="#" className="avatar-40 rounded-circle bg-primary pinterest"><i className="fa fa-pinterest-p" aria-hidden="true"></i></a>
                                  </li>
                               </ul>
                            </div> */}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             </div>
                </div>
             </div>
             </div>
             </div>
            
               
            <Footer/>

             </>
              )
           })
        }
        
        </>
        
    )
}
export default Book_details