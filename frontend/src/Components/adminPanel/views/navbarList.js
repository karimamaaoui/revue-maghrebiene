import Header from '../layouts/Header'
import './navabarList.css'
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function NavbarList() {


  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
  ]);

  return (

    <div>
      <div className="row">


        <div className="contentArea">
          <Header />
        </div>
        <br />
        <br />

        {            userInfo.roleuser === "Reader" ?
          
        < >

          <div class="col-md-2 col-xl-3">
            <div class="card  order-card" style={{ backgroundColor: "#CAD8E2", height: "70%" }}>
              <div class="card-block" >

                <h6 class="m-b-20"  >
                  <a href="#usersList" style={{ color: "white" }} >

                    Users List
                  </a>
                </h6>
                <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span></span></h2>
                <a href="">
                  <p class="m-b-0">Users<span class="f-right"></span></p></a>
              </div>
            </div>
          </div>


          <div class="col-md-4 col-xl-3">
            <div class="card order-card" style={{ backgroundColor: "#CAD8E2", height: "70%" }}>
              <div class="card-block">
                <h6 class="m-b-20">
                  <a href="#articlesList" style={{ color: "white" }} >

                    Articles List
                  </a>
                </h6>
                <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span></span></h2>
                <a href="/managearticles" >
                  <p class="m-b-0">Article<span class="f-right"></span></p></a>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-xl-3">
            <div class="card order-card" style={{ backgroundColor: "#CAD8E2", height: "70%" }}>
              <div class="card-block">
                <h6 class="m-b-20">
                  <a href="#home" style={{ color: "white" }} >
                    Users List
                  </a>
                </h6>
                <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span></span></h2>
                <p class="m-b-0">Users<span class="f-right"></span></p>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-xl-3">
            <div class="card order-card" style={{ backgroundColor: "#CAD8E2", height: "70%" }}>
              <div class="card-block">

                <h6 class="m-b-20">
                  <a href="#home" style={{ color: "white" }}>
                    Users List
                  </a>

                </h6>
                <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span></span></h2>
                <p class="m-b-0">Users<span class="f-right"></span></p>
              </div>
            </div>
          </div>
        </>
         :      < >

         <div class="col-md-4 col-xl-3">
           <div class="card  order-card" style={{ backgroundColor: "#CAD8E2", height: "70%" }}>
             <div class="card-block" >

               <h6 class="m-b-20"  >
                 <a href="#usersList" style={{ color: "white" }} >

                   List of Articles
                 </a>
               </h6>
               <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span></span></h2>
               <a href="">
                 <p class="m-b-0">List of Articles<span class="f-right"></span></p></a>
             </div>
           </div>
         </div>


         <div class="col-md-4 col-xl-3">
           <div class="card order-card" style={{ backgroundColor: "#CAD8E2", height: "70%" }}>
             <div class="card-block">
               <h6 class="m-b-20">
                 <a href="#articlesList" style={{ color: "white" }} >

                   Add New Article
                 </a>
               </h6>
               <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span></span></h2>
               <a href="/managearticles" >
                 <p class="m-b-0">Article<span class="f-right"></span></p></a>
             </div>
           </div>
         </div>

         <div class="col-md-4 col-xl-3">
           <div class="card order-card" style={{ backgroundColor: "#CAD8E2", height: "70%" }}>
             <div class="card-block">
               <h6 class="m-b-20">
                 <a href="#home" style={{ color: "white" }} >
                   Users List
                 </a>
               </h6>
               <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span></span></h2>
               <p class="m-b-0">Users<span class="f-right"></span></p>
             </div>
           </div>
         </div>

         <div class="col-md-4 col-xl-3">
           <div class="card order-card" style={{ backgroundColor: "#CAD8E2", height: "70%" }}>
             <div class="card-block">

               <h6 class="m-b-20">
                 <a href="#home" style={{ color: "white" }}>
                   Users List
                 </a>

               </h6>
               <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span></span></h2>
               <p class="m-b-0">Users<span class="f-right"></span></p>
             </div>
           </div>
         </div>
       </>
  
        }
      </div>


    </div>
  )
}
