import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavbarList from '../adminPanel/views/navbarList'
import SidebarScreen from '../sideBar/sidebarScreen'

export default function DemandAuthor() {

    const dispatch = useDispatch();
    const history = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [coverletter, setCoverLetter] = useState('');


    useEffect(() => {

        if (!userInfo) {
            history("/");
        }
    },
        [
            dispatch,
            history,
            userInfo,

        ]);


    const sendDemand = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };
        let userId = userInfo.user._id;
        console.log('user', userId)

        return await axios.post(`http://localhost:5000/api/demand/add`, { userId ,coverletter}, config)
            .then((res) => {

                console.log(res.data);

                console.log('article => ' + JSON.stringify(userId));
                Swal.fire({
                    title: "Succces!",
                    text: "Request Sended Successfully",
                    icon: 'success',
                    button: "OK!"
                });

            }).catch(err => {
                console.log(err)
                Swal.fire({
                    title: "Error!",
                    text: "Request Already Send",
                    icon: 'error',
                    button: "OK!"
                });

            })


    }



    return (
        <div>
            <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
                <div className="main-body" >
                    <div className="row gutters-sm" style={{ maxWidth: "100%" }}>
                        <SidebarScreen />
                        <div className="col-md-8" style={{ marginTop: '50px' }}>
                            <div className='container'>
                                <div id="content" className="p-6 p-md-10 pt-12">
                                    <NavbarList />
                                    <div className="card mb-3" style={{ backgroundColor: 'white' }}>
                                        <div class="card-body">
                                            <div className="row">
                                                <h1 style={{ color: '#B91736' }}>Demand To Be An Author</h1>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-4 col-md-7 mx-auto my-auto">
                                                    <div class="cardd mb-2">
                                                    <div class="userprofile">

<div class="userpic" >
    <img src="https://th.bing.com/th/id/OIP.At1YjL25G60Z3HppBZXdNQHaHa?pid=ImgDet&rs=1" 
    
    alt="" class="userpicimg" />
</div>


<h2 class="text-danger">To Be An Author</h2>
                                                            <p class="mb-4">Send A Demand To The Admin </p>

                                                            <form>
                                                                <div class="text-center">
                                                                    <div className='row'>
                                                                        <div className='col-mb-4'>
                                                                            <div class="panel-body">
                                                                                <textarea class="form-control" placeholder="write a cover letter..."
                                                                                    type="text"
                                                                                    name='coverletter'
                                                                                    onChange={(e) => {
                                                                                        setCoverLetter(e.target.value);

                                                                                    }}
                                                                                  
                                                                                    rows="5"></textarea>

                                                                            </div>
                                                                        </div>


                                                                        <button type="button" class="btn bg-danger  my-4" style={{width:'52%',marginLeft:"12%"}}
                                                                            onClick=
                                                                            {() => sendDemand()}>

                                                                            Send Request</button>
                                                                    </div>
                                                                    </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
