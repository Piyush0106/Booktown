import Navbar from "./Components/Navbar";
import Publicsidebar from "./Components/Publicsidebar";
import { useContext, useEffect, useState } from "react";
import Cards from "./Components/Cards"
import Footer from "./Components/Footer";
import { CartContext } from "../App";
import { useParams } from "react-router-dom";
import axios from "axios";

function Search(){
    // let {searchInput}=useContext(CartContext);
    let {searchinput} = useParams();
    let [searchData,setSearchData] = useState([]);

function getSearchData(){
    axios.get(`http://localhost:3001/fetch-product2/${searchinput}`)
    .then(res => {
        console.log(res.data);
        setSearchData(res.data);
    })

}

useEffect(()=>{
    getSearchData();
},[])



    return(
        <>
        <Publicsidebar/>
        <Navbar/>
        <div className="content-page" id="content-page" >
                <div class="container-fluid">
                    <div class="row">
                    <div class="col-lg-12">
                     <div class="iq-card">
                        <div class="iq-card-header d-flex justify-content-between">
                            {
                                searchData?
                                searchData.map((value,index)=>{
                                    return(
                                        <Cards
                                                        book_id={value.book_id}
                                                        book_image={value.book_image}
                                                        book_name={value.book_name}
                                                        book_category={value.category_name}
                                                        book_author={value.book_author}
                                                        book_price={value.book_price}
                                                    />                                    )
                                })
                                :
                                ""
                            }


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
export default Search