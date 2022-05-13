import Header from '../layouts/Header'
import './navabarList.css'
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import settings from "../../../assets/settings.png"
import article from "../../../assets/article.png"




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

        {userInfo.roleuser === "Reader" ?

          < >

            <div class="col-md-4 col-xl-3">
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
                      New Arrivals
                    </a>
                  </h6>
                  <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span></span></h2>
                  <p class="m-b-0">Users<span class="f-right"></span></p>
                </div>
              </div>
            </div>

            
            <div class="col-md-4 col-xl-3">
              <div class="card  order-card" style={{ backgroundColor: "#CAD8E2", height: "70%" }}>
                <div class="card-block" >

                  <h6 class="m-b-20"  >
                    <a href="#usersList" style={{ color: "white" }} >

                      Demand Author
                    </a>
                  </h6>
                  <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span></span></h2>
                  <a href="/accept">
                    <p class="m-b-0">Demand Author<span class="f-right"></span></p></a>
                </div>
              </div>
            </div>
          </>
          :        userInfo.roleuser === "Author" ?
          < >

            <div class="col-md-4 col-xl-3">
              <div class="card order-card " style={{ backgroundColor: "#CAD8E2", height: "70%" }}>

                <div class="database" >
                  <div class="icon" style={{
                    padding: "0 80px", marginBottom: "-30px", color: '#27b88d',
                    transform: "translateY(-50%)"
                  }}>
                    <i class="bi bi-book"></i>

                  </div>

                  <h6 class="m-b-20">
                    <a href="#home" style={{ color: "white" }}>
                      List of Article
                    </a>

                  </h6>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-xl-3">
              <div class="card order-card " style={{ backgroundColor: "#CAD8E2", height: "70%" }}>

                <div class="settings" >
                  <div class="icon" style={{

                    padding: "0 80px",
                    marginBottom: "-30px",
                    transform: "translateY(-50%)"
                  }}
                  >
                    <i class="bi bi-pencil-square"></i>
                  </div>

                  <h6 class="m-b-20">
                    <a href="#home" style={{ color: "white" }}>
                    Add New Article
                    </a>

                  </h6>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-xl-3">
              <div class="card order-card " style={{ backgroundColor: "#CAD8E2", height: "70%" }}>

                <div class="ssl" >
                  <div class="icon" style={{
                    padding: "0 80px",
                    marginBottom: "-30px",
                    transform: "translateY(-50%)"
                  }}
                  >
                    <i class="bi bi-pencil-square"></i>
                  </div>

                  <h6 class="m-b-20">
                    <a href="#home" style={{ color: "white" }}>
                      Settings
                    </a>

                  </h6>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-xl-3">
              <div class="card order-card " style={{ backgroundColor: "#CAD8E2", height: "70%" }}>

                <div class="backups" >
                  <div class="icon" style={{
                    padding: "0 80px",
                    marginBottom: "-30px",
                    color: 'orange',
                    transform: "translateY(-50%)"
                  }}
                  >
            <i class="bi bi-chat-square-text"></i>
                  </div>

                  <h6 class="m-b-20">
                    <a href="#home" style={{ color: "white" }}>
                      Feedback
                    </a>

                  </h6>
                </div>
              </div>
            </div>




       
          </>
          :
          < >

          <div class="col-md-4 col-xl-3">
            <div class="card order-card " style={{ backgroundColor: "#CAD8E2", height: "70%" }}>

              <div class="database" >
                <div class="icon" style={{
                  padding: "0 80px", marginBottom: "-30px", color: '#27b88d',
                  transform: "translateY(-50%)"
                }}>
                  <i class="bi bi-book"></i>

                </div>

                <h6 class="m-b-20">
                  <a href="#home" style={{ color: "white" }}>
                    List of Article
                  </a>

                </h6>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-xl-3">
            <div class="card order-card " style={{ backgroundColor: "#CAD8E2", height: "70%" }}>

              <div class="settings" >
                <div class="icon" style={{

                  padding: "0 80px",
                  marginBottom: "-30px",
                  transform: "translateY(-50%)"
                }}
                >
                  <i class="bi bi-pencil-square"></i>
                </div>

                <h6 class="m-b-20">
                  <a href="#home" style={{ color: "white" }}>
                  Add New Article
                  </a>

                </h6>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-xl-3">
            <div class="card order-card " style={{ backgroundColor: "#CAD8E2", height: "70%" }}>

              <div class="ssl" >
                <div class="icon" style={{
                  padding: "0 80px",
                  marginBottom: "-30px",
                  transform: "translateY(-50%)"
                }}
                >
                  <i class="bi bi-pencil-square"></i>
                </div>

                <h6 class="m-b-20">
                  <a href="/demand" style={{ color: "white" }}>
                    Demand to be an author
                  </a>

                </h6>
              </div>
            </div>
          </div>

          <div class="col-md-4 col-xl-3">
            <div class="card order-card " style={{ backgroundColor: "#CAD8E2", height: "70%" }}>

              <div class="backups" >
                <div class="icon" style={{
                  padding: "0 80px",
                  marginBottom: "-30px",
                  color: 'orange',
                  transform: "translateY(-50%)"
                }}
                >
          <i class="bi bi-chat-square-text"></i>
                </div>

                <h6 class="m-b-20">
                  <a href="#home" style={{ color: "white" }}>
                    Feedback
                  </a>

                </h6>
              </div>
            </div>
          </div>




     
        </>
       
        }
      </div>


    </div>
  )
}
