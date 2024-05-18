import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"
import load from "load-script";
import Adminsidebar from "./Components/Adminsidebar";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useNavigate } from "react-router-dom";

function Updatebook() {
    let navigate = new useNavigate()
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

    let { book_id } = useParams();
    let [book_name, setbook_name] = useState("");
    let [book_author, setbook_author] = useState("");
    let [book_category, setbook_category] = useState("");
    let [book_description, setbook_description] = useState("");
    let [book_price, setbook_price] = useState("");

    function GetDetails() {
        axios.get(`http://localhost:3001/getbookbyid?book_id=${book_id}`)
            .then(res => {
                console.log(res.data);

                let Book = res.data;
                setbook_name(Book[0].book_name);
                setbook_description(Book[0].book_description);
                setbook_author(Book[0].book_author)
                setbook_category(Book[0].book_category)
                setbook_price(Book[0].book_price)

            })
    }

    useEffect(() => {
        GetDetails();
    }, [])

    function handlebook(e) {
        e.preventDefault();

        console.log(`${book_name} ${book_description}`);

        let formData = new FormData();
        formData.append("book_name", book_name);
        formData.append("book_id", book_id);
        formData.append("book_author", book_author);
        formData.append("book_price", book_price);
        formData.append("book_category", book_category);
        formData.append("book_description", book_description);

        axios.post("http://localhost:3001/update-book", formData
        //  {
        //     book_id,
        //     book_name,
        //     book_description,
        //     book_author,
        //     book_price,
        //     book_category
        // }
        )
            .then(res => {

                if (res.data === "required") {
                    Swal.fire({
                        title: 'Add fields',
            text: "fields can't be empty",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
                    })
                } else {
                    console.log(res)
                    Swal.fire({
                        icon: 'success',
                        title: 'book Updated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
navigate("/Showbooks")
                }
            })
    }
    return (
        <>
        <Adminsidebar/>
        <Navbar/>
            {/* <div className="container-md justify-content-center" >
                <h1 className="offset-md-4 align-middle">UPDATE book</h1>
                <div className="jumbotron ">

                    <form className="bg-info text-dark " id={"book"} onSubmit={(event) => handlebook(event)}>
                        <div className="form-group col-md-4 offset-md-4">
                            <label className="" htmlFor=""> book Name </label>
                            <input value={book_name} onChange={(e) => setbookname(e.target.value)} data-rule-required={true} type="text" className="form-control  " id="book_name" name="book_name" placeholder="add name to the book" />
                        </div>
                        <div className="form-group col-md-4 offset-md-4">
                            <label className="" htmlFor=""> Description </label>
                            <input value={book_description} onChange={(e) => setDescription(e.target.value)} data-rule-required={true} type="text" className="form-control form-control-lg " id="book_description" name="book_description" placeholder="add book_description" />
                        </div>
                        <div className="form-group">
                           <input defaultValue={book_id} name={'book_id'}  hidden={true} id={'book_id'}/>
                        </div>


                    </form>


                    <div>
                        <button onClick={handlebook} id="submitbtn" type="button" className="btn btn-success offset-md-4 ">Submit</button>
                    </div>
                </div>
            </div> */}


            <div id="content-page" className="content-page">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-sm-12">
                     <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                           <div className="iq-header-title">
                              <h4 className="card-title">Update Book</h4>
                           </div>
                        </div>
                        <div className="iq-card-body">
                           <form   id="bookupdate" onSubmit={handlebook} action="https://templates.iqonic.design/booksto/html/admin-books.html">
                              <div className="form-group">
                                 <label>Book Name:</label>
                                 <input value={book_name} onChange={(e) => setbook_name(e.target.value)} required={true} type="text" className="form-control"/>
                              </div>
                              <div className="form-group">
                                 <label>Book Category:</label>
                                 <select value={book_category} onChange={(e) => setbook_category(e.target.value)}
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
                                 <input value={book_author} onChange={(e) => setbook_author(e.target.value)} 
                                 required={true}
                                 type="text" className="form-control" id="book_author"
                                 />
                               
                              </div>
                              {/* <div className="form-group">
                                 <label>Book Image:</label>
                                 <label htmlFor={'photo'}>Photo<span className="required">*</span></label>
                                    <input onChange={(e) => setbook_image(e.target.files[0])}
                                           type={'file'} 
                                        //    data-rule-required={true}
                                           name={'photo'}
                                           id={'photo'}/>
                              </div> */}
                              
                              {/* <div className="form-group">
                                 <label>Book pdf:</label>
                                 <div className="custom-file">
                                    <input type="file" className="custom-file-input" accept="application/pdf, application/vnd.ms-excel"/>
                                    <label className="custom-file-label">Choose file</label>
                                 </div>
                              </div> */}
                              <div className="form-group">
                                 <label>Book Price:</label>
                                 <input value={book_price} onChange={(e) => setbook_price(e.target.value)} required={true} type="text" className="form-control"/>
                              </div>
                              <div className="form-group">
                                 <label>Book Description:</label>
                                 <textarea value={book_description} onChange={(e) => setbook_description(e.target.value)} required={true} className="form-control" rows="4"></textarea>
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
<Footer/>
        </>

    )
}
export default Updatebook
    ;