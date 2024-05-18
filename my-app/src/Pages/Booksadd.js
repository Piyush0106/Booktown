import { useState, useEffect } from "react"
import axios from 'axios'
import Swal from "sweetalert2"
// import load from "load-script";
// import Public from "./Components/Publicsidebar";
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import Adminsidebar from "./Components/Adminsidebar" 
import { useNavigate } from "react-router-dom"

function Booksadd() {
   
    let navigate = new useNavigate();

    const [categoryList, setCategoryList] = useState([]);

    const getCategory = () => {
        axios.get("http://localhost:3001/get-category").then(res => {
            // console.log(res.data);
            setCategoryList(res.data);
        })
    }
    useEffect(() => {
        getCategory();
    }, [])




    // load('public\assets\js\script.js', function (err, script) {
    //     if (err) {
    //         // print useful message
    //     } else {
    //         console.log(script.src);// Prints 'foo'.js'
    //         // use script
    //         // note that in IE8 and below loading error wouldn't be reported
    //     }
    // });

    let [book_name, setbook_name] = useState("")
    let [book_category, setbook_category] = useState("")
    let [book_description, setbook_description] = useState("")
    let [book_author, setbook_author] = useState("")
    let [book_price, setbook_price] = useState("")
    let [book_image, setbook_image] = useState(null)
    // let [book_status, setbook_status] = useState("")

    // book_category,book_author,book_price,book_status
    function Insertbooks(e) {
        e.preventDefault()
        console.log(`${book_name} ${book_description}  ${book_category} ${book_author} ${book_price} ${book_image}`)
        let formData = new FormData();
        formData.append('book_name', book_name)
        formData.append('book_description', book_description)
        formData.append('book_category', book_category)
        formData.append('book_author', book_author)
        formData.append('book_price', book_price)
        formData.append('book_image', book_image)
        // formData.append('book_status', book_status)

        axios({
            method: 'post',
            url: 'http://localhost:3001/addbooks',
            data: formData,
            headers: {
                "Content-Type": "application/form-data"
            }
        }).then(res => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'book added successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/Showbooks")
            })

    }
    return (
        <>
         {/* Sidebar */}
   <Adminsidebar/>
            

            {/* Navbar */}
            <Navbar/>
                      {/* <form id="book" onSubmit={Insertbooks} enctype="multipart/form-data">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">Book Name</label>
                            <input onChange={(e) => setbook_name(e.target.value)} type="text" name="productname" id="productname" className="form-control" />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">Photo</label>
                            <input onChange={(e) => setbook_image(e.target.files[0])}
                                type="file" name="photo" />
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="">Price</label>
                    <input onChange={(e) => setbook_price(e.target.value)} type="text" name="price" id="price" className="form-control" />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="">author</label>
                        <input onChange={(e) => setbook_author(e.target.value)} type="text" name="author" id="author" className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="">description</label>
                        <input onChange={(e) => setbook_description(e.target.value)} type="text" name="description" id="description" className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="">Status</label>
                        <select onChange={(e) => setbook_status(e.target.value)} className="form-control" id="category" name="category">
                            <option defaultValue>Select Category</option>
                            <option value="0">forsale</option>
                            <option value="1">notforsale</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="">category</label>
                        <select onChange={(e) => setbook_category(e.target.value)}
                            className="form-control" id="category" name="category">
                            <option value="">Select Category</option>
                            {
                                categoryList.map((row, index) => {
                                    return (
                                        <option key={index} value={row.category_id}>{row.category_name}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                  
                </div>
                <div>
                    <button id="btn" type="submit" className="btn btn-info">Submit</button>
                </div>
            </form> */}

            {/* <!-- Page Content  --> */}
         <div id="content-page" className="content-page">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-sm-12">
                     <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                           <div className="iq-header-title">
                              <h4 className="card-title">Add Book</h4>
                           </div>
                        </div>
                        <div className="iq-card-body">
                           <form   id="bookadd" onSubmit={Insertbooks} action="https://templates.iqonic.design/booksto/html/admin-books.html">
                              <div className="form-group">
                                 <label>Book Name:</label>
                                 <input onChange={(e) => setbook_name(e.target.value)} required={true} type="text" className="form-control"/>
                              </div>
                              <div className="form-group">
                                 <label>Book Category:</label>
                                 <select onChange={(e) => setbook_category(e.target.value)}
                                 required={true}
                            className="form-control" id="category" name="category">
                            <option value="">Select Category</option>
                            {
                                categoryList.map((row, index) => {
                                    return (
                                        <option key={index} value={row.category_id}>{row.category_name}</option>
                                    );
                                })
                            }
                        </select>
                              </div>
                              <div className="form-group">
                                 <label>Book Author:</label>
                                 <input onChange={(e) => setbook_author(e.target.value)} 
                                 required={true}
                                 type="text" className="form-control" id="book_author"
                                 />
                               
                              </div>
                              <div className="form-group">
                                 <label>Book Image:</label>
                                 <label htmlFor={'photo'}>Photo<span className="required">*</span></label>
                                    <input onChange={(e) => setbook_image(e.target.files[0])}
                                    required={true}
                                           type={'file'} 
                                        //    data-rule-required={true}
                                           name={'photo'}
                                           id={'photo'}/>
                              </div>
                              
                              {/* <div className="form-group">
                                 <label>Book pdf:</label>
                                 <div className="custom-file">
                                    <input type="file" className="custom-file-input" accept="application/pdf, application/vnd.ms-excel"/>
                                    <label className="custom-file-label">Choose file</label>
                                 </div>
                              </div> */}
                              <div className="form-group">
                                 <label>Book Price:</label>
                                 <input onChange={(e) => setbook_price(e.target.value)} required={true} type="text" className="form-control"/>
                              </div>
                              <div className="form-group">
                                 <label>Book Description:</label>
                                 <textarea onChange={(e) => setbook_description(e.target.value)} required={true} className="form-control" rows="4"></textarea>
                              </div>
                              <button type="submit" className="btn btn-primary">Submit</button>
                              {/* <button type="reset" className="btn btn-danger">Reset</button> */}
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

            {/* Footer */}
            <Footer/>

        </>

    )
}

export default Booksadd