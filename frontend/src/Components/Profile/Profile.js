import React, { useEffect } from 'react'
import SidebarScreen from '../sideBar/sidebarScreen'
import './profile.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Link from "react-dom"
import Header from '../adminPanel/layouts/Header';

export default function Profile() {

  const Pf='https://res.cloudinary.com/piyushproj/image/upload/'
  /***
   *              <ul>
        {userInfo.user.roles &&
          userInfo.user.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
         
   */
  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {

      history("/login");
    }
  }, [history, userInfo]);


  return (
    <>
    
      <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
        <div className="main-body">
          <div className="row gutters-sm">
            <SidebarScreen />

            <div className="col-md-8" style={{ marginTop: '50px' }}>
              <div className="contentArea">
                <Header />
              </div>
              <br />
              <br />
              {userInfo ?
              <div>
              <div className="media col-md-10 col-lg-8 col-xl-7 py-5 mx-auto">
                {console.log("userInfo.user.profilePic",userInfo.user.profilePic)}
                {userInfo.user.profilePic && (
                <img src={Pf+userInfo.user.profilePic} alt="" className="d-block ui-w-100 rounded-circle" />
                )}
                <div className="media-body ml-5">
                  <h4 className="font-weight-bold mb-4">{userInfo.user.username} </h4>

                  <div className="text-muted mb-4">
                    Lorem ipsum dolor sit amet, nibh suavitate qualisque ut nam. Ad harum primis electram duo, porro principes ei has.
                  </div>

                </div>
              </div>

              <div className="card mb-3">
                <div className="card-body">
                  
                  <div className="row">

                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name  </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo.user.firstname} {userInfo.user.lastname}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo.user.email}
                    </div>
                  </div>
                  {console.log(userInfo.roleuser==="Author")}
                  <hr />
                  {userInfo.roleuser==="Author" ?

                  <div>

                  <div className="row">

                    <div className="col-sm-3">

                      <h6 className="mb-0">University</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo.user.university}

                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Place Of Practice</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo.user.placeofpractice}
                    </div>
                  </div></div> 
                              : null}

                  <hr />
                  <div className="row">

                    <div className="col-sm-12">
                      <button className="btn btn-danger ">
                      <a 
                        href="/editprofile" style={{ color: "white" }}>Edit</a>
                        </button>
                    </div>
                    
                  </div>
                </div>
              </div>    
              </div>
            

            : null}



            </div>

          </div>

        </div>
      </div>

    </>
  )
}
