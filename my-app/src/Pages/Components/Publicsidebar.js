import { Link } from "react-router-dom";
function Publicsidebar() {
    return (
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
                                    <li><Link className="nav-link"
                                        to="/Public_books"><i className="ri-function-line"></i>Books<a href="index.html"></a></Link></li>
                                </ul>
                                <ul id="dashboard" className="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                                    <li><Link className="nav-link"
                                        to="/Cart"><i data-icon="Q" className="icon"></i>Cart <a></a></Link></li>
                                </ul>
                                <ul id="dashboard" className="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                                    <li><Link className="nav-link"
                                        to="/Aboutus"><i data-icon="&#xe00d;" className="icon"></i>About Us<a></a></Link></li>
                                </ul>
                                <ul id="dashboard" className="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                                    <li><Link className="nav-link"
                                        to="/User_home"><i data-icon="&#xe056;" className="icon"></i>User Profile<a></a></Link></li>
                                </ul>
                                <ul id="dashboard" className="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                                    <li><Link className="nav-link"
                                        to="/Admin_home"><i data-icon="&#xe058;" className="icon"></i>Admin Profile<a></a></Link></li>
                                </ul>
                                
                            </li>
                        </ul>
                    </nav>
                    <div id="sidebar-bottom" className="p-3 position-relative">
                        <div className="iq-card">
                            <div className="iq-card-body">
                                <div className="sidebarbottom-content">
                                    <div className="image"><img src="images/page-img/side-bkg.png" alt="" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Publicsidebar;