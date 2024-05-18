import { Link } from "react-router-dom"
import {createContext, useContext, useEffect, useState} from "react";
// import {CartContext} from "../../App";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Navbar(){
    
    let navigate=useNavigate();
    let [Categoryid, setCategoryid] = useState([]);
    let [searchInput,setSearchInput] = useState("");
    const getCategoryid = () => {
        axios.get('http://localhost:3001/fetch-category')
            .then(res3 => {
                console.log(res3.data);
                if (res3.data.length > 0) {
                    // console.log(res.data)
                    setCategoryid(res3.data);
                }
            })
    }
    
    const handleSearchInput = () => {
        navigate('/Search/'+searchInput)
    }
    useEffect(() => {
        getCategoryid();
        // handleSearchInput();
       
    }, []);
    return(
      <>
       <div className="iq-top-navbar">
                    <div className="iq-navbar-custom">
                        <nav className="navbar navbar-expand-lg navbar-light p-0">
                            <div className="iq-menu-bt d-flex align-items-center">
                                <div className="wrapper-menu">
                                    <div className="main-circle"><i className="las la-bars"></i></div>
                                </div>
                                <div className="iq-navbar-logo d-flex justify-content-between">
                                <Link className="nav-link"
                                        to="/">
                                    <a className="header-logo">
                                        <img src="images/logo.png" className="img-fluid rounded-normal" alt="" />
                                        <div className="logo-title">
                                            <span className="text-primary text-uppercase">BookTown</span>
                                        </div>
                                    </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="navbar-breadcrumb">
                                {/* <h5 className="mb-0">Shop</h5>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Home Page</li>
                                    </ul>
                                </nav> */}
                            </div>
                            <div className="iq-search-bar">
                                <form onEnter={handleSearchInput} className="searchbox">
                                    <input type="text" className="text search-input" placeholder="Search Here..." onChange={(e)=>{setSearchInput(e.target.value)}} />
                                    <a className="search-link" onClick={handleSearchInput}><i className="ri-search-line"></i></a>
                                    {/* <button type="button" onClick={handleSearchInput} className="ri-search-line align-self-end btn btn-sm iq-bg-success col-md-4 offset-md-4 mt-2"></button> */}
                                </form>
                                 {/* <div className="iq-search-bar">
                                 <form  className="searchbox">
                                                        <input className=" text search-input" onChange={(e)=>{setSearchInput(e.target.value)}} type="text" />
                                                        <button type="button" onClick={handleSearchInput} className=" btn btn-sm iq-bg-success align-self-right ri-search-line search-link"></button>
                                                        </form>
                                                    </div> */}
                            </div>
                            {/* <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-label="Toggle navigation">
                                <i className="ri-menu-3-line"></i>
                            </button> */}
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto navbar-list">
                                    <li className="nav-item nav-icon search-content">
                                        <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                                            <i className="ri-search-line"></i>
                                        </a>
                                        <form className="search-box p-0">
                                            <input type="text" className="text search-input" placeholder="Type here to search..." />
                                            <a className="search-link" href="#"><i className="ri-search-line"></i></a>
                                        </form>
                                    </li>
                                    <li className="nav-item nav-icon">
                                        <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                                            {/* <i className="ri-notification-2-line"></i>
                                            <span className="bg-primary dots"></span> */}
                                        </a>
                                        <div className="iq-sub-dropdown">
                                            <div className="iq-card shadow-none m-0">
                                                <div className="iq-card-body p-0">
                                                    {/* <div className="bg-primary p-3">
                                                        <h5 className="mb-0 text-white">All Notifications<small
                                                            className="badge  badge-light float-right pt-1">4</small></h5>
                                                    </div> */}
                                                    <a href="#" className="iq-sub-card">
                                                        <div className="media align-items-center">
                                                            {/* <div className="">
                                                                <img className="avatar-40 rounded" src="images/user/01.jpg" alt="" />
                                                            </div> */}
                                                            <div className="media-body ml-3">
                                                                {/* <h6 className="mb-0 ">Emma Watson Barry</h6>
                                                                <small className="float-right font-size-12">Just Now</small>
                                                                <p className="mb-0">95 MB</p> */}
                                                            </div>
                                                        </div>
                                                    </a>
                                                    {/* <a href="#" className="iq-sub-card">
                                                        <div className="media align-items-center">
                                                            <div className="">
                                                                <img className="avatar-40 rounded" src="images/user/02.jpg" alt="" />
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">New customer is join</h6>
                                                                <small className="float-right font-size-12">5 days ago</small>
                                                                <p className="mb-0">Cyst Barry</p>
                                                            </div>
                                                        </div>
                                                    </a> */}
                                                    {/* <a href="#" className="iq-sub-card">
                                                        <div className="media align-items-center">
                                                            <div className="">
                                                                <img className="avatar-40 rounded" src="images/user/03.jpg" alt="" />
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">Two customer is left</h6>
                                                                <small className="float-right font-size-12">2 days ago</small>
                                                                <p className="mb-0">Cyst Barry</p>
                                                            </div>
                                                        </div>
                                                    </a> */}
                                                    {/* <a href="#" className="iq-sub-card">
                                                        <div className="media align-items-center">
                                                            <div className="">
                                                                <img className="avatar-40 rounded" src="images/user/04.jpg" alt="" />
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">New Mail from Fenny</h6>
                                                                <small className="float-right font-size-12">3 days ago</small>
                                                                <p className="mb-0">Cyst Barry</p>
                                                            </div>
                                                        </div>
                                                    </a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    {/* <li className="nav-item nav-icon dropdown">
                                        <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                                            <i className="ri-mail-line"></i>
                                            <span className="bg-primary dots"></span>
                                        </a>
                                        <div className="iq-sub-dropdown">
                                            <div className="iq-card shadow-none m-0">
                                                <div className="iq-card-body p-0 ">
                                                    <div className="bg-primary p-3">
                                                        <h5 className="mb-0 text-white">All Messages<small
                                                            className="badge  badge-light float-right pt-1">5</small></h5>
                                                    </div>
                                                    <a href="#" className="iq-sub-card">
                                                        <div className="media align-items-center">
                                                            <div className="">
                                                                <img className="avatar-40 rounded" src="images/user/01.jpg" alt="" />
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">Barry Emma Watson</h6>
                                                                <small className="float-left font-size-12">13 Jun</small>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="#" className="iq-sub-card">
                                                        <div className="media align-items-center">
                                                            <div className="">
                                                                <img className="avatar-40 rounded" src="images/user/02.jpg" alt="" />
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">Lorem Ipsum Watson</h6>
                                                                <small className="float-left font-size-12">20 Apr</small>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="#" className="iq-sub-card">
                                                        <div className="media align-items-center">
                                                            <div className="">
                                                                <img className="avatar-40 rounded" src="images/user/03.jpg" alt="" />
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">Why do we use it?</h6>
                                                                <small className="float-left font-size-12">30 Jun</small>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="#" className="iq-sub-card">
                                                        <div className="media align-items-center">
                                                            <div className="">
                                                                <img className="avatar-40 rounded" src="images/user/04.jpg" alt="" />
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">Variations Passages</h6>
                                                                <small className="float-left font-size-12">12 Sep</small>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="#" className="iq-sub-card">
                                                        <div className="media align-items-center">
                                                            <div className="">
                                                                <img className="avatar-40 rounded" src="images/user/05.jpg" alt="" />
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">Lorem Ipsum generators</h6>
                                                                <small className="float-left font-size-12">5 Dec</small>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </li> */}
                                    {/* <li className="nav-item nav-icon dropdown">
                                        <a href="#" className="search-toggle iq-waves-effect text-gray rounded">
                                            <i className="ri-shopping-cart-2-line"></i>
                                            <span className="badge badge-danger count-cart rounded-circle">4</span>
                                        </a>
                                        <div className="iq-sub-dropdown">
                                            <div className="iq-card shadow-none m-0">
                                                <div className="iq-card-body p-0 toggle-cart-info">
                                                    <div className="bg-primary p-3">
                                                        <h5 className="mb-0 text-white">All Carts<small
                                                            className="badge  badge-light float-right pt-1">4</small></h5>
                                                    </div>
                                                    <a href="#" className="iq-sub-card">
                                                        <div className="media align-items-center">
                                                            <div className="">
                                                                <img className="rounded" src="images/cart/01.jpg" alt="" />
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">Night People book</h6>
                                                                <p className="mb-0">$32</p>
                                                            </div>
                                                            <div className="float-right font-size-24 text-danger"><i
                                                                className="ri-close-fill"></i></div>
                                                        </div>
                                                    </a>
                                                    <a href="#" className="iq-sub-card">
                                                        <div className="media align-items-center">
                                                            <div className="">
                                                                <img className="rounded" src="images/cart/02.jpg" alt="" />
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">The Sin Eater Book</h6>
                                                                <p className="mb-0">$40</p>
                                                            </div>
                                                            <div className="float-right font-size-24 text-danger"><i
                                                                className="ri-close-fill"></i></div>
                                                        </div>
                                                    </a>
                                                    <a href="#" className="iq-sub-card">
                                                        <div className="media align-items-center">
                                                            <div className="">
                                                                <img className="rounded" src="images/cart/03.jpg" alt="" />
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">the Orange Tree</h6>
                                                                <p className="mb-0">$30</p>
                                                            </div>
                                                            <div className="float-right font-size-24 text-danger"><i
                                                                className="ri-close-fill"></i></div>
                                                        </div>
                                                    </a>
                                                    <a href="#" className="iq-sub-card">
                                                        <div className="media align-items-center">
                                                            <div className="">
                                                                <img className="rounded" src="images/cart/04.jpg" alt="" />
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">Harsh Reality book</h6>
                                                                <p className="mb-0">$25</p>
                                                            </div>
                                                            <div className="float-right font-size-24 text-danger"><i
                                                                className="ri-close-fill"></i></div>
                                                        </div>
                                                    </a>
                                                    <div className="d-flex align-items-center text-center p-3">
                                                        <a className="btn btn-primary mr-2 iq-sign-btn" href="#" role="button">View
                                                            Cart</a>
                                                        <a className="btn btn-primary iq-sign-btn" href="#" role="button">Shop
                                                            now</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li> */}
                                    {/* <li className="line-height pt-3">
                                        <a href="#" className="search-toggle iq-waves-effect d-flex align-items-center">
                                            <img src="images/user/1.jpg" className="img-fluid rounded-circle mr-3" alt="user" />
                                            <div className="caption">
                                                <h6 className="mb-1 line-height">Barry Tech</h6>
                                                <p className="mb-0 text-primary">$20.32</p>
                                            </div>
                                        </a>
                                        <div className="iq-sub-dropdown iq-user-dropdown">
                                            <div className="iq-card shadow-none m-0">
                                                <div className="iq-card-body p-0 ">
                                                    <div className="bg-primary p-3">
                                                        <h5 className="mb-0 text-white line-height">Hello Barry Tech</h5>
                                                        <span className="text-white font-size-12">Available</span>
                                                    </div>
                                                    <a href="profile.html" className="iq-sub-card iq-bg-primary-hover">
                                                        <div className="media align-items-center">
                                                            <div className="rounded iq-card-icon iq-bg-primary">
                                                                <i className="ri-file-user-line"></i>
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">My Profile</h6>
                                                                <p className="mb-0 font-size-12">View personal profile details.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="profile-edit.html" className="iq-sub-card iq-bg-primary-hover">
                                                        <div className="media align-items-center">
                                                            <div className="rounded iq-card-icon iq-bg-primary">
                                                                <i className="ri-profile-line"></i>
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">Edit Profile</h6>
                                                                <p className="mb-0 font-size-12">Modify your personal details.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="account-setting.html" className="iq-sub-card iq-bg-primary-hover">
                                                        <div className="media align-items-center">
                                                            <div className="rounded iq-card-icon iq-bg-primary">
                                                                <i className="ri-account-box-line"></i>
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">Account settings</h6>
                                                                <p className="mb-0 font-size-12">Manage your account parameters.</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="privacy-setting.html" className="iq-sub-card iq-bg-primary-hover">
                                                        <div className="media align-items-center">
                                                            <div className="rounded iq-card-icon iq-bg-primary">
                                                                <i className="ri-lock-line"></i>
                                                            </div>
                                                            <div className="media-body ml-3">
                                                                <h6 className="mb-0 ">Privacy Settings</h6>
                                                                <p className="mb-0 font-size-12">Control your privacy parameters.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <div className="d-inline-block w-100 text-center p-3">
                                                        <a className="bg-primary iq-sign-btn" href="sign-in.html" role="button">Sign
                                                            out<i className="ri-login-box-line ml-2"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li> */}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
      </>
    )

}
export default Navbar