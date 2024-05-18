import { Link } from "react-router-dom"
function Footer() {
   return (
      <>
         <footer class="iq-footer">
            <div class="container-fluid">
               <div class="row">
                  <div class="col-lg-6">
                     <ul class="list-inline mb-0">
                        <li class="list-inline-item"><Link className="nav-link"
                           to="/Privacy"><a>Privacy Policy</a></Link></li>
                        <li class="list-inline-item"><Link className="nav-link"
                           to="/Tnc"><a>Terms of Use</a></Link></li>

                     </ul>
                  </div>
                  <div class="col-lg-6 text-right">
                     Copyright 2022 <a href="#">Booktown</a> All Rights Reserved.
                  </div>
               </div>
            </div>
         </footer>
      </>
   )
}
export default Footer