import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//import NoRouteFound from '../LandingPage/NoRoute/noRouteFound'
import SidebarScreen from '../sideBar/sidebarScreen'
import Header from './layouts/Header'
import ManageUser from './manageUsers/manageUser'
import Starter from './views/Starter'
// import { io } from "socket.io-client";

// const ENDPOINT = "http://localhost:5000";
// var socket;

export default function AdminPage() {
 
    const history = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [socketConnected, setSocketConnected] = useState(false)

 


    return (
        <>
          {!userInfo ? history('/'):
            userInfo.roleuser === "Admin" ?


                <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
                    <div className="main-body">
                        <div className="row gutters-sm">
                            <SidebarScreen />
                            <div className="col-md-9" style={{ marginTop: '50px' }}>
                                <div className='container'>


                                    <div id="content" className="p-6 p-md-10 pt-12">
                                        <Starter />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : "Not Authorized"}

        </>
    )
}
