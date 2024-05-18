// import UserNavbar from "./UserNavbar";
// import Footer from "./Component/Footer";
import load from "load-script";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import useRazorpay from "react-razorpay";
import Swal from "sweetalert2";
import Usersidebar from "./Components/Usersidebar";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

function Placeorder() {
    const Razorpay = useRazorpay();
    const navigate = useNavigate()

    let options = {
        key: "rzp_test_A3RM3Asww6uWvF",
        currency: 'INR',
        amount: 0,
        name: "Payment Testing",
        description: "Test Wallet Transaction",
        image: "https://i.pinimg.com/originals/c1/92/9d/c1929d3492c2f64ab65b43808c072043.jpg",
        handler: razorpayHandler,
        prefill: {
            name: "",
            email: "",
            // email: "user@yahoo.in",
            // contact: "1234567890",
            contact: "",
        },
        theme: {
            "color": "#3399cc"
        }
    };

    // function razorpayHandler(response) {
    //     console.log(response);
    // }

    function razorpayHandler(response) {
        console.log(response);
        let payment_id = response.razorpay_payment_id;

        if (payment_id !== '') {
            console.log('Razorpay -- -- Payment Done', payment_id);
            PlaceOrder();
            // PlaceOrder(payment_id);
        } else {
            alert('Payment Failed. Try again...');
        }
    }

    load('../../js/script.js', function (err, script) {
        if (err) {
            // print useful message
        } else {
            console.log(script.src);// Prints 'foo'.js'
            // use script
            // note that in IE8 and below loading error wouldn't be reported
        }
    });
    let {totalprice} = useParams();
    let [name, setName] = useState('');
    let [mobile, setMobile] = useState('');
    let [pincode, setpincode] = useState('');
    let [address, setAddress] = useState('');
    let [payment_method, setPayment_method] = useState('');

    // let [total_amount, setTotal_amount] = useState('');

    function GetUserDetails() {
        axios.get(`http://localhost:3001/getuserbyemail`)
            .then(res => {
                console.log(res.data);
                let data = res.data;
                setName(data[0].fullname);
                setAddress(data[0].address);
                setMobile(data[0].mobile_number);
                setpincode(data[0].pincode);
            })
    }

    useEffect(() => {
        GetUserDetails();
    }, [])

    function handleForm(event) {
        event.preventDefault();

        if (payment_method === 'Online') {
            options.amount = totalprice * 100;
            // options.amount = totalprice;

            let rzp = new Razorpay(options);
            rzp.open(); // Display Razorpay
        } else {
            PlaceOrder();
        }
    }

    const PlaceOrder = () => {
        console.log(`${name} ${mobile} ${address} ${payment_method} ${totalprice}`);
        let formData = new FormData();
        // formData.append('email', email);
        formData.append('name', name);
        formData.append('mobile', mobile);
        formData.append('address', address);
        formData.append('pincode', pincode);
        formData.append('payment_method', payment_method);
        formData.append('total_price', totalprice);
        axios.post('http://localhost:3001/place-order', formData)
            .then(res => {
                console.log(res.data);
                if (res.data === "success") {
                    Swal.fire('Order Placed');
                }
                navigate('/User_home')
            })
    }
    return (
        <>
         <Usersidebar/>
         <Navbar/>
         <div id="content-page" className="content-page">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-sm-6">
                     <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                           <div className="iq-header-title">
                              <h4 className="card-title">Place Order</h4>
                           </div>
                        </div>
                        <div className="iq-card-body">
                           <form   id={"Placeorder"} onSubmit={(event) => handleForm(event)}>
                              <div className="form-group">
                                 <label>Name:</label>
                                 <input defaultValue={name} onChange={(e) => setName(e.target.value)} required={true}  type="text" className="form-control"/>
                              </div>
                              <div className="form-group">
                                 <label>Mobile</label>
                                 <input defaultValue={mobile} onChange={(e) => setMobile(e.target.value)} required={true}  type="text" className="form-control"/>
                              </div>
                              <div className="form-group">
                                 <label>Address</label>
                                 <input defaultValue={address} onChange={(e) => setAddress(e.target.value)} required={true} className="form-control" rows="4"></input>
                              </div>
                              <div className="form-group">
                                 <label>Pin</label>
                                 <input defaultValue={pincode} onChange={(e) => setpincode(e.target.value)} required={true}  type="number" className="form-control"/>
                              </div>
                              <div className="form-group">
                                 <label>Total Price</label>
                                 <input defaultValue={totalprice}  required={true}  type="number" className="form-control"/>
                              </div>
                              <div className="form-group">
                                 <label>Payment Method</label>
                                 <select
                                                    onChange={(e) => setPayment_method(e.target.value)}
                                                    name={'payment_method'}
                                                    id={'payment_method'}
                                                    required={true}>
                                                    <option value={''}>Select Method</option>
                                                    <option value={'COD'}>Cash On Delivery</option>
                                                    <option value={'Online'}>Online</option>
                                                </select>
                                 {/* <input value={pincode} onChange={(e) => setpincode(e.target.value)} required={true}  type="number" className="form-control"/> */}
                              </div>
                              <button type="submit"  id="submitbtn" className="btn btn-primary">Submit</button>
                           </form>
                        </div>
                     </div>
                  </div>

                  <div className="col-sm-6">
                     <div className="iq-card">
                        <div className="iq-card-body">
                        <div className="iq-card text-white bg-primary iq-mb-3" >
                        <div className="iq-card-body">
                           {/* <h4 className="card-title text-white">Primary card title</h4> */}
                           <blockquote className="blockquote mb-0">
                              <p className="font-size-14">′Classic′ – a book which people praise and don’t read..</p>
                              <footer className="blockquote-footer text-white font-size-12">Mark Twain <cite title="Source Title" class="text-white" ></cite></footer>
                           </blockquote>
                        </div>
                     </div>
                         
                        </div>
                        <div className="iq-card-body">
                        <div className="iq-card iq-mb-3 text-white bg-secondary" >
                        <div className="iq-card-body">
                           {/* <h4 className="card-title text-white">Secondary card title</h4> */}
                           <blockquote className="blockquote mb-0">
                              <p className="font-size-14">Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.</p>
                              <footer className="blockquote-footer text-white font-size-12">Charles W. Eliot <cite title="Source Title" class="text-white" ></cite></footer>
                           </blockquote>
                        </div>
                    
                        </div>
                         </div>
                         <div className="iq-card-body">
                        <div className="card iq-mb-3 text-white bg-warning" >
                        <div className="iq-card-body">
                           {/* <h4 className="card-title text-white">Secondary card title</h4> */}
                           <blockquote className="blockquote mb-0">
                              <p className="font-size-14">I love books. I adore everything about them. I love the feel of the pages on my fingertips. They are light enough to carry, yet so heavy with worlds and ideas. I love the sound of the pages flicking against my fingers. Print against fingerprints. Books make people quiet, yet they are so loud.</p>
                              <footer className="blockquote-footer text-white font-size-12">Nnedi Okorafor <cite title="Source Title" class="text-white" ></cite></footer>
                           </blockquote>
                        </div>
                    
                        </div>
                         </div>
                     </div>
                  </div>
               
               </div>
            </div>
         </div>
            
        {/* <div className="main">
            <div className="content-page" id="content-page" >
                <div class="container-fluid">
                <div className="container">
                            <div className="row">
                            <div className="d-flex align-items-center">
                            <div className="col-6 p-0 position-relative image-overlap-shadow">

                                <form className="main-form full" id={'billing'} onSubmit={(event) => {handleForm(event)}}>
                                    <div className="row">
                                        <div className="col-xs-12 mb-20">
                                            <div className="heading-part heading-bg">
                                                <h2 className="heading">Billing Information</h2>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="input-box">
                                                <label htmlFor={'name'}>Name</label>
                                                <input defaultValue={name}
                                                       readOnly={true}
                                                       onChange={(e) => setName(e.target.value)}
                                                       data-rule-required={true}
                                                       type={'text'}
                                                       name={'name'}
                                                       id={'name'}/>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="input-box">
                                                <label htmlFor={'mobile'}>Mobile No<span
                                                    className="required">*</span></label>
                                                <input
                                                    defaultValue={mobile}
                                                    onChange={(e) => setMobile(e.target.value)}
                                                    minLength={10}
                                                    maxLength={12}
                                                    data-rule-required={true}
                                                    type={'tel'}
                                                    name={'mobile'}
                                                    id={'mobile'}/>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="input-box">
                                                <label htmlFor={'address'}>Address<span
                                                    className="required">*</span></label>
                                                <textarea
                                                    defaultValue={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    data-rule-required={true}
                                                    name={'address'}
                                                    id={'address'}
                                                    className={'form-control'}/>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="input-box">
                                                <label htmlFor={'pincode'}>pincode<span
                                                    className="required">*</span></label>
                                                <input
                                                    readOnly={true}
                                                    defaultValue={pincode}
                                                    data-rule-required={true}
                                                    type={'tel'}
                                                    name={'pincode'}
                                                    id={'pincode'}/>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="input-box">
                                                <label htmlFor={'total_amount'}>Total Amount<span
                                                    className="required">*</span></label>
                                                <input
                                                    readOnly={true}
                                                    defaultValue={totalprice}
                                                    data-rule-required={true}
                                                    type={'text'}
                                                    name={'total_amount'}
                                                    id={'total_amount'}/>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="input-box">
                                                <label htmlFor={'payment_method'}>Payment Method</label>
                                                <select
                                                    onChange={(e) => setPayment_method(e.target.value)}
                                                    name={'payment_method'}
                                                    id={'payment_method'}
                                                    data-rule-required={true}>
                                                    <option value={''}>Select Method</option>
                                                    <option value={'COD'}>Cash On Delivery</option>
                                                    <option value={'Online'}>Online</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="input-box">
                                                <div className={"text-center"}>
                                                    <button type={"submit"} className={"btn-black"}>Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
        {/* </section> */}
          
    <Footer/>

{/* </div> */}

</>
)
}

export default Placeorder;