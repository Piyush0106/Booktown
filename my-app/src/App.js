// import './index.css';
import { createContext } from "react"
// import CartContext from "./Pages/CartContext"
import Home from "./Pages/Home"
import Adminreg from "./Pages/Adminreg"
import Adminlogin from "./Pages/Adminlogin"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Categories from "./Pages/Categories"
import Viewcategories from "./Pages/Viewcategories"
import Updatecategories from "./Pages/Updatecategories"
import Userreg from "./Pages/Userreg"
import Userlogin from "./Pages/Userlogin"
import User_home from "./Pages/User_home"
import Booksadd from "./Pages/Booksadd"
import Book_details from "./Pages/Book_details"
import Public_categories from "./Pages/Public_categories"
import Showbooks from "./Pages/Showbooks"
import Admin_home from "./Pages/Admin_home"
import Updatebook from "./Pages/Updatebook"
import Public_books from "./Pages/Public_books"
import Cart from "./Pages/Cart"
import Change_adminpass from "./Pages/Change_adminpass"
import Change_userpass from "./Pages/Change_userpass";
import Checkout from "./Pages/Checkout"
import Placeorder from "./Pages/Placeorder"
import Tnc from "./Pages/Tnc"
import Userforgotpassword from "./Pages/Userforgotpassword"
import Privacy from "./Pages/Privacy"
import Aboutus from "./Pages/Aboutus"
import Search from "./Pages/Search"
import Empty from "./Pages/Empty"
import Admin_empty from "./Pages/Admin_empty"
import User_empty from "./Pages/User_empty"


// import createContext from "react";
// import CartContext from "./Pages/CartContext";
export let CartContext = createContext(null);

let App = () => {

  let {setCartcount, UpdateCount} = createContext(CartContext);
  return (
    <>
      {/* <Router>

 
    </Router> */}

      <Router>
        <CartContext.Provider value={{setCartcount, UpdateCount}}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          {/* Admin reg */}
          <Route path="/Adminreg" element={<Adminreg/>} />
          <Route path="/Admin_home" element={<Admin_home/>} />
          <Route path="/User_home" element={<User_home/>} />
          <Route path="/Userreg" element={<Userreg />} />
          <Route path="/Userforgotpassword" element={<Userforgotpassword/>} />
          <Route path="/Booksadd" element={<Booksadd/>} />
          <Route path="/Userlogin" element={<Userlogin />} />
          <Route path="/Adminlogin" element={<Adminlogin />} />
          <Route path="/Change_adminpass" element={<Change_adminpass />} />
          <Route path="/Change_userpass" element={<Change_userpass />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Public_categories" element={<Public_categories />} />
          <Route path="/Public_books" element={<Public_books />} />
          <Route path="/Viewcategories" element={<Viewcategories />} />
          <Route path="/Showbooks" element={<Showbooks />} />
          <Route path="/Placeorder/:totalprice" element={<Placeorder />} />
          {/* <Route path="/Placeorder" element={<Placeorder />} /> */}
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/Updatecategories/:category_id" element={<Updatecategories/>}/>
          <Route path="/Book_details/:book_id" element={<Book_details/>}/>
          <Route path="/Checkout" element={<Checkout/>}/>
          <Route path="/Updatebook/:book_id" element={<Updatebook/>}/>
          <Route path="/Tnc" element={<Tnc/>}/>
          <Route path="/Privacy" element={<Privacy/>}/>
          <Route path="/Aboutus" element={<Aboutus/>}/>
          <Route path="/Empty" element={<Empty/>}/>
          <Route path="/Admin_empty" element={<Admin_empty/>}/>
          <Route path="/User_empty" element={<User_empty/>}/>
          <Route path="/Search/:searchinput" element={<Search/>} />
        </Routes>
        </CartContext.Provider>
      </Router>







    </>
  )
}

export default App