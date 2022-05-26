import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NoRouteFound from '../LandingPage/NoRoute/noRouteFound'
import SidebarScreen from '../sideBar/sidebarScreen'
import Blog from './dashboard/Blog'
import ProjectTables from './dashboard/ProjectTable'
import SalesChart from './dashboard/SalesChart'
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

    
//    useEffect(()=>{
//     socket = io(ENDPOINT);
//   //  console.log(socket)
//         console.log("socket on setup",socket.on('setup',(msg)=>{
//          console.log("MSG",msg)
//        }))
//     socket.emit("setup",userInfo.user);
//     socket.on("connection",()=>setSocketConnected(true))
     
//     })

//     const handleDropdownClick = () => {
//         socket.emit("check_all_notifications");
//       };
    
 


    return (
        <>
          {!userInfo ? history('/'):
            userInfo.roleuser === "Reader" ?


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
