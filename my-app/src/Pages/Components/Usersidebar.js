import axios from "axios"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2"
function Usersidebar(){
    const navigate = useNavigate()
   useEffect(()=>{
      axios.get("http://localhost:3001/user-auth")
      .then(res=>{
         console.log(res.data)
         if(res.data==='fail'){
            navigate('/Userlogin')
         }
      })
   })
   function userlogout(){
    Swal.fire({
        title:"Confirm Logout",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor:'#3085d6',
        confirmButtonText : "Log-out"
    }).then((result)=>{
        if(result.isConfirmed){
            axios.get("http://localhost:3001/user-logout").then(res =>{
                console.log(res)
                navigate("/")
            })
        }

    })
}
    return(
        <>
          <div className="iq-sidebar">
                <div className="iq-sidebar-logo d-flex justify-content-between">
                    <a className="header-logo"> <Link className="nav-link"
                        to="/">
                        <img src="assets/images/logo.png" className="img-fluid rounded-normal" alt="" />
                        <div className="logo-title">
                            <span className="text-primary text-uppercase">BookTown</span>

                        </div>
                    </Link>
                    </a>
                    <div className="iq-menu-bt-sidebar">
                        <div className="iq-menu-bt align-self-center">
                            <div className="wrapper-menu">
                                <div className="main-circle"><i className="las la-bars"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sidebar-scrollbar">
                    <nav className="iq-sidebar-menu">
                        <ul id="iq-sidebar-toggle" className="iq-menu">
                            <li className="active active-menu">
                            <ul id="dashboard" className="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                                    <li className="active"> <Link className="nav-link"
                                        to="/"><i data-icon="&#xe006;" className="icon"></i>Home Page<a href="index.html"></a></Link>
                                    </li>

                                </ul>
                                <ul id="dashboard" className="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                                    <li className="active"> <Link className="nav-link"
                                        to="/User_home"><i data-icon="J" className="icon"></i>Dashboard<a></a></Link>
                                    </li>
                                </ul>
                                <ul id="dashboard" className="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                                    <li><Link className="nav-link"
                                        to="/Cart"><i data-icon="Q" className="icon"></i>Cart <a></a></Link></li>
                                </ul>


                                <ul id="dashboard" className="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                                    <li><Link className="nav-link"
                                        to="/Change_userpass"><i data-icon="&#xe040;" className="icon"></i>Change Password<a></a></Link></li>
                                </ul>

                                <ul id="dashboard" className="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                                    <li><a className="nav-link" onClick={userlogout} >
                                        <i data-icon="=" className="icon"></i> Logout </a></li>
                                </ul>

                            </li>
                        </ul>
                    </nav>
                    <div id="sidebar-bottom" className="p-3 position-relative">
                        <div className="iq-card">
                            <div className="iq-card-body">
                                <div className="sidebarbottom-content">
                                    <div className="image"><img src="images/page-img/side-bkg.png" alt="" /></div>
                                    {/* <button type="submit" className="btn w-100 btn-primary mt-4 view-more">Become Membership
                                        </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Usersidebar