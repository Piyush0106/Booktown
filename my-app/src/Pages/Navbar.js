import{Link} from 'react-router-dom'
let Navbar =()=> {
    return(
       <>
        <Link to ="/" >Home</Link>
        <Link to = "/Adminreg" >Adminreg</Link>
        <Link to = "/Userreg" >Userreg</Link>
        <Link to = "/Userlogin">Userlogin</Link>
        <Link to = "/Categories">Categories</Link>
        <Link to = "/Viewcategories">View_Categories</Link>

       </>
    )
}

export default Navbar