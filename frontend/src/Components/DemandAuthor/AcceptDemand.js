import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllDemands } from '../../redux/Actions/actions'
import NavbarList from '../adminPanel/views/navbarList'
import SidebarScreen from '../sideBar/sidebarScreen'
import './accept.css'
import Accepter from '../../assets/accepter.png'
import Refuser from '../../assets/refuser.png'

export default function AcceptDemand() {

    const dispatch = useDispatch();
    const history = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [demandList, setDemandList] = useState([]);


    // const demandList = useSelector((state) => state.demandList);
    // const { loadingDemand, errorDemand, demands } = demandList;

    const getLisDemand = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };

        return await axios.get(`http://localhost:5000/api/demand/`, config)
            .then((res) => {

                console.log(res.data);
                setDemandList(res.data)
                // console.log('article => ' + JSON.stringify(res.data));

            }).catch(err => {
                console.log(err)
            })


    }

    const approvedAuthor = async (id) => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };
        console.log('user',userInfo.token)

        return await axios.put(`http://localhost:5000/api/user/addToAuthor/${id}`, config)
            .then((res) => {

                console.log(res.data);
                console.log('article => ' + JSON.stringify(res.data));

            }).catch(err => {
                console.log(err)
            })


    }

    useEffect(() => {

        if (!userInfo) {
            history("/");
        }
        else {
            // dispatch(getAllDemands())
            getLisDemand()
        }
    },
        [
            dispatch,
            history,
            userInfo,

        ]);



    return (

        <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>

            <div className="main-body" >
                <div className="row gutters-sm" style={{ maxWidth: "100%" }}>

                    <SidebarScreen />
                    <div className="col-md-8" style={{ marginTop: '50px' }}>
                        <div className='container'>
                            <div id="content" className="p-6 p-md-10 pt-12">
                                <NavbarList />
                                <div className="" style={{ backgroundColor: 'white' }}>
                                    <div class="card-body" >

                                        <div className="row">
                                            <h1 style={{ color: 'rgb(151, 213, 230)' }}>List Of Demands::::::::::::::::::::::::::::::::::::::::::::::::::::::</h1>
                                        </div>


                                        <div class="row" >
                                            {
                                                demandList.map((demand, i) => {
                                                    return (

                                                        <div class="col-lg-3 col-md-4 col-sm-6" >

                                                            <div class="panel panel-green userlist"  >
                                                                <div class="panel-body text-center">

                                                                    <div class="userprofile">

                                                                        <div class="userpic">
                                                                            <img src="https://th.bing.com/th/id/OIP.At1YjL25G60Z3HppBZXdNQHaHa?pid=ImgDet&rs=1" alt="" class="userpicimg" />
                                                                        </div>

                                                                    </div>



                                                                    <p>
                                                                        {demand.user.username}

                                                                        <br />

                                                                        {demand.user.email}
                                                                    </p>




                                                                </div>
                                                                <div className="footer">

                                                                    <div style={{ display: "inline-flex" }}>
                                                                        <img src={Accepter}
                                                                         onClick={() => {
                                                                            approvedAuthor(demand.user._id);

                                                                        }}
                                                                        
                                                                        style={{ height: '35px' }} />
                                                                        <img src={Refuser} onClick="" style={{ height: '35px' }} />

                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>

    )
}
